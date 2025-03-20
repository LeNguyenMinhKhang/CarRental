"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSidebarStore from "@/store/sidebarStore";

import {
  User,
  Car,
  CircleAlert,
  LockKeyhole,
  Bell,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 bg-white shadow-lg ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:bg-transparent md:shadow-none`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Menu điều hướng */}
        <nav className="space-y-4 flex-grow">
          <Button
            variant="ghost"
            className="w-full justify-start text-black hover:bg-gray-200"
            onClick={() => handleNavigation("/user-profile")}
          >
            <User className="mr-4" /> Thông tin cá nhân
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-black hover:bg-gray-200"
            onClick={() => handleNavigation("/Rented-cars")}
          >
            <Car className="mr-4" /> Xe đang thuê
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-black hover:bg-gray-200"
            onClick={() => handleNavigation("/Overdue")}
          >
            <CircleAlert className="mr-4" /> Xe thuê quá hạn trả
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-black hover:bg-gray-200"
            onClick={() => handleNavigation("/Change-password")}
          >
            <LockKeyhole className="mr-4" /> Đổi mật khẩu
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-black hover:bg-gray-200"
            onClick={() => handleNavigation("/Notification")}
          >
            <Bell className="mr-4" /> Thông báo
          </Button>
        </nav>

        {/* Footer - Đăng xuất */}
        <div className="mb-16">
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground space-y-1">
            <Button variant="ghost" className="cursor-pointer -ml-4 text-black hover:bg-gray-200">
              <LogOut />{" "}
              <span className="ml-2 font-bold text-md">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
