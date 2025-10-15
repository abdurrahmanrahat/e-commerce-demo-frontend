import { getAllCategoriesFromDB } from "@/app/actions/categories";
import Container from "@/components/shared/Ui/Container";
import BannerSlider from "./BannerSlider";
import CategoryMenu from "./CategoryMenu";

const HeroBanner = async () => {
  const categoriesResponse = await getAllCategoriesFromDB();

  return (
    <Container className="">
      <div className="h-[400px] flex gap-4 ">
        <div className="hidden lg:block w-[280px] flex-shrink-0">
          <CategoryMenu categories={categoriesResponse?.data} />
        </div>
        <div className="flex-1">
          <BannerSlider />
        </div>
      </div>
    </Container>
  );
};

export default HeroBanner;
