import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@lessence.com';

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDF8F6]">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/admin"
              element={
                isAdmin ? <Admin /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;