import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import { Settings } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const SidebarItems = ({ toggleSidebar }) => { // Accept toggleSidebar as a prop
    const navItems = [
        { name: "Dashboard", icon: <HomeIcon />, link: "/dashboard" },
        { name: "Inventory", icon: <CategoryIcon />, link: "/inventory" },
        { name: "Sales", icon: <TrendingUpIcon />, link: "/sales" },
        { name: "Suppliers", icon: <AirplanemodeActiveIcon />, link: "/supplier" },
        { name: "Service", icon: <ShoppingCartIcon />, link: "/service" },
        { name: "Sales Report", icon: <EmailIcon />, link: "/reports" },
        { name: "User  Management", icon: <ManageAccountsIcon />, link: "/management" }
    ];

    const profileItems = [
        { name: "Profile", icon: <AccountCircleIcon />, link: "/profile" },
        { name: "Settings", icon: <Settings />, link: "/settings" },
        { name: "Logout", icon: <LogoutIcon />, link: "/" },
    ];

    return (
        <>
            <ul className='mt-8 md:mt-2 w-52'>
                {navItems.map((item) => (
                    <li key={item.name} className="flex items-center py-2 px-4 hover:bg-gray-200 rounded-lg">
                        <Link to={item.link} className="flex items-center w-full" onClick={toggleSidebar}> {/* Call toggleSidebar on click */}
                            <span className="mr-2">{item.icon}</span>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="log-out sm:fixed bottom-16 md:bottom-12 ">
                <ul className='mt-8 w-52'>
                    {profileItems.map((item) => (
                        <li key={item.name} className="flex items-start py-2 px-4 hover:bg-gray-200 rounded-lg">
                            <Link to={item.link} className="flex items-center w-full" onClick={toggleSidebar}> {/* Call toggleSidebar on click */}
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SidebarItems;