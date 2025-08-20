"use client";
import PixelTransition from './PixelTransition';
import SplitText from './SplitText';

const AsianDestinations = () => {
  const destinations = [
    {
      id: 'tokyo',
      name: 'Tokio, Japón',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
      description: 'La metrópolis futurista donde la tradición milenaria se encuentra con la tecnología más avanzada.',
      highlights: ['Templos antiguos', 'Tecnología futurista', 'Gastronomía única'],
    },
    {
      id: 'bali',
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1000&auto=format&fit=crop',
      description: 'Paraíso tropical con templos sagrados, playas paradisíacas y cultura vibrante.',
      highlights: ['Templos hinduistas', 'Playas de ensueño', 'Cultura balinesa'],
    },
    {
      id: 'seoul',
      name: 'Seúl, Corea del Sur',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop',
      description: 'Capital moderna llena de innovación, K-pop, tecnología y tradiciones coreanas.',
      highlights: ['Palacios históricos', 'Cultura K-pop', 'Tecnología avanzada'],
    },
    {
      id: 'kyoto',
      name: 'Kioto, Japón',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
      description: 'Antigua capital imperial con miles de templos, jardines zen y geishas.',
      highlights: ['Templos dorados', 'Jardines zen', 'Distrito de geishas'],
    },
    {
      id: 'singapore',
      name: 'Singapur',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop',
      description: 'Ciudad-estado cosmopolita con arquitectura impresionante y fusión cultural.',
      highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Diversidad cultural'],
    },
    {
      id: 'bangkok',
      name: 'Bangkok, Tailandia',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop',
      description: 'Vibrante capital con templos dorados, mercados flotantes y street food increíble.',
      highlights: ['Templos budistas', 'Mercados flotantes', 'Gastronomía thai'],
    },
  ];

  return (
    <section className="py-20 px-8 bg-black relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <SplitText
            text="DESTINOS ASIÁTICOS"
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            delay={60}
            duration={0.6}
            ease="power2.out"
            splitType="chars"
            from={{ opacity: 0, y: 40, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            threshold={0.2}
            textAlign="center"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre la magia del continente asiático, donde cada destino cuenta una historia milenaria
            y ofrece experiencias únicas que transformarán tu perspectiva del mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {destinations.map((destination, index) => (
            <div key={destination.id} className="w-full max-w-xs transform transition-transform duration-300 hover:scale-105">
              <PixelTransition
                className="w-full"
                gridSize={16}
                pixelColor="#ffffff"
                animationStepDuration={0.4}
                aspectRatio="100%"
                firstContent={
                  <div className="relative w-full h-full">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load image: ${destination.image}`);
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white text-lg font-bold">
                        {destination.name}
                      </h3>
                    </div>
                  </div>
                }
                secondContent={
                  <div className="w-full h-full bg-black p-3 flex flex-col justify-center">
                    <h3 className="text-white text-sm font-bold mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-gray-300 text-xs mb-2 leading-tight line-clamp-3">
                      {destination.description}
                    </p>
                    <div className="space-y-1 mb-2">
                      {destination.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-400">
                          <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                          {highlight}
                        </div>
                      ))}
                    </div>
                    <button className="bg-white text-black text-xs font-semibold py-1.5 px-3 rounded-md hover:bg-gray-200 transition-colors">
                      Explorar
                    </button>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
            <button className="hover:cursor-pointer relative px-6 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-250 overflow-hidden hover:text-black before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-white before:rounded-2xl before:transition-all before:duration-250 before:z-[-1] hover:before:w-full z-10 backdrop-blur-sm">
              Ver Todos los Destinos Asiáticos
            </button>
        </div>
      </div>
    </section>
  );
};

export default AsianDestinations;
