import React from "react";
import Head from "next/head";
import Header from "../components/Header"
import NavBar  from "./NavBar";

import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
return (
<>
    <Head>

        {/* الأساسيات */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="tqcJSg0KbHZK02Lz0iDjXxRl7i0WtBvMnHL4DM3aRBk" />
        {/* SEO */}
        <link rel="canonical" href="https://femtolab.netlify.app/" />
        <title>FemtoTrade - Agent for Borosil, Falcon, Corning, Cpc Biotech, Bioendo, PlastiLab</title>

        <meta
            name="description"
            content="FemtoTrade - Agent for Borosil, Falcon, Corning, Cpc Biotech, Bioendo, PlastiLab - 
            شركة فيمتوتريد وكيل لشركات عالمية لتوريد مستلزمات المعامل وتجهيزات المعامل"
        />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/labicon180.png" />
        <link rel="icon" sizes="32x32" href="/favicon/labicon32.png" />
        <link rel="icon" sizes="16x16" href="/favicon/labicon16.png" />

        {/* Open Graph (الصورة اللي بتظهر في Google / السوشيال) */}
        <meta property="og:title" content="FemtoTrade - Agent for Borosil, Falcon, Corning, Cpc Biotech, Bioendo, PlastiLab " />
        <meta
            property="og:description"
            content="Femto trade is an Egyptian Company Agent For Many Foreign Laboratory Specified Companies
            شركة فيمتوتريد وكيل لشركات عالمية لتوريد مستلزمات المعامل وتجهيزات المعامل"
        />
        <meta property="og:image" content="https://femtotrade.shop/seo-image.jpeg" />
        <meta property="og:url" content="https://femtolab.netlify.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter (اختياري بس مهم) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://femtolab.netlify.app/seo-image.jpeg" />

        {/* ألوان */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#da532c" />

        {/* ملفات */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/labicon32.png" color="#5bbad5" />
    </Head>

    <header>
        {/*<div className="top-bar" >
            <Header />
            <NavBar />
        </div>*/}
        <Header />
        <NavBar />
    </header>

    <div className="layout">
        <main className="main-container">
            {children}
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</>
);
};

export default Layout;