'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { UserButton } from '@/components/UserButton'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  const menuItems = [
    // Only show Features and Solutions if not logged in
    ...(!isLoading && !isAuthenticated
      ? [
          { name: 'Features', href: '/#why-auernix' },
          { name: 'Solutions', href: '/#ai-navigator' },
        ]
      : []),
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <Logo href="/public/logo_big.png" className="w-10 h-10 md:w-11 md:h-11" /> */}/
            <img src="/logo_big.png" alt="Aurenix Logo" className="w-10 h-10 md:w-11 md:h-11" />

            <span className="text-lg font-mono tracking-tight text-white select-none hidden sm:inline font-orbitron relative top-[6px]">
              urenix.ai
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {!isLoading && (
              <>
                {!isAuthenticated ? (
                  <Link href="/sign-in">
                    <Button className="bg-red-900 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                      Get Started
                    </Button>
                  </Link>
                ) : (
                  <UserButton />
                )}
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!isLoading && (
                <>
                  {!isAuthenticated ? (
                    <Link
                      href="/sign-in"
                      className="block px-3 py-2 text-accent hover:text-accent-400 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  ) : (
                    <div className="px-3 py-2">
                      <UserButton />
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar