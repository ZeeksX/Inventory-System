import React, { useEffect, useState } from 'react';
import SidebarWithRoleControl from '../components/SidebarWithRoleControl';
import Container from '../components/Container';
import { AuthProvider } from '../components/Auth';
import TopNav from '../components/topnav/TopNav';

const HomePage = ({ sidebarOpen, toggleSidebar }) => {
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        setScrolling(window.scrollY > 0);
    };
   
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
   

    return (
    <AuthProvider>
        <div className="home-page flex sm:flex-row flex-col w-full min-h-screen">
            {/* Sidebar for larger screens */}
            <div className="hidden sm:flex w-64">
                <SidebarWithRoleControl />
            </div>

            {/* Top navbar for small screens */}
            <TopNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main content container */}
            {!sidebarOpen && (
                <div className={`flex-1 w-full ${scrolling ? 'pt-14' : ''} transition-padding duration-100`}>
                    <Container />
                </div>
            )}
        </div>
        </AuthProvider>
    );
};

export default HomePage;