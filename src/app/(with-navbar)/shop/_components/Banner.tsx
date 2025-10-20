import { ReactNode } from "react";

interface BannerProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  backgroundImage?: string;
  children?: ReactNode;
}

export const Banner = ({
  title,
  breadcrumbs,
  backgroundImage,
  children,
}: BannerProps) => {
  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg mb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : "linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--primary) / 0.7))",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>

        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm text-white/90">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}

        {children}
      </div>
    </div>
  );
};
