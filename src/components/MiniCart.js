import React, {useState, useEffect} from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
import getStripe from "../../lib/getStripe";
import { eUSLocale } from "../../lib/utils";
import EmptyCart from "./Cart/EmptyCart";
import i18n from "../i18n";

const MiniCart = () => {
    const { totalPrice, totalQuantities, cartItems } = useStateContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 🔥 prevents hydration error

    const isRTL = i18n.language === "ar"; // true if Arabic

    const handleCheckout = async () => {
        const stripe = await getStripe();
        
        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItems),
        });

        if (response.statusCode === 500) return;
        const data = await response.json();
        toast.loading("Redirecting...");
        stripe.redirectToCheckout({
            sessionId: data.id
        });
    };

return (
    <div className="mini-cart-container">
        <span className="heading">
            {isRTL? 
                "سلتك تحتوى على " + totalQuantities + " عنصر"  : 
                "Your Cart contains " + totalQuantities + " item" + ((totalQuantities > 1 || totalQuantities === 0) ? "s" : "")
            }
            
        </span>
        
        {cartItems.length < 1 && (
            <EmptyCart />
                /*<Link href="/shop">
                    <button type="button" className="btn">
                        Go to Shop
                    </button>
                </Link>*/   
        )}

        <div className="product-container">
            {cartItems.length >= 1 &&
                cartItems.map((item) => (
                    <div className="product" key={item._id}>
                        <span>
                            <img src={(item?.image)} className="mini-cart-image" />
                        </span>
                        <span className="item-desc">
                            <span>{isRTL? item.name.ar : item.name.en}</span>
                            <span className="totals">
                                <span>{item.quantity}</span>
                                <span className="multiply">x</span>
                                    <span>
                                        {isRTL? "جنيه مصرى" : "EGP" }
                                        {eUSLocale(item.price)}
                                    </span>
                            </span>
                        </span>
                    </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
            <div className="mini-cart-bottom">
                <div className="total">
                    <h3>
                        {isRTL? "اجمالى: جنيه مصرى" : "Subttoal: EGP"}
                        {eUSLocale(totalPrice)}
                    </h3>
                    {/*
                    <div className="btn-container">
                        <button type="button" className="btn" onClick={handleCheckout}>
                            Pay with Stripe
                        </button>
                    </div>*/}
                </div>
            </div>
        )}
    </div>
);
};

export default MiniCart;
