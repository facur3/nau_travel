import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nau Travel - Agencia de Viajes | Paquetes Turísticos Asia",
  description: "Descubre los mejores destinos asiáticos con Nau Travel. Paquetes a Japón, Bali, Singapur y más. Vuelos, hoteles y tours incluidos. ¡Reserva tu viaje soñado!",
  keywords: "viajes asia, paquetes turisticos japon, viajes bali, agencia viajes argentina, tours singapur, vacaciones asia",
  authors: [{ name: "Nau Travel" }],
  creator: "Nau Travel",
  publisher: "Nau Travel",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nautravel.net",
    title: "Nau Travel - Tu Agencia de Viajes de Confianza",
    description: "Especialistas en destinos asiáticos. Paquetes completos con vuelos, hoteles y tours guiados. Más de 1000 viajeros satisfechos.",
    siteName: "Nau Travel",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nau Travel - Agencia de Viajes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nau Travel - Agencia de Viajes",
    description: "Tu próxima aventura asiática comienza aquí. Paquetes completos y personalizados.",
    creator: "@nautravel",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nautravel.net",
  },
  other: {
    "contact:email": "infoviaje@nautravel.net",
    "contact:phone_number": "+54 11 1234-5678",
    "contact:country_name": "Argentina",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Nau Travel",
              "description": "Agencia de viajes especializada en destinos asiáticos",
              "url": "https://nautravel.net",
              "telephone": "+54 11 1234-5678",
              "email": "infoviaje@nautravel.net",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AR",
                "addressLocality": "Buenos Aires"
              },
              "sameAs": [
                "https://facebook.com/nautravel",
                "https://instagram.com/nautravel",
                "https://twitter.com/nautravel"
              ],
              "priceRange": "$1000-$5000",
              "serviceType": ["Viajes internacionales", "Paquetes turísticos", "Tours guiados"],
              "areaServed": "Argentina"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
