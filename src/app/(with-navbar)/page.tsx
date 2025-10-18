import Categories from "./_components/Categories/Categories";
import Features from "./_components/Features/Features";
import HeroBanner from "./_components/HeroBanner/HeroBanner";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <Categories />
      <Features />
    </div>
  );
}
