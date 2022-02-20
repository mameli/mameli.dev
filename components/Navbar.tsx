import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const Navbar = ({ layoutNavbar }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Resources', href: '/resources', current: false },
    // { name: 'Setup', href: '/setup', current: false },
    { name: 'Hobbies', href: '/hobbies', current: false },
    { name: 'About', href: '/about', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" className="dark:bg-gray-800 bg-white pb-2">
      {({ open }) => (
        <>
          <div className={layoutNavbar}>
            <div className="relative flex items-center justify-between h-14 ">
              <div className="flex-1 flex justify-center sm:items-stretch sm:justify-start">
                <div className="flex-auto flex items-center">
                  <Link href="/">
                    <a key="logo" className="text-2xl rounded-md font-medium">
                      Mameli.Dev
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className="hover:underline decoration-wavy underline-offset-8 decoration-green-500 p-2 rounded-xl text-lg font-medium"
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    <button
                      aria-label="Toggle Dark Mode"
                      type="button"
                      className="w-10 h-10 rounded-xl flex items-center justify-center hover:ring-2 ring-gray-900 dark:ring-gray-300 transition-all text-cyan-500 dark:text-yellow-500"
                      onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                      }
                    >
                      {mounted && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          {theme === 'dark' ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                          )}
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded hover:ring-2 ring-gray-900 dark:ring-gray-300 ring-offset-4">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-7 w-7" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="hover:underline decoration-wavy underline-offset-8 decoration-green-500 p-2 rounded-xl text-lg font-medium block px-2 py-2 dark:text-white text-right"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="px-2">
              <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="w-10 h-10 rounded-lg flex items-center justify-center  hover:ring-2 ring-gray-900 dark:ring-gray-300 transition-all ml-auto "
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {mounted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-7 h-7 text-cyan-500 dark:text-yellow-500"
                  >
                    {theme === 'dark' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    )}
                  </svg>
                )}
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
