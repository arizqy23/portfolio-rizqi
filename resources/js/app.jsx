import './bootstrap';
import '../css/app.css';

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Layout        from '@components/Layout';
import LoadingScreen from '@components/LoadingScreen';
import CustomCursor  from '@components/CustomCursor';

import Home     from '@pages/Home';
import Projects from '@pages/Projects';
import Skills   from '@pages/Skills';
import Contact  from '@pages/Contact';

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <>
            <LoadingScreen />
            <CustomCursor />
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index           element={<Home />}     />
                        <Route path="projects" element={<Projects />} />
                        <Route path="skills"   element={<Skills />}   />
                        <Route path="contact"  element={<Contact />}  />
                    </Route>
                </Routes>
            </HashRouter>
        </>
    );
}

const root = document.getElementById('app');
if (root) createRoot(root).render(<App />);
