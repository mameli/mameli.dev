import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About">
    <div className="flex flex-row mx-auto">
      <div className="flex ">
        <h1 className="text-5xl text-gray-800 dark:text-white">About what?</h1>
      </div>
    </div>
  </Layout>
)

export default AboutPage
