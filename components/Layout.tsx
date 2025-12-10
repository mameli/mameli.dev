import React, { ReactNode, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
    <div className="container mx-auto max-w-full dark:bg-gray-800 bg-white flex flex-col h-screen justify-between">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar layoutNavbar={'max-w-3xl mx-auto px-2 sm:px-6 lg:px-8'} />
      </header>
      <main className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8 pb-2 bg-white dark:bg-gray-800">
        {children}
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}

export default Layout
