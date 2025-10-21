import { Breadcrumb } from "@/components/common/Breadcrumb";

const Banner = ({ breadcrumbs }) => {
  return (
    <div className="relative h-[300px] bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1920')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 container mx-auto px-4 text-center space-y-4">
        <h1 className="text-5xl font-bold">Shop</h1>
        <Breadcrumb items={breadcrumbs} />
      </div>
    </div>
  );
};

export default Banner;
