"use client";

import Link from "next/link";
import { SidebarItem } from "./Sidebar.helpers";
import { adminSidebarItems, userSidebarItems } from "./sidebar.utils";

const Sidebar = ({ role }: { role: "user" | "admin" }) => {
  return (
    <div className="h-screen fixed border-r border-gray-200 dark:border-gray-700">
      <div className="py-10 mx-3 2xl:mx-4">
        {/* logo section */}
        <div className="flex justify-center items-center">
          <Link href="/">
            {/* <Image src={IMAGES.shared.Logo} alt="Logo" /> */}
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent uppercase">
              Gadgetoria
            </span>
          </Link>
        </div>

        {/* Nav items section */}
        <div className="hidden md:flex flex-col mt-8">
          {role === "user" &&
            userSidebarItems.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}

          {role === "admin" &&
            adminSidebarItems.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
