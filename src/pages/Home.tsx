import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Heart, Star, ShoppingBag, Sparkles, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const PRODUCT = {
  name: "Glam Makeup LED Mirror Box 💎",
  description: "Découvrez notre miroir de maquillage intelligent avec 52 LED et 3 modes d'éclairage ajustables. Parfait pour le voyage, il combine un miroir HD avec un espace de rangement pratique pour tous vos essentiels beauté.",
  price: 29.99,
  images: [
    "https://ae-pic-a1.aliexpress-media.com/kf/S1bfe25329ccc4715a52b2ccd9a241b571.jpg_960x960q75.jpg_.avif",
    "https://res.cloudinary.com/daroyxenr/image/upload/v1742420867/t%C3%A9l%C3%A9chargement_1_tubhyi.png",
    "https://res.cloudinary.com/daroyxenr/image/upload/v1742420867/t%C3%A9l%C3%A9chargement_kniyar.png"
  ]
};

const TESTIMONIALS = [
  {
    name: "Sophie L.",
    role: "Influenceuse Beauté",
    content: "Ce miroir a révolutionné ma routine makeup. L'éclairage LED est un vrai game-changer !",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
  },
  {
    name: "Marie D.",
    role: "Maquilleuse Professionnelle",
    content: "Un outil indispensable pour un maquillage professionnel à domicile et partout ailleurs.",
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
    icon: "💡",
    title: "Éclairage LED Professionnel",
    description: "52 LED avec 3 modes de lumière : blanc, chaud et froid. Luminosité ajustable par simple toucher"
  },
  {
    icon: "✨",
    title: "Design 2-en-1",
    description: "Miroir détachable et espace de rangement intégré pour cosmétiques et bijoux"
  },
  {
    icon: "🔋",
    title: "Double Alimentation",
    description: "Batterie rechargeable USB ou piles AAA pour une utilisation partout"
  }
];

