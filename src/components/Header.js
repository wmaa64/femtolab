// Header.js
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import Link from 'next/link';
import { useStateContext } from "../../context/StateContext";
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiOutlineWhatsApp, AiOutlineShopping } from "react-icons/ai";
import i18n from "../i18n";
import Image from 'next/image';
import { Cart } from "./";

const Header = () => {
  const { t } = useTranslation();
  const { showCart, setShowCart, totalQuantities, userInfo, setUserInfo, logoutUser } = useStateContext();
  const language = i18n.language;
  const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
      // Load userInfo from localStorage if available
      const storedUserInfo = localStorage.getItem('userInfo');
      storedUserInfo ? setUserInfo(JSON.parse(storedUserInfo)) : setUserInfo(null);
    }, []);

  if (!mounted) return null; // 🔥 prevents hydration error
  
  const isRTL = i18n.language === "ar"; // true if Arabic

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(next);
    
    // optional: save preference
    localStorage.setItem('lang', next);
  };

  return (
    <div className='headerContainerStyle' dir={isRTL ? "rtl" : "ltr"} >
      {/* Left: language toggle */}
      <div className='leftStyle'>
        <button className="langButtonStyle"
          type="button"
          onClick={toggleLanguage}
          aria-label="Toggle language"
          title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        >
          {language === 'en' ? (
            <div  className='flagwrapper'>
              <Flag code="EG" className='flag' />
              <span >AR</span>
            </div>
          ) : (
            <div className='flagwrapper'>
              <Flag code="US" className='flag' />
              <span >EN</span>
            </div>
          )}
        </button>
      </div>

      {/* Center: logo */}
      <div className='logoimageWrapper'>
          <Image className='logoimage'
            src="/images/femtotradelogo.jpg"
            alt="FemtoTrade Logo"
            fill
          />
      </div>

      <div  className='sign-wrapper'>
          {userInfo ? (
              <button onClick={logoutUser} >
                  Logout
              </button>
          ) : (
              <>
                  <Link href="/users/login">
                      <button >{t("login")}</button>
                  </Link>
                  <span>/</span>
                  <Link href="/users/register">
                      <button >{t("register")}</button>
                  </Link>
              </>
          )}

          <button  type="button"   className="cart-icon"  onClick={() => setShowCart(true)}>
              <AiOutlineShopping size={28} />
              <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          {showCart && <Cart />}
      </div>

      {/* Right: user welcome */}
      <div className='rightStyle'>   
        {/* Telephone icon + number */}
        <div>
          <span className="phone-icon">{t("orderByPhone")}: 📞</span>
          <a href="tel:+2 01005126629" className="phone-number" >{t("phonenumber")} </a><br/>
          <span className="phone-icon">{t("orderByPhone")}: 📞</span>
          <a href="tel:+2 01110124373" className='phone-number' >{t("phonenumber2")}</a><br/>
          <span className="phone-icon">{t("emailto")}: </span>
          {/*<MdEmail size={20} color="#d5272e" />*/}
          <a href="mailto:info@femtolab.shop?subject=Inquiry&body=Hello" className="phone-number" >
            📧 info@femtolab.shop
          </a><br/>
          
          {userInfo ? (
            <div style={{ fontSize: 16 }}>
              <span style={{ marginRight: 8 }}>{t("welcome")}</span>
              <strong>{(userInfo.name).substring(0, (userInfo.name).indexOf(' '))}</strong>
            </div>
            ) : (
            /* you can replace with login/signup links/buttons if needed */
            <div style={{ fontSize: 14, opacity: 0.9 }}>{t("guest")}</div>
          )}

          <div >
              <a href="https://www.instagram.com/femtolab" target="_blank" rel="noopener noreferrer">
                  <AiFillInstagram   size={30} color="#E1306C" /> {/* Instagram */}
              </a>
              <a href="https://twitter.com/femtolab" target="_blank" rel="noopener noreferrer">
                  <AiOutlineTwitter  size={30} color="#1DA1F2" /> {/* Twitter */}
              </a>
              <a href="https://facebook.com/share/femtolab" target="_blank" rel="noopener noreferrer">
                  <AiFillFacebook    size={30} color="#1877F2" /> {/* Facebook */}
              </a>
              <a href="https://wa.me/201005126629?text=I%20just%20placed%20an%20order" target="_blank" rel="noopener noreferrer">
                  <AiOutlineWhatsApp size={30} color="#25D366" /> {/* WhatsApp */}
              </a>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Header;
