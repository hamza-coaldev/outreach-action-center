
import React from "react";
import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Lead Engagement</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-1">
              <User className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
