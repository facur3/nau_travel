"use client";
import SplitText from './SplitText';
import { cn } from '../lib/utils';

const SeasonCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end p-6 w-full md:w-1/3 h-[350px] lg:h-[450px] bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:w-2/3",
        className
      )}
    >
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        alt={imageAlt || title}
        loading="lazy"
        onError={(e) => {
          console.error(`Failed to load image: ${imageSrc}`);
          // Keep the image element but show a fallback background
          e.target.style.opacity = '0';
          e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }}
        onLoad={() => {
          console.log(`Image loaded successfully: ${imageSrc}`);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="transform transition-transform duration-500 ease-in-out group-hover:-translate-y-16">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-300">{subtitle}</p>
        </div>
        <div className="absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
          <p className="text-base text-white leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const SeasonalHoverCards = ({
  cards,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap md:flex-nowrap gap-4 w-full px-4", className)}>
      {cards.map((card, index) => (
        <SeasonCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
        />
      ))}
    </div>
  );
};

const AsianDestinations = () => {
  const destinations = [
    {
      title: 'Tokio, Japón',
      subtitle: 'Metrópolis futurista',
      description: 'La metrópolis futurista donde la tradición milenaria se encuentra con la tecnología más avanzada. Descubre templos antiguos, tecnología futurista y gastronomía única.',
      imageSrc: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
      imageAlt: 'Tokyo skyline with traditional and modern architecture',
    },
    {
      title: 'Bali, Indonesia',
      subtitle: 'Paraíso tropical',
      description: 'Paraíso tropical con templos sagrados, playas paradisíacas y cultura vibrante. Explora templos hinduistas, playas de ensueño y la auténtica cultura balinesa.',
      imageSrc: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
      imageAlt: 'Beautiful Bali temple surrounded by tropical nature',
    },
    {
      title: 'Seúl, Corea del Sur',
      subtitle: 'Capital moderna',
      description: 'Capital moderna llena de innovación, K-pop, tecnología y tradiciones coreanas. Visita palacios históricos, sumérgete en la cultura K-pop y descubre tecnología avanzada.',
      imageSrc: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
      imageAlt: 'Seoul modern cityscape with traditional palaces',
    },
    {
      title: 'Kioto, Japón',
      subtitle: 'Antigua capital imperial',
      description: 'Antigua capital imperial con miles de templos, jardines zen y geishas. Explora templos dorados, jardines zen y el distrito de geishas.',
      imageSrc: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
      imageAlt: 'Fushimi Inari Shrine in Kyoto, Japan',
    },
    {
      title: 'Singapur',
      subtitle: 'Ciudad-estado cosmopolita',
      description: 'Ciudad-estado cosmopolita con arquitectura impresionante y fusión cultural. Visita Gardens by the Bay, Marina Bay Sands y disfruta de su diversidad cultural.',
      imageSrc: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
      imageAlt: 'Gardens by the Bay in Singapore',
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

        <SeasonalHoverCards
          cards={destinations}
          className="mb-16"
        />

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
