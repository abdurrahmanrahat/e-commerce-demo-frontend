import { Breadcrumb } from "@/components/common/Breadcrumb";

type TBannerProps = {
  breadcrumbs: { label: string; href: string }[];
};

const Banner = ({ breadcrumbs }: TBannerProps) => {
  return (
    <div className="relative h-[250px] md:h-[300px] lg:h-[380px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1920')] bg-cover bg-center" />

      {/* Gradient Overlay (adaptive for light/dark theme) */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/60 via-gray-100/70 to-gray-100/60 dark:from-gray-950/90 dark:via-gray-900/85 dark:to-gray-900/90" />

      {/* Optional Floating Overlay for Depth */}

      {/* Centered Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-4 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl text-gray-900 dark:text-gray-200 font-bold uppercase tracking-tight drop-shadow-md">
          Shop
        </h1>
        <p className="text-gray-800 dark:text-gray-300 max-w-lg mx-auto text-sm md:text-base">
          Discover quality, comfort, and innovation — explore our curated
          collection of modern essentials.
        </p>

        <Breadcrumb items={breadcrumbs} />
      </div>
    </div>
  );
};

export default Banner;
