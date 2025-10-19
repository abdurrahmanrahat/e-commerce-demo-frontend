import Container from "@/components/shared/Ui/Container";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Package, Phone, ShieldCheck, ShoppingBag } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Easy Shopping",
    description: "Browse thousands of products with easy filtering and search.",
    icon: ShoppingBag,
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/25",
    hoverShadow: "hover:shadow-blue-500/40",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description: "Quick and reliable delivery to your doorstep.",
    icon: Package,
    gradient: "bg-gradient-to-br from-green-500 to-green-600",
    shadow: "shadow-green-500/25",
    hoverShadow: "hover:shadow-green-500/40",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Get help whenever you need it from our support team.",
    icon: Phone,
    gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    shadow: "shadow-purple-500/25",
    hoverShadow: "hover:shadow-purple-500/40",
  },
  {
    id: 4,
    title: "Original Products",
    description: "We ensure 100% authentic and verified products only.",
    icon: ShieldCheck,
    gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
    shadow: "shadow-orange-500/25",
    hoverShadow: "hover:shadow-orange-500/40",
  },
];

const Features = () => {
  return (
    <Container className="py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.id}
              className="group relative overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-deep-dark transition-all duration-500 ease-out hover:-translate-y-1 "
            >
              <CardContent className="relative pt-8 pb-6 px-6">
                {/* Icon container with gradient */}
                <div className="relative mb-6">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center mx-auto",
                      "transition-all duration-500 ease-out ",
                      "group-hover:scale-110 group-hover:rotate-3",
                      item.gradient
                      //   item.shadow,
                      //   item.hoverShadow
                    )}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Glow effect on hover */}
                  {/* <div
                    className={cn(
                      "absolute inset-0 rounded-2xl blur-xl opacity-0",
                      "transition-opacity duration-500",
                      "group-hover:opacity-30",
                      item.gradient
                    )}
                  /> */}
                </div>

                {/* Content */}
                <div className="text-center space-y-2">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle background gradient on hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-500",
                    "group-hover:opacity-5 -z-10",
                    item.gradient
                  )}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default Features;
