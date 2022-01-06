import React, { ReactNode, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Mameli.dev' }: Props) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
              onClick={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            >{theme}</button>
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>Footer</span>
      </footer>
    </div>
  )
}

export default Layout
