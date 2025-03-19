import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { items } = useCartStore();
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@lessence.com';

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-serif text-2xl text-[#ff4eb4]">
            Gleam and Glam
          </Link>

          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            )}
            <Link to="/orders" className="text-gray-600 hover:text-gray-900">
              <User size={24} />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingBag size={24} />
              {items.quantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff4eb4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.quantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}