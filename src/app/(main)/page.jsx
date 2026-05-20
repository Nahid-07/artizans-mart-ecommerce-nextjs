import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Testimonial from '@/components/Testimonial';
import Newsletter from '@/components/Newsletter';
import FeaturedProducts from '@/components/FeaturedProducts';
import StoryBlock from '@/components/StoryBlock';
import TrustBar from '@/components/TrustBar';

// Do NOT wrap this in <HomePageLayout>
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustBar/>
      <Categories />
      <FeaturedProducts/>
      <StoryBlock/>
      <Testimonial />
      <Newsletter />
    </div>
  );
}