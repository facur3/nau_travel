"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * props:
 * - videos: string[]
 * - interval: ms (default 10000)
 * - className: string
 * - crossfadeDuration: seconds (default 1.8)
 * - startIndex: number (default 0)
 */
const VideoCarousel = ({
  videos = [],
  interval = 10000,
  className = "",
  crossfadeDuration = 1.8,
  startIndex = 0,
}) => {
  if (!Array.isArray(videos)) videos = [];

  // Usar startIndex proporcionado por el componente padre
  const [current, setCurrent] = useState(startIndex);
  const [isLoaded, setIsLoaded] = useState(false);

  // Update current index when startIndex changes
  useEffect(() => {
    if (videos.length > 0 && startIndex >= 0 && startIndex < videos.length) {
      setCurrent(startIndex);
    }
  }, [startIndex, videos.length]);

  // Rotación automática
  useEffect(() => {
    if (videos.length === 0) return;
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % videos.length);
    }, interval);
    return () => clearInterval(t);
  }, [videos.length, interval]);

  const handleLoaded = () => setIsLoaded(true);

  // Fallback si no hay videos
  if (videos.length === 0) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className} pointer-events-none`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className} pointer-events-none`}
      aria-hidden="true"
    >
      {/* Crossfade real: entra con fade-in mientras el anterior hace fade-out */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: crossfadeDuration, ease: "easeInOut" }}
        >
          <video
            key={videos[current]}                 // fuerza repintado limpio al cambiar
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={handleLoaded}
            onError={(e) => console.warn(`Error cargando: ${videos[current]}`, e)}
          >
            {/* Podés sumar una segunda fuente .webm si querés mayor compatibilidad */}
            <source src={videos[current]} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Overlay para mejorar legibilidad del texto por encima */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Fallback mientras carga el primer video */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0" />
      )}
    </div>
  );
};

export default VideoCarousel;