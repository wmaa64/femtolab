import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {Layout} from "../components";
import "../styles/globals.css"; /* common page elements */
import "../styles/index.scss";  /* main styles */
import "../styles/overrides/portable.css"; /* override tablet styles for portrait */
import '../i18n';
import { useTranslation } from "react-i18next";
import { StateContext } from "../../context/StateContext";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    
    document.documentElement.dir = dir;   // ✅ RTL/LTR
    document.documentElement.lang = i18n.language; // ✅ SEO + accessibility

  }, [i18n.language]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", "G-J6GMZBLK8J", {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);


return (
  <>
      {/* ✅ Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J6GMZBLK8J"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J6GMZBLK8J', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

    <DefaultSeo
      {...SEO}
        title="FemtoTrade - Agent for Borosil, Falcon, Corning, Cpc Biotech, Bioendo, PlastiLab"
        description="FemtoTrade - Agent for Borosil, Falcon, Corning, Cpc Biotech, Bioendo, PlastiLab - 
            شركة فيمتوتريد وكيل لشركات عالمية لتوريد مستلزمات المعامل وتجهيزات المعامل"
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      openGraph={{
        type: 'website',
        locale: 'en_EG',
        url: 'https://femtotrade.shop/',
        site_name: 'Pet Suppliers',
    }}
    />
    
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
</>

);
}
export default MyApp;