export default function Home() {
  const { addToCart } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(PRODUCT.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [showZoom, setShowZoom] = useState(false);

  return (
    <div className="space-y-24">
      {/* Sticky Add to Cart Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg md:hidden z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[#ff4eb4] font-bold">{PRODUCT.price}€</div>
          <button
            onClick={() => addToCart(quantity)}
            className="flex-1 bg-[#ff4eb4] text-white py-3 px-6 rounded-full flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={20} />
            <span>Ajouter au panier</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff1f9] via-[#ff4eb4]/30 to-[#ff4eb4]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto -mt-8">
          <div className="grid md:grid-cols-12 gap-8 items-center py-6 md:py-16 px-4">
            <div className="md:col-span-7 space-y-8">
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 items-center mt-10">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                  <span className="mr-2">🚚</span> Livraison gratuite
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-1.5 bg-[#ff4eb4]/20 rounded-full text-sm font-medium text-gray-900">
                  <Sparkles size={16} className="mr-2 text-[#ff4eb4]" />
                  <span className="animate-pulse">Nouveau • Édition Limitée</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                  Votre miroir <span className="text-[#ff4eb4]">intelligent</span>
                </h1>
                <p className="text-lg text-gray-600 md:text-xl">
                  Le Glam Makeup LED Mirror Box révolutionne votre routine beauté avec son éclairage avancé et son design élégant.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart(1)}
                  className="flex-1 bg-[#ff4eb4] hover:bg-[#ff35aa] text-white py-4 px-8 rounded-full flex items-center justify-center space-x-2 transition duration-200 text-lg font-medium group"
                >
                  <ShoppingBag className="group-hover:scale-110 transition-transform" size={20} />
                  <span>Acheter maintenant • {PRODUCT.price}€</span>
                </button>
                <button className="flex-1 sm:flex-none border-2 border-[#ff4eb4] text-gray-900 py-4 px-8 rounded-full hover:bg-[#ff4eb4]/10 transition duration-200 group">
                  <span className="group-hover:translate-x-1 transition-transform inline-block">En savoir plus →</span>
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-medium">4.9/5</span>
                  <span className="ml-1 text-gray-500">(128 avis)</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">✨ Éclairage LED</div>
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">🔋 Batterie longue durée</div>
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <div className="aspect-square max-w-md mx-auto relative group">
                <img 
                  src={selectedImage}
                  alt={PRODUCT.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
                <button 
                  onClick={() => setShowZoom(true)}
                  className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ZoomIn size={20} />
                </button>
              </div>
              <div className="flex justify-center mt-4 gap-2">
                {PRODUCT.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image ? 'border-[#ff4eb4] scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${PRODUCT.name} - Vue ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section with Animation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 text-center space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl bg-[#ff4eb4]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                {benefit.icon}
              </div>
              <h3 className="font-medium text-xl">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details with Sticky Buy Button */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="sticky top-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                <img 
                  src={selectedImage}
                  alt={`${PRODUCT.name} - Vue principale`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-center mt-6 gap-4">
                {PRODUCT.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative rounded-lg overflow-hidden ${
                      selectedImage === image ? 'ring-2 ring-[#ff4eb4]' : ''
                    }`}
                  >
                    <div className="aspect-square w-20">
                      <img 
                        src={image}
                        alt={`${PRODUCT.name} - Vue ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-serif font-medium text-gray-900 mb-4">{PRODUCT.name}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-lg font-medium">4.9</span>
                <span className="text-gray-500">(128 avis vérifiés)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <p className="text-3xl font-bold text-[#ff4eb4]">{PRODUCT.price}€</p>
              <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                En stock
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">{PRODUCT.description}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">Quantité:</label>
                <div className="flex items-center border rounded-full">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-l-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-r-full"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => addToCart(quantity)}
                  className="w-full bg-[#ff4eb4] hover:bg-[#ff35aa] text-white py-4 px-6 rounded-full flex items-center justify-center space-x-2 transition duration-200 text-lg font-medium group"
                >
                  <ShoppingBag className="group-hover:scale-110 transition-transform" size={24} />
                  <span>Ajouter au panier</span>
                </button>

                <button className="w-full border-2 border-[#ff4eb4] text-gray-900 py-4 px-6 rounded-full flex items-center justify-center space-x-2 hover:bg-[#fff1f9] transition duration-200 group">
                  <Heart className="group-hover:text-[#ff4eb4] transition-colors" size={24} />
                  <span>Ajouter aux favoris</span>
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-xl">
                  <span className="text-2xl">📏</span>
                  <div>
                    <h4 className="font-medium">Format Voyage</h4>
                    <p className="text-sm text-gray-600">23,4 x 10,5 x 11,5 cm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-xl">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-medium">Éclairage Intelligent</h4>
                    <p className="text-sm text-gray-600">3 modes LED ajustables</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="font-medium text-lg">Caractéristiques principales :</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>3 modes d'éclairage LED (blanc, chaud, froid) avec intensité ajustable pour un maquillage parfait en toute situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Miroir HD détachable avec angle réglable pour une utilisation flexible sur toutes les surfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Espace de rangement intégré idéal pour organiser cosmétiques et bijoux lors de vos déplacements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Double alimentation : batterie rechargeable USB ou piles AAA pour une utilisation prolongée</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story with Parallax Effect */}
      <section className="relative py-24 bg-[#fff1f9]">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-serif mb-8">Notre Histoire</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6 text-xl leading-relaxed">
              Gleam and Glam est né de la volonté de révolutionner l'expérience beauté quotidienne. 
              Notre Glam Makeup LED Mirror Box représente l'alliance parfaite entre technologie et élégance, 
              offrant une solution innovante pour votre routine beauté.
            </p>
            <p className="text-xl leading-relaxed">
              Chaque miroir est conçu avec précision dans nos ateliers, respectant les plus hauts standards de qualité. 
              Notre engagement : vous offrir une expérience beauté exceptionnelle grâce à une technologie de pointe.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials with Improved Design */}
      <section className="bg-white rounded-3xl p-12 mx-4 shadow-xl">
        <h2 className="text-4xl font-serif text-center mb-12">Ce qu'elles en pensent</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="text-center space-y-6 p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-[#ff4eb4]/20">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#ff4eb4] text-white p-2 rounded-full">
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-xl">{testimonial.name}</h3>
                <p className="text-[#ff4eb4] font-medium">{testimonial.role}</p>
              </div>
              <p className="text-gray-600 italic text-lg">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowZoom(false)}>
          <div className="relative max-w-4xl w-full aspect-square">
            <img 
              src={selectedImage}
              alt={PRODUCT.name}
              className="w-full h-full object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white hover:text-[#ff4eb4] transition-colors"
              onClick={() => setShowZoom(false)}
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}