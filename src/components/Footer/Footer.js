import React, {useState, useEffect} from "react";
import Link from "next/link";
import PaymentIcons from "../PaymentIcons";
import i18n from "../../i18n";
import MiniCart from "../MiniCart";
import { useStateContext } from "../../../context/StateContext";
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiOutlineWhatsApp } from "react-icons/ai";

const Footer = () => {
    const { showCart } = useStateContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 🔥 prevents hydration error

    const isRTL = i18n.language === "ar"; // true if Arabic

  return (
    <>
        <div className="footerContainer" dir={isRTL ? "rtl" : "ltr"} >
            <div className="footerContent">
                <div>
                    <Link href="/delivery">{isRTL? "التوصيل" : "Delivery"}</Link>
                    <Link href="/privacy">{isRTL? "الخصوصية" : "Privacy"}</Link>
                    <Link href="/terms">{isRTL? "شروط وقواعد البيع" : "Terms and Conditions of Sale"}</Link>
                    <Link href="/contact">{isRTL? "التواصل معنا" : "Contact Us"}</Link>
                </div>
                <div>{isRTL?  "التواصل sales@femtotrade.com: " : "Contact: sales@femtotrade.com"}</div>

                <MiniCart />
            </div>
                
            <div className="iconContainer">
                <PaymentIcons />
                <div className="icons">
                    <a href="https://www.instagram.com/femtotradepets" target="_blank" rel="noopener noreferrer">
                        <AiFillInstagram   size={30} color="#E1306C" /> {/* Instagram */}
                    </a>
                    <a href="https://twitter.com/femtotradepets" target="_blank" rel="noopener noreferrer">
                        <AiOutlineTwitter  size={30} color="#1DA1F2" /> {/* Twitter */}
                    </a>
                    <a href="https://www.facebook.com/share/1Nvayb9uW8" target="_blank" rel="noopener noreferrer">
                        <AiFillFacebook    size={30} color="#1877F2" /> {/* Facebook */}
                    </a>
                    <a href="https://wa.me/+201005126629" target="_blank" rel="noopener noreferrer">
                        <AiOutlineWhatsApp size={30} color="#25D366" /> {/* WhatsApp */}
                    </a>
                </div>
            </div>
        </div>
        <p className="copyright">{isRTL? "2006 جميع الحقوق محفوظة لـ فمتوتريد.شوب " : "2026 Femtotrade.shop All rights reserved"}</p>
    </>
  );
};

export default Footer;
