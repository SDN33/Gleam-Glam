import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogIn } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { items } = useCartStore();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-serif text-xl flex items-center">
            Gleam & Glam
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 ml-1 text-[#ff4eb4]"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h13.5M6 13.5h12M4.5 16.5h15m-16.5-3h18" />
              <path d="M12 12.75l-8.25-4.5h16.5l-8.25 4.5z" />
              <path d="M12 12.75V21l-8.25-12h16.5L12 21V12.75z" />
            </svg>
            <span className="text-gray-500 ml-2">Paris</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="p-2 hover:bg-gray-100 rounded-full relative group"
            >
              <ShoppingBag className="h-5 w-5" />
              {items.quantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff4eb4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.quantity}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link
                to="/admin"
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Administration"
              >
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                to="/auth"
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Se connecter"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}