'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import { Logo } from './Logo';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-800/50 to-primary" />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Logo size="lg" className="mx-auto mb-8" />
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Next Generation <span className="gradient-text">AI Assistant</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of AI assistance with our powerful, intuitive, and secure platform designed to enhance your productivity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" href="/signup">
              Get Started
            </Button>
            <Button size="lg" variant="outline" href="/learn-more">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-400/10 rounded-full filter blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
