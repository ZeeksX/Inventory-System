import React from 'react';
import { useAuth } from './Auth'; // Import the useAuth hook
import SalesSidebar from './sidebars/SalesSidebar'; // Import your SalesSidebar component
import ManagerSidebar from './sidebars/ManagerSidebar'; 
import DefaultSidebar from './Sidebar'; 

const SidebarWithRoleControl = () => {
    const { user } = useAuth();

    const renderSidebarBasedOnRole = () => {
        switch(user.role) {
            case 'Admin':
                return <DefaultSidebar />;
            case 'staff':
                return <SalesSidebar />;
            case 'Manager':
                return <ManagerSidebar />;
        }
    };

    return renderSidebarBasedOnRole();
};

export default SidebarWithRoleControl;

