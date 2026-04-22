import React, { useState, useEffect } from "react";
import Link from "next/link";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const NavBar = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
    };

    fetchData();
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 🔥 prevents hydration error

    const isRTL = i18n.language === "ar"; // true if Arabic

return (
    <div className="navbar">
        <ul className="menu">
            <li>
                <Link href="/">{t("home")}</Link>
            </li>

            {categories.map(cat => (
                <li key={cat._id} className="has-submenu">
                    <span>
                        {isRTL ? cat.name.ar : cat.name.en}
                    </span>

                    {cat.subcategories.length > 0 && (
                        <ul className="submenu">
                            {cat.subcategories.map(sub => (
                                <li key={sub._id}>
                                    <Link href={`/subcategory/${sub._id}`}>
                                        {isRTL ? sub.name.ar : sub.name.en}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                </li>
            ))}

            <li>
                <Link href="/contact">{t("contactus")}</Link>
            </li>
            <li>
                <Link href="/about">{t("aboutus")}</Link>
            </li>
        </ul>
    </div>
);

}

export default NavBar;
