import { TCategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: TCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer group">
      <div
        className="relative h-16 w-16 md:h-24 md:w-24 rounded-full overflow-hidden
        border border-gray-200 dark:border-gray-700
        shadow-sm group-hover:shadow-md
        bg-white dark:bg-neutral-900
        transition-all duration-300"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3
        className="text-xs md:text-base font-medium text-center
        text-gray-800 dark:text-gray-200
        group-hover:text-primary dark:group-hover:text-primary
        transition-colors duration-300 leading-tight"
      >
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
