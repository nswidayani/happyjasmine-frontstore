import ClientThemeProvider from '../components/ThemeProvider';
import "./globals.css";

export const metadata = {
  title: "Happy Jasmine - Premium Teh Tarik & Happy Tea | Teh Tarik Berasa",
  description: "Discover authentic Malaysian Teh Tarik and premium Happy Tea at Happy Jasmine. Experience the perfect blend of tradition and taste with our signature Teh Tarik Berasa.",
  keywords: "happytea, happy jasmine, teh tarik, teh tarik berasa, malaysian tea, premium tea, authentic teh tarik",
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
  openGraph: {
    title: "Happy Jasmine - Premium Teh Tarik & Happy Tea",
    description: "Experience authentic Malaysian Teh Tarik and premium Happy Tea at Happy Jasmine. Perfect blend of tradition and taste.",
    url: "https://happyjasmine.com",
    siteName: "Happy Jasmine",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Jasmine - Premium Teh Tarik & Happy Tea",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Jasmine - Premium Teh Tarik & Happy Tea",
    description: "Experience authentic Malaysian Teh Tarik and premium Happy Tea at Happy Jasmine.",
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
    "description": "Premium Teh Tarik and Happy Tea experience with authentic Malaysian flavors",
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
        "description": "Authentic Malaysian pulled tea with perfect froth"
      },
      {
        "@type": "MenuItem",
        "name": "Happy Tea",
        "description": "Premium tea blend with unique flavor profile"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/happyjasmine",
      "https://www.instagram.com/happyjasmine"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Teh Tarik & Happy Tea Menu",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Teh Tarik Berasa",
            "description": "Authentic Malaysian Teh Tarik with rich flavor"
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
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
