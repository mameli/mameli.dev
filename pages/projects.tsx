import Link from 'next/link'
import Layout from '../components/Layout'

const HobbiesPage = () => (
  <Layout title="Projects">
    <div>
      <div>
        <h1 className="text-4xl text-gray-800 dark:text-white">Projects</h1>
      </div>
      <div className="py-3"></div>
      <div className="py-1"></div>
      <ul className="list-disc">
        <li>
          <a
            className="text-2xl font-bold text-gray-800 hover:underline decoration-wavy underline-offset-2 decoration-green-500 dark:text-white"
            href="https://github.com/mameli/sbobinator"
          >
            Sbobinator
          </a>
          <span className="text-lg text-gray-800 dark:text-white">
            : Web app for transcripting audio files with OpenAI
          </span>
        </li>
        <li>
          <a
            className="text-2xl font-bold text-gray-800 hover:underline decoration-wavy underline-offset-2 decoration-green-500 dark:text-white"
            href="https://github.com/mameli/make_it_short"
          >
            Make it short
          </a>
          <span className="text-lg text-gray-800 dark:text-white">
            : Web app for creating movies/book summaries with Ollama
          </span>
        </li>
        <li>
          <a
            className="text-2xl font-bold text-gray-800 hover:underline decoration-wavy underline-offset-2 decoration-green-500 dark:text-white"
            href="https://github.com/mameli/Artifact_Removal_GAN"
          >
            Artifact Removal GAN
          </a>
          <span className="text-lg text-gray-800 dark:text-white">
            : A U-net GAN for jpeg artifact removal
          </span>
        </li>
        <li>
          <a
            className="text-2xl font-bold text-gray-800 hover:underline decoration-wavy underline-offset-2 decoration-green-500 dark:text-white"
            href="https://github.com/mameli/Test_batch_norm_paper"
          >
            How does batch normalization help optimization?
          </a>
          <span className="text-lg text-gray-800 dark:text-white">
            : Test the results of the paper
          </span>
        </li>
        <li>
          <a
            className="text-2xl font-bold text-gray-800 hover:underline decoration-wavy underline-offset-2 decoration-green-500 dark:text-white"
            href="https://github.com/mameli/k-means-hadoop"
          >
            K-means hadoop
          </a>
          <span className="text-lg text-gray-800 dark:text-white">
            : k means using Hadoop library
          </span>
        </li>
        <li>
          <a
            className="text-2xl font-bold text-gray-800 hover:underline decoration-wavy underline-offset-2 decoration-green-500 dark:text-white"
            href="https://github.com/mameli/crypto-data-analysis"
          >
            Crypto data analysis
          </a>
          <span className="text-lg text-gray-800 dark:text-white">
            : An overkill implementation of a kafka-spark crypto&apos;s trades
            analyser
          </span>
        </li>
        <li>
          <a
            className="text-2xl font-bold text-gray-800 hover:underline decoration-wavy underline-offset-2 decoration-green-500 dark:text-white"
            href="https://www.dbiz.it/VirtualHR"
          >
            Virtual HR
          </a>
          <span className="text-lg text-gray-800 dark:text-white">
            : App for real-time personnel data management
          </span>
        </li>
      </ul>
      <div className="py-3"></div>
    </div>
  </Layout>
)

export default HobbiesPage
