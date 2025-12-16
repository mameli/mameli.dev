# Filippo Mameli's Personal Website

Welcome to my personal website and blog! I'm Filippo Mameli, a Data Engineer at [AgileLab](https://www.agilelab.it). This site serves as a platform where I share my insights, experiences, and projects in the fields of data engineering, machine learning, software development, and technology in general.

## Key Features

- **Blog**: A collection of articles covering topics like data analysis, machine learning, prompt engineering, and more.
- **Contact Information**: Easy ways to connect with me via social media, email, and professional networks.
- **RSS Feed**: Stay updated with new blog posts via RSS.
- **SEO Optimized**: Includes canonical URLs, OpenGraph metadata, and sitemap support for better search engine visibility.
- **Responsive Design**: Built with TailwindCSS for a seamless experience across devices.
- **Dark/Light Theme**: Automatic theme switching based on user preference.
- **Markdown & MDX Support**: Rich content creation with support for code snippets, images, and interactive elements.

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Bun](https://bun.sh/) (recommended for faster package management and running)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mameli/mameli.dev.git
   cd mameli.dev
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Start the development server**:
   ```bash
   bun dev
   ```
   The site will be available at `http://localhost:4321`.

4. **Build for production**:
   ```bash
   bun build
   ```

5. **Preview the production build**:
   ```bash
   bun preview
   ```

## Usage Examples

- **Homepage**: Visit the root URL to learn about me and navigate to different sections.
- **Blog**: Browse `/blog` to read my latest articles. Each post includes detailed explanations and code examples.
- **Contacts**: Find ways to connect with me at `/contacts`, including links to LinkedIn, GitHub, and email.

## Project Structure

```
├── public/
│   ├── favicon.svg
│   ├── fonts/
│   └── images/
├── src/
│   ├── components/
│   │   ├── BaseHead.astro
│   │   └── FormattedDate.astro
│   ├── content/
│   │   └── blog/  # Blog posts in MDX format
│   ├── layouts/
│   │   ├── BlogPost.astro
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── contacts.astro
│   │   ├── projects.astro
│   │   └── rss.xml.js
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. The `src/content/blog/` directory contains blog posts as MDX documents, retrieved using Astro's Content Collections API.

## Commands

All commands are run from the root of the project:

| Command              | Action                                           |
|----------------------|--------------------------------------------------|
| `bun install`        | Installs dependencies                            |
| `bun dev`            | Starts local dev server at `localhost:4321`      |
| `bun build`          | Build your production site to `./dist/`          |
| `bun preview`        | Preview your build locally, before deploying     |
| `bun astro ...`      | Run CLI commands like `astro add`, `astro check` |

## Contributing

This is a personal website, so contributions are not actively sought. However, if you find bugs or have suggestions for improvements, feel free to open an issue on the [GitHub repository](https://github.com/mameli/mameli.dev).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. (Note: If no LICENSE file exists, consider adding one.)
