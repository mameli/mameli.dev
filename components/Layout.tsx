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
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar/>
      </header>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout
