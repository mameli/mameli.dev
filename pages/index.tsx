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
          <br /> I'm Filippo Mameli, <br />a Software Engineer
        </h1>
      </div>
      <div className="sm:hidden h-10"/>
      <div className="mx-auto w-1/2 sm:w-3/12 items-center">
        <Image
          src={profilePic}
          alt="Picture of the author"
          className="rounded-full object-fill h-200 w-200 items-center"
        />
      </div>
    </div>
  </Layout>
)

export default IndexPage
