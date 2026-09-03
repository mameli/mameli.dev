import { promises as fs } from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';

const PROJECT_ROOT = process.cwd();
const FONTS = [
  { source: 'fonts-source/EBGaramond-Regular.full.woff2', output: 'public/fonts/EBGaramond-Regular.woff2' },
  { source: 'fonts-source/EBGaramond-SemiBold.full.woff2', output: 'public/fonts/EBGaramond-SemiBold.woff2' },
];

const SCAN_ROOTS = [path.join(PROJECT_ROOT, 'src')];
const INCLUDE_EXTENSIONS = new Set([
  '.astro',
  '.md',
  '.mdx',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.txt',
]);

const ALWAYS_INCLUDE = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  ' .,;:!?',
  "'\"`()[]{}<>/\\@#$%^&*+-_=~|",
  'àèéìíîòóùúÀÈÉÌÍÎÒÓÙÚçÇñÑ',
  '“”‘’–—…•€',
].join('');

async function walk(dirPath, files = []) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') {
        continue;
      }
      await walk(fullPath, files);
      continue;
    }

    if (INCLUDE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function collectSubsetCharacters() {
  let combinedText = ALWAYS_INCLUDE;

  for (const root of SCAN_ROOTS) {
    const files = await walk(root);

    for (const filePath of files) {
      const content = await fs.readFile(filePath, 'utf8');
      combinedText += content;
    }
  }

  return [...new Set(Array.from(combinedText))].join('');
}

async function run() {
  try {
    const subsetCharacters = await collectSubsetCharacters();

    for (const font of FONTS) {
      const sourcePath = path.join(PROJECT_ROOT, font.source);
      const outputPath = path.join(PROJECT_ROOT, font.output);
      const [sourceBuffer, sourceStats] = await Promise.all([
        fs.readFile(sourcePath),
        fs.stat(sourcePath),
      ]);

      const subsetBuffer = await subsetFont(sourceBuffer, subsetCharacters, { targetFormat: 'woff2' });

      await fs.writeFile(outputPath, subsetBuffer);

      const subsetStats = await fs.stat(outputPath);
      const reduction = (((sourceStats.size - subsetStats.size) / sourceStats.size) * 100).toFixed(1);

      console.log(`Font subset created: ${path.relative(PROJECT_ROOT, outputPath)}`);
      console.log(`Characters included: ${subsetCharacters.length}`);
      console.log(`Size: ${sourceStats.size} -> ${subsetStats.size} bytes (${reduction}% smaller)`);
    }
  } catch (error) {
    console.error('Failed to generate font subset.');
    console.error(error);
    process.exit(1);
  }
}

await run();
