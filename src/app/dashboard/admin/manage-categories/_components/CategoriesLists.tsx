import { getAllCategoriesFromDB } from "@/app/actions/categories";
import { TCategory } from "@/types";
import CategoryCard from "./CategoryCard";

const CategoriesLists = async () => {
  const categories = await getAllCategoriesFromDB();

  return (
    <section className="py-6">
      {/* Grid Layout */}
      <div className="space-y-4">
        {categories?.data?.map((category: TCategory) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesLists;
