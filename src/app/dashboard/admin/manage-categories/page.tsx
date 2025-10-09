import AddCategory from "./_components/AddCategory";

const ManageCategoriesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Manage Categories</h2>
        <AddCategory />
      </div>

      <div>Lists</div>
    </div>
  );
};

export default ManageCategoriesPage;
