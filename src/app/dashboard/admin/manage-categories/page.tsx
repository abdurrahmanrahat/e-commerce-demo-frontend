import AddCategory from "./_components/AddCategory";
import CategoriesLists from "./_components/CategoriesLists";

const ManageCategoriesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            Manage Categories
          </h2>
          <p className="text-base mt-1">
            Explore all available categories and their subcategories
          </p>
        </div>
        <AddCategory />
      </div>

      <CategoriesLists />
    </div>
  );
};

export default ManageCategoriesPage;
