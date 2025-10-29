import Categories from "./_components/Categories/Categories";
import Features from "./_components/Features/Features";
import HeroBanner from "./_components/HeroBanner/HeroBanner";
import RecentProducts from "./_components/RecentProducts/RecentProducts";

export default function HomePage() {
  return (
    <div className="pb-12 md:pb-16">
      <HeroBanner />
      <Categories />
      <RecentProducts />
      <Features />
    </div>
  );
}
