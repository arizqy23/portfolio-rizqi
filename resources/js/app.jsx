import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout        from '@components/Layout';
import LoadingScreen from '@components/LoadingScreen';
import CustomCursor  from '@components/CustomCursor';

import Home     from '@pages/Home';
import Projects from '@pages/Projects';
import Skills   from '@pages/Skills';
import Contact  from '@pages/Contact';

function App() {
    return (
        <>
            <LoadingScreen />
            <CustomCursor />
            <HashRouter>
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
