"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, BarChart3, MessageSquare, Target, Zap } from 'lucide-react'
import Navbar from "@/components/navbar"
import ParticleBackground from "@/components/particle-background"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

        <motion.div
          className="container max-w-5xl mx-auto text-center z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500"
            variants={fadeInUp}
          >
            Supercharge Your Sales with AI
          </motion.h1>

          <motion.p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto" variants={fadeInUp}>
            Automate lead scoring, outreach, and insights with cutting-edge AI technology.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link href="/signin">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:scale-105">
                Get Started Free <ChevronRight className="inline ml-2" size={18} />
              </button>
            </Link>
          </motion.div>

          <motion.p className="mt-4 text-gray-400 text-sm" variants={fadeInUp}>
            No credit card required • Free 48-hours trial
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <ChevronRight size={30} className="rotate-90 text-gray-400" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black pointer-events-none" />

        <div className="container max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: scrollY > 300 ? 1 : 0, y: scrollY > 300 ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful AI Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our platform leverages cutting-edge AI to transform your sales process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="h-10 w-10 text-purple-500" />,
                title: "Smart Lead Scoring",
                description:
                  "Automatically rank leads based on likelihood to convert using our proprietary AI algorithm.",
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-pink-500" />,
                title: "AI Outreach",
                description: "Generate personalized messages that resonate with your prospects at scale.",
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-amber-500" />,
                title: "Predictive Analytics",
                description: "Forecast sales trends and identify opportunities before your competitors.",
              },
              {
                icon: <Zap className="h-10 w-10 text-blue-500" />,
                title: "Automated Workflows",
                description: "Set up intelligent workflows that respond to customer behavior in real-time.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: scrollY > 400 + index * 50 ? 1 : 0,
                  y: scrollY > 400 + index * 50 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />

        <motion.div
          className="container max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrollY > 1000 ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Sales Process?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of sales teams already using our AI platform to close more deals with less effort.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 rounded-full bg-transparent border border-purple-500 text-white font-medium text-lg hover:bg-purple-500/10 transition-all duration-300">
                Request Demo
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500">© 2025 AI Sales Platform. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
