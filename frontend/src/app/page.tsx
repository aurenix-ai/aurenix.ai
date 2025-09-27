'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/after-login");
    }
  }, [isLoading, isAuthenticated, router]);

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
              <Link href="/coming-soon">
                <Button className="bg-red-900">Get Started</Button>
              </Link>
              <Button href="/coming-soon" variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            {/* Horizontal feature list below buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 text-sm text-gray-300 font-medium">
              <span>Knows your role, goals & workflow</span>
              <span className="hidden sm:inline">|</span>
              <span>Matches tools & prompts to your needs</span>
              <span className="hidden sm:inline">|</span>
              <span>Builds skills in real-time – across individuals & teams</span>
              <span className="hidden sm:inline">|</span>
              <span>Works across ChatGPT, Claude, Gemini & more</span>
              <span className="hidden sm:inline">|</span>
              <span>Turns guidance into progress — fast</span>
            </div>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-accent/5 to-transparent opacity-50" />
        </div>
      </section>

      {/* Aurenix.ai Personal Navigator Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top Heading */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">
                Personal for every user. Powerful across your team.
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
                Not Another Tool.
                <br />
                A Smarter Way to Work.
              </h2>
            </div>
            <div>
              <p className="text-gray-200 text-lg">
                Aurenix is your personal navigator for the entire AI universe.
                It learns how you think, work, and grow – then guides you clearly, calmly, and confidently through the noise.
              </p>
              <p className="text-gray-200 text-lg mt-4">
                Goodbye chaos. Hello clarity, confidence, and real results.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: "/icons/fingerprint.svg",
                title: "You set it up once",
                desc: "In 5 minutes, Aurenix learns your style, role, and goals – so it can support you like it's worked with you for years.",
              },
              {
                icon: "/icons/guide.svg",
                title: "You're guided daily",
                desc: "Your AI will be completely tuned to your needs. You'll get the right prompts, tools, suggestions and support – inside your real tasks as you work.",
              },
              {
                icon: "/icons/target.svg",
                title: "See your mastery grow",
                desc: "Track progress with visual metrics and skill development paths.",
              },
            ].map((feature, i) => (
              <div key={i} className="text-left group transition-all hover:scale-105">
                <div className="w-12 h-12 mb-4 invert brightness-0 saturate-0">
                  <img src={feature.icon} alt={feature.title} className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-auernix" className="py-24 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-white mb-4">Why Aurenix?</h2>
          <p className="text-white text-lg">
            It learns your style. Matches you to the right tools. <br />
            And finally makes AI part of your actual work. <br />
            You don't need more tools. You need a sidekick that guides you through the AI fog to real results.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {/* Card 1 */}
            <div className="relative rounded overflow-hidden shadow-md">
              <img
                src="/images/team-setup.jpg"
                alt="Set up support"
                className="w-full h-110 object-cover grayscale"
              />
              <div className="absolute bottom-0 left-0 p-4 text-left text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <p className="text-sm font-medium opacity-80">Less than few minutes</p>
                <h3 className="text-xl font-semibold">Set up once, get ongoing support</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded overflow-hidden shadow-md">
              <img
                src="/images/master-ai.jpg"
                alt="Master AI"
                className="w-full h-110 object-cover grayscale"
              />
              <div className="absolute bottom-0 left-0 p-4 text-left text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <p className="text-sm font-medium opacity-80">Master AI</p>
                <h3 className="text-xl font-semibold">The fastest way to master AI</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded overflow-hidden shadow-md">
              <img
                src="/images/ai-clarity.jpg"
                alt="AI Clarity"
                className="w-full h-110 object-cover grayscale"
              />
              <div className="absolute bottom-0 left-0 p-4 text-left text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <p className="text-sm font-medium opacity-80">Designed around you</p>
                <h3 className="text-xl font-semibold">From AI confusion to AI clarity</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section id="ai-navigator" className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-400 mb-4">Your AI Navigator</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Everything you need to make AI part of how you actually work.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Left Features */}
            <div className="space-y-10">
              {[
                {
                  icon: "/icons/hub.png",
                  title: "Central Tool Hub",
                  desc: "All your tools. One hub. Zero chaos.",
                },
                {
                  icon: "/icons/book.png",
                  title: "A Growing Library of Prompts, Templates & Tips",
                  desc: "Practical resources to plug into your real work, fast.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-6 h-6 mt-1 filter invert brightness-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="flex justify-center">
              <img
                src="/images/fingerprint-center.png"
                alt="Fingerprint Animation"
                className="w-[320px] rounded-xl shadow-lg"
              />
            </div>

            {/* Right Features */}
            <div className="space-y-10">
              {[
                {
                  icon: "/icons/track.png",
                  title: "Learning Tracks",
                  desc: "Step-by-step pathways to build specific AI skills that matter to you.",
                },
                {
                  icon: "/icons/community.svg",
                  title: "Community Connection",
                  desc: "Share ideas, swap tips, and grow with others learning to use AI like you.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-6 h-6 mt-1 filter invert brightness-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-gray-400 mb-4">BEFORE / AFTER</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Work, life and play with <span className="text-accent">Aurenix</span> is just easier
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before Aurenix Card */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full border border-gray-400 mr-3"></div>
                <div>
                  <h3 className="text-white font-semibold">Before Aurenix</h3>
                  <p className="text-sm text-gray-400">The Struggle</p>
                </div>
              </div>
              <ul className="mt-6 space-y-4 text-gray-300">
                {[
                  "Generic, forgettable outputs",
                  "Tools everywhere",
                  "Wasted time on trial and error",
                  "Prompt chaos",
                  "Time lost, confidence shaken",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 text-xl mt-1">✖</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Aurenix Card */}
            <div className="bg-accent rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center mb-4">
                <img src="/logo_big.png" alt="Aurenix Logo" className="w-10 h-10 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">After Aurenix</h3>
                  <p className="text-sm text-white/80">The Solution</p>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {[
                  "One smart hub to rule them all",
                  "The right tools at the right time",
                  "Personalised, evolving support",
                  "High-impact prompts, done for you",
                  "Confidence regained, value delivered",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-white text-xl mt-1">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
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
              <Link href="/coming-soon">
                <Button className="bg-white hover:bg-white/90 !text-accent border-transparent">Start Your Free Trial</Button>
              </Link>
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
                <li><Link href="#why-auernix" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#ai-navigator" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
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