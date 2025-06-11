'use client';

import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Natural Conversations',
    description: 'Engage in fluid, context-aware conversations that feel natural and intuitive.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure & Private',
    description: 'Your data is encrypted and protected with enterprise-grade security measures.'
  },
  {
    icon: SparklesIcon,
    title: 'Advanced AI',
    description: 'Powered by state-of-the-art AI models to deliver accurate and helpful responses.'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-primary-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            Why Choose <span className="gradient-text">Aurenix AI</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with user-friendly design to deliver an unmatched AI experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-primary-800/50 rounded-xl p-6 backdrop-blur-sm"
            >
              <feature.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
