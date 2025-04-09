"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.9)"])

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <motion.nav style={{ backgroundColor }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-20 relative">
          {/* Mobile menu button - positioned on the left */}
          <div className="absolute left-0 md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center content with logo and navigation */}
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center space-x-8 bg-black rounded-full px-6 py-2 border border-gray-800 shadow-lg">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <motion.div
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Ma<span className="font-light">ntra</span>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/blog">Blog</NavLink>
              </div>

              {/* Sign In Button */}
              <Link href="/signin">
                <motion.button
                  className="px-5 py-2 rounded-full bg-transparent border border-purple-500 text-white hover:bg-purple-500/10 transition-colors"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black border border-gray-800 rounded-b-2xl mx-4 shadow-lg"
        >
          <div className="px-4 py-6 space-y-4">
            {/* Removed Features
            <MobileNavLink href="/pricing" onClick={() => setIsOpen(false)}>
              Pricing
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </MobileNavLink> */}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="relative group">
      <span className="text-gray-300 hover:text-white transition-colors">{children}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link href={href} onClick={onClick} className="block py-2 text-gray-300 hover:text-white transition-colors">
      {children}
    </Link>
  )
}
