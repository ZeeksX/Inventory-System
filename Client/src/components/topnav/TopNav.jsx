import React, { useEffect, useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import Logo from "../../assets/inventory-logo.svg";
import SidebarItems from '../SidebarItems';

const TopNav = ({ sidebarOpen, toggleSidebar }) => { // Destructure props correctly
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`bg-white flex sm:hidden flex-col items-center w-full shadow-lg ${sidebarOpen ? 'min-h-screen' : ''} ${scrolling ? 'fixed z-10' : ''}`}>
                <div className='flex flex-col w-full p-4 items-center justify-between '>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center gap-2'>
                            <img src={Logo} alt="Inventory-Logo" className='w-10' />
                            <h1 className="text-xl font-bold">InventoryHUB</h1>
                        </div>
                        <div onClick={toggleSidebar} className="cursor-pointer">
                            {sidebarOpen ? <CloseIcon /> : <DensityMediumIcon />}
                        </div>
                    </div>
                    {sidebarOpen && <SidebarItems toggleSidebar={toggleSidebar} />} {/* Pass toggleSidebar here */}
                </div>
            </div>
        </>
    );
};

export default TopNav;