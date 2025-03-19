import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">À propos</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">Notre histoire</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">Nos engagements</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">Blog beauté</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Service client</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">Livraison</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">Retours</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:contact@lessence.com" className="text-gray-600 hover:text-gray-900">
                  contact@lessence.com
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="text-gray-600 hover:text-gray-900">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 L'Essence. Fait avec <Heart size={12} className="inline text-[#F7CAC9]" /> à Paris
          </p>
        </div>
      </div>
    </footer>
  );
}