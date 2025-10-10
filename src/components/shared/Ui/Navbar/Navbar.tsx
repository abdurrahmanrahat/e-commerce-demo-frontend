import { getAllCategoriesFromDB } from "@/app/actions/categories";
import { TResponseUser } from "@/types";
import { getUserFromCookies } from "@/utils/getUserFromCookies";
import { decodedToken } from "@/utils/jwt";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ActiveLink from "../ActiveLink";
import Container from "../Container";
import MobileNavSheet from "./MobileNavSheet";
import { navItems } from "./navbar.utils";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const categories = await getAllCategoriesFromDB();

  const token = await getUserFromCookies();

  let user;

  if (token) {
    user = decodedToken(token as string);
  }

  const isAdmin = user?.role === "admin";
  // const isUser = user?.role === "user";

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <Container className="">
        <div className="flex h-12 md:h-16 items-center justify-between">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile Drawer (client) */}
            <div className="block lg:hidden">
              <MobileNavSheet
                user={user as TResponseUser | null}
                categories={categories?.data}
              />
            </div>

            <Link
              href="/"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              Brand Name
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {navItems.map((item, index) => (
              <ActiveLink
                href={item.href}
                key={index}
                exact={item.href === "/"}
              >
                <span className="lg:text-[17px] transition-colors duration-300 hover:text-primary">
                  {item.name}
                </span>
              </ActiveLink>
            ))}

            {user && (
              <>
                {isAdmin && (
                  <ActiveLink href="/dashboard/admin">
                    <span className="lg:text-[17px] transition-colors duration-300 hover:text-primary">
                      Dashboard
                    </span>
                  </ActiveLink>
                )}
              </>
            )}
          </div>

          {/* Right: Theme Toggle + Auth */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <SearchInput />
            </div>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" />
              <ShoppingCart className="w-5 h-5" />
            </div>

            {user ? (
              <UserMenu user={user} />
            ) : (
              <Link
                href="/login"
                className="text-primary hover:text-primary/90 font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="md:hidden mb-4">
          <SearchInput />
        </div>
      </Container>
    </nav>
  );
}
