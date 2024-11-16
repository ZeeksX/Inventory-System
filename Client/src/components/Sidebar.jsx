import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/inventory-logo.svg";
import ManagerSidebar from './sidebars/ManagerSidebar';
import SalesSidebar from './sidebars/SalesSidebar';
import SidebarItems from './SidebarItems';

// Role-Based Access Control (Optional)
const SidebarWithRoleControl = () => {
    const { user } = useAuth();

    const renderSidebarBasedOnRole = () => {
        switch (user.role) {
            case 'Admin':
                return <Sidebar />;
            case 'Sales Staff':
                return <SalesSidebar />;
            case 'Manager':
                return <ManagerSidebar />;
        }
    };

    return renderSidebarBasedOnRole();
};

const Sidebar = () => {
    return (
        <div className="fixed flex-col w-64 min-h-screen bg-white items-center hidden sm:flex">
            <div className="flex flex-row w-full justify-center items-center mt-8">
                <img src={Logo} alt="header-logo" className="w-1/4" />
                <h3 className="text-[black]  items-center font-bold text-2xl">InventoryHUB</h3>
            </div>
            <SidebarItems/>
        </div>
    );
}

export default Sidebar;