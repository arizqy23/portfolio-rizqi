import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden pb-24 md:pb-0">
            <Navbar scrolled={scrolled} />
            <main className="flex-1 overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
