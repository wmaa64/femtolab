import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping,} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../../context/StateContext";
import { eUSLocale } from "../../lib/utils";
import EmptyCart from "./Cart/EmptyCart";
import toast from "react-hot-toast";
import i18n from "../i18n"

const normalizeNumber = (value) => {
    return value
        .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)) // Arabic
};

const Cart = () => {
    const cartRef = useRef();
    const {totalPrice,totalQuantities,cartItems,setShowCart,
        setCartItems,setTotalPrice, setTotalQuantities, onRemove,} = useStateContext();

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");              
    const [email, setEmail] = useState("");
    
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);    
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const cleanMobile = normalizeNumber(mobile).replace(/\s/g, '');

        const nameValid = name.trim().length > 0;
        const addressValid = address.trim().length > 0;
        const mobileValid = /^\d{11}$/.test(cleanMobile);

        setIsValid(nameValid && addressValid && mobileValid);
    }, [name, mobile, address]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 🔥 prevents hydration error

    const isRTL = i18n.language === "ar"; // true if Arabic


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleMobileChange = (e) => {
        const normalized = normalizeNumber(e.target.value);
        setMobile(normalized);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCheckout = async () => {
        if (!isValid) {
            toast.error("Please enter a valid email and phone number.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: cartItems,
                email,
                mobile,
                name,
                address,
            }),
            });

            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.message || "Failed to save order");
            }


            // ✅ Save order ID to state
            alert(response.ok ? `Your Order ${data._id.toString()} is saved successfully! Please Remember it`
                        : "Failed to save order");
            //toast.success(`Your Order ${data._id.toString()} is saved successfully!`);

            // Clear cart and run animation
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantities(0);

        } catch (err) {
            console.error(err);
            toast.error("Failed to save order");
        } finally {
            setLoading(false);
        }
    };


return (
    <div className="cart-wrapper" ref={cartRef}>
        <div className="cart-container">
            <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
                <AiOutlineLeft />
                <span className="heading">{isRTL? "سلتك تحتوى على" : "Your Cart"}</span>
                <span className="cart-num-items">{isRTL? "(" + totalQuantities + ")" + "عنصر"  : 
                                                    "contains (" + totalQuantities + ")" + "items" }</span>
            </button>

            {cartItems.length < 1 && (
                <EmptyCart>
                    <Link href="/" className="btn-container">
                        <button type="button" onClick={() => setShowCart(false)} className="btn">
                            {isRTL? "استمر بالتبضع" :  "Continue Shopping" }
                        </button>
                    </Link>
                </EmptyCart>
            )}

            <div className="product-container">
                {cartItems.length >= 1 && cartItems.map((item) => (
                    <>
                        <div className="product" key={item._id}>
                            <button type="button"  className="remove-item" onClick={() => onRemove(item)}        >
                                <TiDeleteOutline />
                            </button>

                            <Image  src={(item?.image)} alt={item?.name?.en || item?.name} className="cart-product-image"  width={100} height={100} />
                            
                            <div className="item-desc">
                                <div>
                                    {/* 🧠 Show combo readable name if exists */}
                                    <span style={{ fontWeight: "600", display: "block" }}>
                                        {isRTL? (item.name?.ar): (item.name?.en || item.name || item.displayName) }
                                    </span>

                                    <span style={{ display: "block", marginTop: "8px" }}>
                                        {item.quantity} @ {item.price} EGP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            {cartItems.length >= 1 && (
                <div className="cart-bottom">
                    <div className="customer-info">
                        <label style={{color: "black"}}>{isRTL? "ادخل الاسم:" : "Enter Name:"}</label>
                        <input  className="input-field" type="text"  placeholder="Enter your name" value={name}   required
                            onChange={handleNameChange} 
                        />
                    </div>
                    <div className="customer-info">
                        <label style={{color: "black"}}>{isRTL? "ادخل رقم الموبايل (11 رقم):" : "Enter Phone Number (11 digits):" } </label>
                        <input type="tel"  inputMode="numeric"  className="input-field"  placeholder="01XXXXXXXXX"
                            value={mobile}    onChange={handleMobileChange}
                        />
                    </div>
                    <div className="customer-info">    
                        <label style={{color: "black"}}>{isRTL? "ادخل العنوان:" : "Enter Address:"}</label>
                        <input  className="input-field" type="text"    placeholder="Enter your address"  value={address}  required
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="customer-info">
                        <label style={{color: "black"}}>{isRTL? "ادخل ايميل (اختيارى):" : "Enter Valid Email:"} </label>
                        <input  className="input-field" type="email"  placeholder="Enter your email"   value={email}   
                            onChange={handleEmailChange} 
                        />
                    </div>
                    
                    <div className="total">
                        <h3>{isRTL? "اجمالى شامل 50 جنيه للشحن: " : "Subtotal including 50 EGP for Shipping:"}</h3>
                        <h3>{eUSLocale(totalPrice + 50)} {isRTL? "جنيه" : "EGP" }</h3>
                    </div>
                    
                    <div className="btn-container">
                        <button type="button" className="btn" onClick={handleCheckout} disabled={!isValid || loading} 
                            style={{
                            opacity: !isValid || loading ? 0.5 : 1,
                            cursor: !isValid || loading ? "not-allowed" : "pointer",
                            }}>{isRTL? (loading? "يعمل..." : "اطلب الآن") : (loading ? "Processing..." : "Place Order") }
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
);
};

export default Cart;