
import Providers from '@/components/Providers';
import './globals.css';

export const metadata = {
  title: {
    template: "%s | Artizans' Mart",
    default: "Artizans' Mart | Elevating Your Everyday Tech", // Shows on the homepage
  },
  description: "Discover our carefully curated selection of premium electronics and accessories designed for the modern lifestyle.",
  keywords: ["electronics", "premium tech", "headphones", "smartwatches", "e-commerce", "Bangladesh"],
  openGraph: {
    title: "Artizans' Mart | Premium Tech",
    description: "Discover our carefully curated selection of premium electronics and accessories.",
    url: 'https://your-future-domain.com',
    siteName: "Artizans' Mart",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1200&auto=format&fit=crop', // A beautiful fallback image
        width: 1200,
        height: 630,
        alt: "Artizans' Mart Storefront",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Artizans' Mart | Premium Tech",
    description: "Discover our carefully curated selection of premium electronics.",
    images: ['https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1200&auto=format&fit=crop'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* We will add your Navbar here in the next step */}
          <main className="min-h-screen">
            {children}
          </main>
          {/* We will add your Footer here in the next step */}
        </Providers>
      </body>
    </html>
  );
}