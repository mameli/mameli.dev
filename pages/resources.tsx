import Link from 'next/link'
import Layout from '../components/Layout'

const ResourcesPage = () => (
  <Layout title="Resources">
    <div className="flex flex-col mx-auto">
      <div className="flex ">
        <h1 className="text-5xl text-gray-800 dark:text-white">Resources</h1>
      </div>
      <div className="py-3"></div>
      <h2 className="text-3xl text-gray-800 dark:text-white">Under construction 🚧🚧🚧 ...</h2>
      <p>
      I like to keep a neat, categorized list of all the cool stuff I&apos;ve found online over the years.
      I&apos;ll be the main consumer of this page, but I hope it can be useful to you as well.
      </p>
      <div className="py-3"></div>
      <h2 className="text-2xl text-gray-800 dark:text-white">Development</h2>
      <div className="py-3"></div>
      <h2 className="text-xl text-gray-800 dark:text-white">News aggregator</h2>
      <ul>
        <li>
          <a
            className="text-cyan-500 hover:underline underline-offset-2"
            href="https://news.ycombinator.com/"
          >
            Hacker News
          </a>
        </li>
        <li>
          <a
            className="text-cyan-500 hover:underline underline-offset-2"
            href="https://lobste.rs/"
          >
            Lobste.rs
          </a>
        </li>
        
      </ul>
    </div>
  </Layout>
)

export default ResourcesPage
