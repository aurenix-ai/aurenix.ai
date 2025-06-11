'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900 to-primary" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Your AI Sidekick for
              <br />
              <span className="gradient-text">Enhanced Productivity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of work with Aurenix AI. Boost your productivity and creativity with our cutting-edge AI assistant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button href="/get-started" size="lg">
                Get Started Free
              </Button>
              <Button href="/demo" variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-accent/5 to-transparent opacity-50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Aurenix AI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how our AI-powered platform can transform your workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Automation",
                description: "Automate repetitive tasks and focus on what matters most",
                icon: "🚀",
              },
              {
                title: "Personalized Learning",
                description: "AI that adapts to your unique working style",
                icon: "🧠",
              },
              {
                title: "Seamless Integration",
                description: "Works with your favorite tools and platforms",
                icon: "🔄",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-primary-700/50 backdrop-blur-lg rounded-2xl p-8 hover:bg-primary-600/50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-accent rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of professionals who are already using Aurenix AI to enhance their productivity.
              </p>
              <Button
                href="/get-started"
                variant="outline"
                size="lg"
                className="bg-white hover:bg-white/90 !text-accent border-transparent"
              >
                Start Your Free Trial
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-400 opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo size="md" />
              <p className="text-gray-400 text-sm">
                Empowering your productivity with AI
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Aurenix AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
