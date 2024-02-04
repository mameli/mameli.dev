import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About">
    <div>
      <div>
        <h1 className="text-4xl text-gray-800 dark:text-white">About Me</h1>
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
        Hi! I&apos;m Filippo Mameli and I&apos;m a Ai Engineer. I studied
        Computer Science in the University of Florence. I have a master degree
        in Data Science.
        <br />
        I like Machine Learning, Data Engineering and Web Development.
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
        <br />
        If you are hiring, you can get my cv{' '}
        <a
          className="text-cyan-500 hover:underline underline-offset-2"
          href="https://github.com/mameli/mameli.dev/raw/main/cv/Filippo_Mameli_EN_Resume.pdf"
        >
          here
        </a>
        .
      </p>
    </div>
  </Layout>
)

export default AboutPage
