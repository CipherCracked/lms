import { ChartNoAxesColumn, SquareLibrary, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const SidebarContent = () => (
    <div className='space-y-4 mt-20'>
      {/* <Link 
        to="dashboard" 
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          isActive('dashboard') 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <ChartNoAxesColumn size={22}/>
        <h1>Dashboard</h1>
      </Link> */}
      <Link 
        to="course" 
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          isActive('course') 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <SquareLibrary size={22}/>
        <h1>Courses</h1>
      </Link>
    </div>
  );

  return (
    <div className='flex'>
      {/* Desktop Sidebar */}
      <div className='hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-gray-300 dark:border-gray-700 bg-[#f0f0f0] dark:bg-gray-800 p-5 sticky top-0 h-screen'>
        <SidebarContent />
      </div>
      
      {/* Mobile Header with Hamburger */}
      <div className='lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-lg'>Admin Panel</h1>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Admin Panel</SheetTitle>
              </SheetHeader>
              <div className="p-4 bg-[#f0f0f0] dark:bg-gray-800 h-full">
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Main Content */}
      <div className='flex-1 lg:ml-0 bg-white dark:bg-gray-900'>
        <div className='lg:p-24 p-4 pt-20'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar