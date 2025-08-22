"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import supabase from '../lib/supabaseClient';

// Opcional: desactivar SSR para este componente
const VideoCarousel = dynamic(() => import('../components/VideoCarousel'), { ssr: false });

import CardNav from '../components/CardNav';
import SplitText from '../components/SplitText';
import BlurText from '../components/BlurText';
import ServicesSection from '../components/ServicesSection';
import FeaturedPackages from '../components/FeaturedPackages';
import AsianDestinations from '../components/AsianDestinations';
import TestimonialsSection from '../components/TestimonialsSection';
import QuickContactForm from '../components/QuickContactForm';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const [showSlogan, setShowSlogan] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // leer usuario actual
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    // suscribirse a cambios de sesión
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleTitleComplete = () => {
    setTimeout(() => setShowSlogan(true), 2000);
  };

  // URLs de Cloudinary con los nombres correctos
  const carouselVideos = [
    // Primer video con optimizaciones agresivas para carga rápida
    'https://res.cloudinary.com/dmpfiohfe/video/upload/q_auto:low,c_fill,w_1920,h_1080/v1/avion_ewtksg.mp4',
    'https://res.cloudinary.com/dmpfiohfe/video/upload/q_auto:good/v1/barco_k4fty6.mp4',
    'https://res.cloudinary.com/dmpfiohfe/video/upload/q_auto:good/v1/globos_zjpzoh.mp4',
    'https://res.cloudinary.com/dmpfiohfe/video/upload/q_auto:good/v1/jeep_w4fyoo.mp4',
    'https://res.cloudinary.com/dmpfiohfe/video/upload/q_auto:good/v1/playa_p7rs8j.mp4',
  ];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <VideoCarousel
          videos={carouselVideos}
          interval={10000}
          className="z-0"
        />

        <CardNav
          logo="/logo_nau_travel.png"
          logoAlt="Nau Travel Logo"
          items={[
            {
              label: "Destinos",
              bgColor: "#000",
              textColor: "#fff",
              links: [
                { label: "Europa", ariaLabel: "Viajes a Europa", href: "#europa" },
                { label: "Asia", ariaLabel: "Viajes a Asia", href: "#asia" },
                { label: "América", ariaLabel: "Viajes a América", href: "#america" }
              ]
            },
            {
              label: "Experiencias",
              bgColor: "#000",
              textColor: "#fff",
              links: [
                { label: "Aventura", ariaLabel: "Viajes de Aventura", href: "#aventura" },
                { label: "Relajación", ariaLabel: "Viajes de Relajación", href: "#relax" },
                { label: "Cultural", ariaLabel: "Viajes Culturales", href: "#cultural" }
              ]
            },
            {
              label: "Servicios",
              bgColor: "#000",
              textColor: "#fff",
              links: [
                { label: "Vuelos", ariaLabel: "Reserva de Vuelos", href: "#vuelos" },
                { label: "Hoteles", ariaLabel: "Reserva de Hoteles", href: "#hoteles" },
                { label: "Seguros", ariaLabel: "Seguros de Viaje", href: "#seguros" }
              ]
            }
          ]}
          baseColor="#fff"
          menuColor="#1F2937"
          buttonBgColor="#000"
          buttonTextColor="#fff"
          ease="power3.out"
        />

        <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <SplitText
              text="NAU TRAVEL"
              className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
              delay={80}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 60, rotateX: -90 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.3}
              textAlign="center"
              onAnimationComplete={handleTitleComplete}
            />
            <BlurText
              text="El viaje de tu vida comienza nau"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-xl md:text-2xl text-white font-light tracking-wide mb-8 drop-shadow-lg"
            />
          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-4">
            <button className="hover:cursor-pointer relative px-6 py-4 bg-white bg-opacity-90 text-gray-800 font-bold text-lg rounded-2xl shadow-lg transition-all duration-250 overflow-hidden hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-black before:rounded-2xl before:transition-all before:duration-250 before:z-[-1] hover:before:w-full z-10 backdrop-blur-sm">
              Explorar Destinos
            </button>
            {user ? (
              <button
                onClick={async () => { await supabase.auth.signOut(); }}
                className="hover:cursor-pointer relative px-6 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-250 overflow-hidden hover:text-black before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-white before:rounded-2xl before:transition-all before:duration-250 before:z-[-1] hover:before:w-full z-10 backdrop-blur-sm"
              >
                Cerrar sesión
              </button>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="hover:cursor-pointer relative px-6 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-250 overflow-hidden hover:text-black before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-white before:rounded-2xl before:transition-all before:duration-250 before:z-[-1] hover:before:w-full z-10 backdrop-blur-sm"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </main>
      </div>

      <ServicesSection />
      <FeaturedPackages />
      <AsianDestinations />
      <TestimonialsSection />
      <QuickContactForm />
      <Footer />
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
}