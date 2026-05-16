
import Providers from '@/components/Providers';
import './globals.css';

export const metadata = {
  title: 'Artizans Mart',
  description: 'Premium Electronics Store',
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