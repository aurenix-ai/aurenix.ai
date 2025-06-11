'use client';

import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 border-t border-primary-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo size="sm" />
            <p className="mt-4 text-gray-400 max-w-md">
              Empowering users with next-generation AI technology for enhanced productivity and innovation.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-800 text-center text-gray-400">
          <p>&copy; {currentYear} Aurenix AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
