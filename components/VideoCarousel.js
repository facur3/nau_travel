"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * props:
 * - videos: string[]
 * - interval: ms (default 10000)
 * - className: string
 * - crossfadeDuration: seconds (default 1.8)
 * - startIndex?: number  // si lo pasás, se usa como primer video; si no, arranca random
 */
const VideoCarousel = ({
  videos = [],
  interval = 10000,
  className = "",
  crossfadeDuration = 1.8,
  startIndex,
}) => {
  // 1) No renderizamos el <video> hasta que el componente monte en cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 2) Elegimos el índice inicial sólo cuando está montado (así evitamos SSR mismatch)
  const safeStartIndex = useMemo(() => {
    if (!mounted || videos.length === 0) return 0;
    if (typeof startIndex === "number" && !Number.isNaN(startIndex)) {
      const norm = ((startIndex % videos.length) + videos.length) % videos.length;
      return norm;
    }
    // random sólo en cliente
    return Math.floor(Math.random() * videos.length);
  }, [mounted, startIndex, videos.length]);

  const [current, setCurrent] = useState(0);

  // Al montar (cliente), seteamos el índice inicial calculado
  useEffect(() => {
    if (mounted && videos.length > 0) setCurrent(safeStartIndex);
  }, [mounted, safeStartIndex, videos.length]);

  // Rotación automática luego del primer render en cliente
  useEffect(() => {
    if (!mounted || videos.length === 0) return;
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % videos.length);
    }, interval);
    return () => clearInterval(t);
  }, [mounted, videos.length, interval]);

  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoaded = () => setIsLoaded(true);

  // Placeholder estable para SSR / antes de montar (evita mismatch)
  if (!mounted || videos.length === 0) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className} pointer-events-none`} aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className} pointer-events-none`}
      aria-hidden="true"
    >
      {/* Crossfade suave: el nuevo hace fade-in mientras el anterior fade-out */}
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
            key={videos[current]} // fuerza repintado limpio al cambiar de índice
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={handleLoaded}
            onError={(e) => console.warn(`Error cargando: ${videos[current]}`, e)}
          >
            <source src={videos[current]} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Overlay para legibilidad del texto por encima */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Fallback visual mientras carga el primer video */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0" />
      )}
    </div>
  );
};

export default VideoCarousel;
