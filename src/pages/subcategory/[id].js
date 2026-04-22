import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Product, Info, StarRating } from "../../components";
import { useStateContext } from "../../../context/StateContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import i18n from '../../i18n';

const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());


const SubCategoryProducts = () => {
  const router = useRouter();
  const { id } = router.query; // get subcategory ID from URL

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { decQty, incQty, qty, onAdd, setShowCart, totalQuantities } = useStateContext();

  useEffect(() => {
        setMounted(true);
    }, []);

  useEffect(() => {
    if (!id) return; // Wait until router is ready

    const fetchData = async () => {
      try {
        const res = await  fetch(`/api/products/subcategory/${id}`)

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching subcategory products :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!mounted) return null; // 🔥 prevents hydration error

  const isRTL = i18n.language === "ar"; // true if Arabic

  if (loading) return <p>Loading product details...</p>;
  if (!products) return <p>SubCategory has No Products.</p>;

  return (
    <>
      <NextSeo  title={`${products[0]?.subcategoryId?.name?.en || ""} Subcategory`} 
                description={`${products[0]?.subcategoryId?.description?.ar || ""}`} 
      />
      <div>
        <h2 style={{color: "blue", margin: "10px"}}>Subcategory Products</h2>

        <div className="products-container">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

    </div>
   </>
  );
};

export default SubCategoryProducts;