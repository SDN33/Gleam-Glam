import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

const PRODUCT = {
  name: "Glam Makeup LCD Mirror Box",
  price: 29.99,
  image: "https://res.cloudinary.com/daroyxenr/image/upload/v1742420867/t%C3%A9l%C3%A9chargement_1_tubhyi.png"
};

export default function Cart() {
  const { items, addToCart, removeFromCart, clearCart } = useCartStore();
  const total = items.quantity * PRODUCT.price;

  const handleCheckout = async () => {
    // TODO: Implement Stripe checkout
    console.log('Checkout with total:', total);
  };

  if (items.quantity === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-serif mb-4">Votre panier est vide</h2>
        <p className="text-gray-600 mb-8">Découvrez notre produit et commencez votre routine beauté.</p>
        <a href="/" className="text-[#ff4eb4] hover:text-[#ff35aa]">
          Retour à la boutique
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif mb-8">Votre panier</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center">
          <img
            src={PRODUCT.image}
            alt={PRODUCT.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="ml-6 flex-1">
            <h3 className="font-medium">{PRODUCT.name}</h3>
            <p className="text-gray-600 mt-1">{PRODUCT.price}€</p>
            
            <div className="flex items-center mt-4">
              <button
                onClick={() => removeFromCart(1)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Minus size={20} />
              </button>
              <span className="mx-4 min-w-[2ch] text-center">{items.quantity}</span>
              <button
                onClick={() => addToCart(1)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          <button
            onClick={() => clearCart()}
            className="text-gray-400 hover:text-gray-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between mb-4">
          <span>Sous-total</span>
          <span>{total.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Livraison</span>
          <span>Gratuite</span>
        </div>
        <div className="flex justify-between font-medium text-lg border-t pt-4">
          <span>Total</span>
          <span>{total.toFixed(2)}€</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-[#ff4eb4] hover:bg-[#ff35aa] text-white py-3 px-6 rounded-full mt-6 transition duration-200"
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  );
}