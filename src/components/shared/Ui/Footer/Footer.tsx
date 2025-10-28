import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Container from "../Container";

const quickLinks = [
  { label: "About us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Returns & Refund", href: "/returns-and-refund" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const categories = [
  {
    label: "Smartphones & Accessories",
    href: "/products?category=smartphones-and-accessories",
  },
  {
    label: "Laptops & Computers",
    href: "/products?category=laptops-and-computers",
  },
  {
    label: "Smart Wearables",
    href: "/products?category=smart-wearables",
  },
  {
    label: "Gaming & Entertainment",
    href: "/products?category=gaming-and-entertainment",
  },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 pt-12 md:pt-16 mt-4 md:mt-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent uppercase">
              Gadgetoria
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted source for quality Xiaomi replacement parts and
              accessories.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              Top Categories
            </h3>
            <ul className="space-y-2">
              {categories.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-500">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-500">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm leading-relaxed">
                  123 Repair Street, Electronics District, 12345
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a
                  href="tel:+12345678900"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a
                  href="mailto:support@gadgetoria.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  support@gadgetoria.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-5">
        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Gadgetoria. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
