"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FeaturedPackages = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const packages = [
    {
      id: 1,
      title: "Japón Tradicional",
      destination: "Tokio • Kioto • Osaka",
      duration: "10 días, 9 noches",
      price: 2850,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop",
      features: ["Vuelos incluidos", "Hoteles 4★", "Tours guiados", "JR Pass incluido"],
      badge: "Más Popular",
      badgeColor: "bg-red-500"
    },
    {
      id: 2,
      title: "Bali Paradisíaco",
      destination: "Ubud • Seminyak • Nusa Dua",
      duration: "8 días, 7 noches",
      price: 1950,
      originalPrice: 2400,
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop",
      features: ["Vuelos incluidos", "Resorts de lujo", "Spa incluido", "Tours privados"],
      badge: "Oferta Limitada",
      badgeColor: "bg-green-500"
    },
    {
      id: 3,
      title: "Singapur Moderno",
      destination: "Marina Bay • Sentosa • Gardens",
      duration: "6 días, 5 noches",
      price: 1650,
      originalPrice: 1900,
      image: "https://images.unsplash.com/photo-1508964942454-1fd5b575c8fd?w=600&h=400&fit=crop",
      features: ["Vuelos incluidos", "Hotel céntrico", "City tour", "Universal Studios"],
      badge: "Nuevo",
      badgeColor: "bg-blue-500"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Paquetes Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Ofertas exclusivas con todo incluido para tus próximas vacaciones
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 ${pkg.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {pkg.badge}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {pkg.duration}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-4">{pkg.destination}</p>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-green-600">${pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through">${pkg.originalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600">por persona, base doble</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-black text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200">
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="hover:cursor-pointer relative px-8 py-4 bg-transparent border-2 border-black text-black font-bold text-lg rounded-2xl shadow-lg transition-all duration-250 overflow-hidden hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-black before:rounded-2xl before:transition-all before:duration-250 before:z-[-1] hover:before:w-full z-10">
            Ver Todos los Paquetes
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
