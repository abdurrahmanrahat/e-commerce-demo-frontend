"use client";

import { Button } from "@/components/ui/button";
import { accessAuthKey, refreshAuthKey } from "@/constants/authKey";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/reducers/authSlice";
import { removeUser } from "@/services/auth.services";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ActiveLink from "../ActiveLink";
import Container from "../Container";
import { navItems } from "./navbar.utils";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "user";

  // logout user
  const handleLogout = async () => {
    // 🎯 remove HttpOnly cookie from client via API
    await axios.post("/api/auth/remove-cookies", {
      accessToken: accessAuthKey,
      refreshToken: refreshAuthKey, // send more name for removing
    });
    dispatch(logout());
    removeUser();

    toast.success("Logged out successfully");

    router.push("/");
  };

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className="relative w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-md"
      ref={navRef}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-2">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-gray-900 dark:text-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 transition-all duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-all duration-300" />
              )}
            </button>

            {/* Logo */}
            <Link
              href={`/`}
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              Brand Name
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {navItems.map((item, index) => (
              <ActiveLink
                href={item.href}
                key={index}
                exact={item.href === "/"}
              >
                <span className="lg:text-[17px] transition-colors duration-300 hover:text-primary">
                  {item.label}
                </span>
              </ActiveLink>
            ))}

            {user && (
              <>
                {isAdmin && (
                  <ActiveLink href={`/dashboard/admin`}>
                    <span className="lg:text-[17px] transition-colors duration-300 hover:text-primary">
                      Dashboard
                    </span>
                  </ActiveLink>
                )}
                {isStudent && (
                  <ActiveLink href={`/dashboard/user`}>
                    <span className="lg:text-[17px] transition-colors duration-300 hover:text-primary">
                      Dashboard
                    </span>
                  </ActiveLink>
                )}
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Button className="" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link href={`/login`}>
                <Button className="">Login</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-[64px] left-0 w-full z-[999] bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 backdrop-blur-sm"
            >
              <div className="w-[90%] mx-auto py-4 flex flex-col space-y-4 text-gray-900 dark:text-gray-100">
                {navItems.map((item, index) => (
                  <ActiveLink
                    href={item.href}
                    key={index}
                    exact={item.href === "/"}
                  >
                    <span className="transition-colors duration-300 hover:text-primary">
                      {item.label}
                    </span>
                  </ActiveLink>
                ))}

                {user && (
                  <>
                    {isAdmin && (
                      <ActiveLink href={`/dashboard/admin`}>
                        <span className="transition-colors duration-300 hover:text-primary">
                          Dashboard
                        </span>
                      </ActiveLink>
                    )}
                    {isStudent && (
                      <ActiveLink href={`/dashboard/user`}>
                        <span className="transition-colors duration-300 hover:text-primary">
                          Dashboard
                        </span>
                      </ActiveLink>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
};

export default Navbar;
