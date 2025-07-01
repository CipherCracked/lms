import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '@/DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {user}=useSelector(store=>store.auth);
    console.log(user);
    const [logoutUser, {data,isSuccess}]=useLogoutUserMutation();
    const navigate=useNavigate();
    const logoutHandler = async () =>{
        await logoutUser();
    }
    useEffect(() => {
        if (isSuccess){
            toast.success(data.message||"User Logged Out");
            navigate("/login");
        }
    }, [isSuccess])
    
    return (
        <div className='h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* Desktop  */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className='flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/')}>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>LMS Platform</h1>
                </div>
                {/* User icons and dark mode */}
                <div className='flex items-center gap-8 mx-2'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={user?.photoURL||"https://github.com/shadcn.png"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link to="my-learning">
                                            My Learning
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to="profile">
                                            Edit Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={logoutHandler}>
                                            Log Out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    {
                                    user.role==="instructor"
                                    ?
                                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                                        Dashboard
                                    </DropdownMenuItem>
                                    :
                                    <></>
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>

                        ) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline" onClick={()=>navigate("/login")}>Login</Button>
                                <Button onClick={()=>navigate("/login")}>Sign Up</Button>

                            </div>
                        )
                    }
                    {/* <DarkMode /> */}
                </div>
            </div>
            {/* Mobile */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-2xl">LMS Platform</h1>
                <MobileNavBar/>
            </div>
        </div>
    )
}

export default Navbar

const MobileNavBar = () => {
    const {user} = useSelector(store=>store.auth);
    const [logoutUser, {data,isSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();
    
    const logoutHandler = async () => {
        await logoutUser();
    }
    
    useEffect(() => {
        if (isSuccess){
            toast.success(data.message||"User Logged Out");
            navigate("/login");
        }
    }, [isSuccess])
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className='rounded-full bg-gray-200 hover:bg-gray-200'variant="outline">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <SheetHeader className='flex flex-row items-center justify-between mt-2'>
                    <SheetTitle>LMS Platform</SheetTitle>
                    {/* <DarkMode/> */}
                </SheetHeader>
                <Separator className='mr-2'/>
                {user ? (
                    <>
                        <nav className='flex flex-col space-y-4 flex-1'>
                            <SheetClose asChild>
                                <Button 
                                    variant="ghost" 
                                    className="justify-start"
                                    onClick={() => navigate('/my-learning')}
                                >
                                    My Learning
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button 
                                    variant="ghost" 
                                    className="justify-start"
                                    onClick={() => navigate('/profile')}
                                >
                                    Edit Profile
                                </Button>
                            </SheetClose>
                            <Button 
                                variant="ghost" 
                                className="justify-start text-red-600 hover:text-red-700"
                                onClick={logoutHandler}
                            >
                                Log Out
                            </Button>
                        </nav>
                        {user.role === 'instructor' && (
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button onClick={() => navigate('/admin')}>
                                        Dashboard
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        )}
                    </>
                ) : (
                    <div className='flex flex-col space-y-4 flex-1'>
                        <SheetClose asChild>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button onClick={() => navigate("/login")}>
                                Sign Up
                            </Button>
                        </SheetClose>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}