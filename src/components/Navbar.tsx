import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogIn, UserPlus, LogOut, Package } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../hooks/useAuth';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { items } = useCartStore();
  const { isAuthenticated, signOut, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAdmin = user?.email === 's.deinegri2@gmail.com';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

            <div className="relative" ref={menuRef}>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Menu"
                  >
                    <User className="h-5 w-5" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                      {isAdmin ? (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setShowMenu(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Administration
                        </Link>
                      ) : (
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setShowMenu(false)}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Mes commandes
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Menu"
                  >
                    <LogIn className="h-5 w-5" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                      <Link
                        to="/auth"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setShowMenu(false)}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Se connecter
                      </Link>
                      <Link
                        to="/auth"
                        state={{ isSignUp: true }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setShowMenu(false)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Créer un compte
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}