import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ProductGrid from '@/components/ProductGrid';
import Testimonial from '@/components/Testimonial';
import Newsletter from '@/components/Newsletter';

// Do NOT wrap this in <HomePageLayout>
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Categories />
      <ProductGrid />
      <Testimonial />
      <Newsletter />
    </div>
  );
}