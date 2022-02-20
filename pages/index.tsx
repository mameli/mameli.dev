import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import profilePic from '@images/profile.png'

const IndexPage = () => (
  <Layout title="Home">
    <div className="flex flex-col-reverse sm:flex-row mx-auto items-start">
      <div className="flex mx-auto sm:w-9/12 sm:text-left text-center">
        <h1 className="text-5xl text-gray-800 dark:text-white ">
          Hi 👋
          <br /> I&apos;m Filippo Mameli, <br />a Data Engineer
        </h1>
      </div>
      <div className="sm:hidden h-10" />
      <div className="flex mx-auto w-1/2 sm:w-3/12 rounded-full shadow-2xl shadow-blue-700 dark:shadow-green-500/50">
        <Image
          src={profilePic}
          alt="Picture of the author"
          className="rounded-full"
        />
      </div>
    </div>
  </Layout>
)

export default IndexPage
