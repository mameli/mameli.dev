import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About">
    <div>
      <div>
        <h1 className="text-5xl text-gray-800 dark:text-white">About Me</h1>
      </div>
      <div className="py-3"></div>
      <h2 className="text-3xl text-gray-800 dark:text-white">Links</h2>
      <div className="py-1"></div>
      <ul>
        <li>
          Github:{' '}
          <a
            className="text-cyan-500 hover:underline underline-offset-2"
            href="https://github.com/mameli"
          >
            @mameli
          </a>
        </li>
        <li>
          Linkedin:{' '}
          <a
            className="text-cyan-500 hover:underline underline-offset-2"
            href="https://www.linkedin.com/in/filippo-mameli-68006067/"
          >
            @filippo-mameli
          </a>
        </li>
        <li>
          Instagram:{' '}
          <a
            className="text-cyan-500 hover:underline underline-offset-2"
            href="https://www.instagram.com/therealmameli/"
          >
            @therealmameli
          </a>
        </li>
        <li>
          Email:{' '}
          <a
            className="text-cyan-500 hover:underline underline-offset-2"
            href="mailto:filippomameli@outlook.com"
          >
            filippomameli@outlook.com
          </a>
        </li>
      </ul>
      <div className="py-3"></div>
      <h2 className="text-3xl text-gray-800 dark:text-white">Bio</h2>
      <div className="py-1"></div>

      <p>
        {' '}
        Hi! I&apos;m Filippo Mameli and I&apos;m a Data Engineer. I studied
        Computer Science in the University of Florence. I have a master deegree
        in Data Science.
        <br />
        I like about Machine Learning, Data Engineering and Web
        Development.
        <br />
        All my personal projects can be found in my{' '}
        <a
          className="text-cyan-500 hover:underline underline-offset-2"
          href="https://github.com/mameli"
        >
          Github
        </a>{' '}
        page.
        <br />
        I also like listening to music, photography, cinema and videogames.
        <br />I wanted to build this site to create something useful for me and
        for anyone who&apos;s interested in software development. In the{' '}
        <Link key="hobbies_page" href="/hobbies">
          <a className="text-cyan-500 hover:underline underline-offset-2">
            Hobbies&apos;s page
          </a>
        </Link>{' '}
        I&apos;ll keep the other things that I&apos;m passionate about.
      </p>
    </div>
  </Layout>
)

export default AboutPage
