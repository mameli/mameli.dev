import React, { ReactNode, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Navbar from './Navbar'
import Footer from './Footer'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Mameli.dev' }: Props) => {
  return (
    <div className="dark:bg-gray-800 bg-white flex flex-col h-screen justify-between">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col justify-center px-8 bg-white dark:bg-gray-800">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
