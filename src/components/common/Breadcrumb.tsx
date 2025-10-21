import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type TBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumb = ({ items }: TBreadcrumbProps) => {
  return (
    <nav className="flex items-center justify-center gap-2 text-sm text-gray-800 dark:text-gray-300">
      <Link
        href="/"
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />

          <Link
            href={item.href}
            className={`hover:text-primary transition-colors ${
              index === items.length - 1 ? "text-primary font-medium" : ""
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};
