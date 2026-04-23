import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import i18n from "../i18n"
import { eARLocale, eUSLocale } from "../../lib/utils"

const  toTitleCase = (str)=> {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const Product = ({ product }) => {
    const seoProductName = product.name.en  + "|"  + product.name.ar ; // Fallback if name is missing
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 🔥 prevents hydration error

    const isRTL = i18n.language === "ar"; // true if Arabic


return (
<>
    <NextSeo
        title={`${toTitleCase(seoProductName)}`}
        description={`${product.description.ar}`}
    />

    <div>
        <Link href={`/product/${product._id}`}>
            <div className="product-card">
                <figure className="fliptile">
                    <img   src={product.image}    width={350}   height={250}  className="product-image"  />
                    <figcaption>
                        <p className="product-name">{isRTL ? product.name.ar : product.name.en}</p>
                    </figcaption>
                </figure>

                <p className="product-name">{isRTL ? product.name.ar : product.name.en}</p>
                <p className="product-price">{isRTL ? 
                    `جنيه مصرى
                    ${eARLocale(product.price)} - ${product.unitId?.name?.ar || "" }` : 
                    `${eUSLocale(product.price)} EGP - ${product.unitId?.name?.en || ""} ` 
                    }  
                </p>
                {/*<p className="product-description">{isRTL ? product.description.ar : product.description.en}</p>*/}
            </div>
        </Link>
    </div>
</>

);
};

export default Product;
