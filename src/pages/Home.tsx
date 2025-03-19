import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Heart, Star, ShoppingBag, Sparkles } from 'lucide-react';

const PRODUCT = {
  name: "Glam Makeup LCD Mirror Box",
  description: "Découvrez notre miroir de maquillage intelligent avec écran LCD intégré. Sa technologie avancée offre un éclairage LED ajustable et un affichage numérique pour une expérience de maquillage parfaite.",
  price: 49.99,
  images: [
    "https://res.cloudinary.com/daroyxenr/image/upload/v1742318672/image_s5__mcikbg.png"
  ]
};

const TESTIMONIALS = [
  {
    name: "Sophie L.",
    role: "Influenceuse Beauté",
    content: "Ce miroir a révolutionné ma routine makeup. L'écran LCD est un vrai game-changer !",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
  },
  {
    name: "Marie D.",
    role: "Maquilleuse Professionnelle",
    content: "Un outil indispensable pour un maquillage professionnel à domicile.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
  },
  {
    name: "Claire B.",
    role: "Beauty Expert",
    content: "La qualité de l'éclairage LED est exceptionnelle. Je recommande !",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
  }
];

const BENEFITS = [
  {
    icon: "✨",
    title: "Écran LCD HD",
    description: "Interface tactile intuitive pour un contrôle parfait"
  },
  {
    icon: "💡",
    title: "LED Ajustable",
    description: "3 modes d'éclairage pour toutes les conditions"
  },
  {
    icon: "🔋",
    title: "Batterie Longue Durée",
    description: "Jusqu'à 8 heures d'autonomie"
  }
];

export default function Home() {
  const { addToCart } = useCartStore();

  return (
    <div className="space-y-24">
      {/* Hero Banner */}
      <div className="relative -mt-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff1f9] via-[#ff4eb4]/30 to-[#ff4eb4]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-center py-16 px-4">
            <div className="md:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-1.5 bg-[#ff4eb4]/20 rounded-full text-sm font-medium text-gray-900">
                  <Sparkles size={16} className="mr-2 text-[#ff4eb4]" />
                  Nouveau • Édition Limitée
                </div>
                <h1 className="text-4xl md:text-5xl font-serif leading-tight">
                  Votre miroir intelligent
                </h1>
                <p className="text-lg text-gray-600">
                  Le Glam Makeup LCD Mirror Box révolutionne votre routine beauté avec sa technologie avancée et son design élégant.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart(1)}
                  className="flex-1 bg-[#ff4eb4] hover:bg-[#ff35aa] text-white py-3 px-8 rounded-full flex items-center justify-center space-x-2 transition duration-200 text-lg font-medium"
                >
                  <ShoppingBag size={20} />
                  <span>Acheter maintenant • {PRODUCT.price}€</span>
                </button>
                <button className="flex-1 sm:flex-none border-2 border-[#ff4eb4] text-gray-900 py-3 px-8 rounded-full hover:bg-[#ff4eb4]/10 transition duration-200">
                  En savoir plus
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                  <span>4.9/5 (128 avis)</span>
                </div>
                <div>✨ Écran LCD HD</div>
                <div>🔋 Batterie longue durée</div>
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <div className="aspect-square max-w-md mx-auto">
                <img 
                  src={PRODUCT.images[0]}
                  alt={PRODUCT.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center space-y-3 shadow-sm">
              <div className="text-3xl">{benefit.icon}</div>
              <h3 className="font-medium">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <img 
                src={PRODUCT.images[0]}
                alt={PRODUCT.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif font-medium text-gray-900">{PRODUCT.name}</h2>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(128 avis)</span>
              </div>
            </div>

            <p className="text-xl font-medium text-gray-900">{PRODUCT.price}€</p>

            <p className="text-gray-600 leading-relaxed">{PRODUCT.description}</p>

            <div className="space-y-4">
              <button
                onClick={() => addToCart(1)}
                className="w-full bg-[#ff4eb4] hover:bg-[#ff35aa] text-white py-3 px-6 rounded-full flex items-center justify-center space-x-2 transition duration-200"
              >
                <ShoppingBag size={20} />
                <span>Ajouter au panier</span>
              </button>

              <button className="w-full border border-[#ff4eb4] text-gray-900 py-3 px-6 rounded-full flex items-center justify-center space-x-2 hover:bg-[#fff1f9] transition duration-200">
                <Heart size={20} />
                <span>Ajouter aux favoris</span>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>✨ Écran LCD HD</span>
                <span>💡 LED Ajustable</span>
                <span>🔋 Batterie longue durée</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-serif mb-6">Notre Histoire</h2>
        <div className="prose prose-lg mx-auto text-gray-600">
          <p className="mb-6">
            Gleam and Glam est né de la volonté de révolutionner l'expérience beauté quotidienne. 
            Notre Glam Makeup LCD Mirror Box représente l'alliance parfaite entre technologie et élégance, 
            offrant une solution innovante pour votre routine beauté.
          </p>
          <p>
            Chaque miroir est conçu avec précision dans nos ateliers, respectant les plus hauts standards de qualité. 
            Notre engagement : vous offrir une expérience beauté exceptionnelle grâce à une technologie de pointe.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white rounded-2xl p-12 mx-4">
        <h2 className="text-3xl font-serif text-center mb-12">Ce qu'elles en pensent</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}