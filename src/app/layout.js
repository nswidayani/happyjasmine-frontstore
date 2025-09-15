import ClientThemeProvider from '../components/ThemeProvider';
import "./globals.css";

export const metadata = {
  title: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia | Teh Tarik Berasa",
  description: "Temukan Teh Tarik Malaysia asli dan Teh Bahagia premium di Happy Jasmine. Rasakan perpaduan sempurna antara tradisi dan cita rasa dengan Teh Tarik Berasa signature kami.",
  keywords: "happytea, happy jasmine, teh tarik, teh tarik berasa, teh malaysia, teh premium, teh tarik asli",
  authors: [{ name: "Happy Jasmine" }],
  creator: "Happy Jasmine",
  publisher: "Happy Jasmine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://happyjasmine.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia",
    description: "Rasakan Teh Tarik Malaysia asli dan Teh Bahagia premium di Happy Jasmine. Perpaduan sempurna antara tradisi dan cita rasa.",
    url: "https://happyjasmine.com",
    siteName: "Happy Jasmine",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Jasmine - Teh Tarik Premium & Teh Bahagia",
    description: "Rasakan Teh Tarik Malaysia asli dan Teh Bahagia premium di Happy Jasmine.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Font loading moved to _document.js equivalent
const fontLink = {
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css2?family=Bemio:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
  crossOrigin: 'anonymous',
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Happy Jasmine",
    "description": "Pengalaman Teh Tarik premium dan Teh Bahagia dengan rasa Malaysia asli",
    "url": "https://happyjasmine.com",
    "logo": "https://happyjasmine.com/logo.svg",
    "image": "https://happyjasmine.com/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Malaysia"
    },
    "servesCuisine": "Malaysian",
    "menu": [
      {
        "@type": "MenuItem",
        "name": "Teh Tarik",
        "description": "Teh tarik Malaysia asli dengan busa sempurna"
      },
      {
        "@type": "MenuItem",
        "name": "Teh Bahagia",
        "description": "Campuran teh premium dengan profil rasa unik"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/happyjasmine",
      "https://www.instagram.com/happyjasmine"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Menu Teh Tarik & Teh Bahagia",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Teh Tarik Berasa",
            "description": "Teh Tarik Malaysia asli dengan rasa kaya"
          }
        }
      ]
    }
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link {...fontLink} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
