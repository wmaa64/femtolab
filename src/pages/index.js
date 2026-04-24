import React, {useState, useEffect} from "react";
import { NextSeo } from "next-seo";
import ImageCarousel from '../components/ImageCarousel';
import Product from '../components/Product';
import i18n from '../i18n';
//import productsData from "../../data/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
    '/images/image7.jpg',
  ];

    const offers = [
    '/images/offers/image1.jpeg',
    '/images/offers/image2.jpeg',
    '/images/offers/image3.jpeg',
    '/images/offers/image4.jpeg',
    '/images/offers/image5.jpeg',
    '/images/offers/image6.jpeg',
    '/images/offers/image7.jpeg',
    '/images/offers/image8.jpeg',
    '/images/offers/image9.jpeg',
    '/images/offers/image10.jpeg',
    '/images/offers/image11.jpeg',
  ];

  // ✅ Fetch data client-side from API route
  useEffect(() => {
  
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/featured");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null; // 🔥 prevents hydration error

  const isRTL = i18n.language === "ar"; // true if Arabic

return (
<>
  <NextSeo
    title="Femtotrade For Trading in Laboratory Supplies, and Testing Equipments"
    description="Femtotrade For Trading in Laboratory Supplies, and Testing Equipments"
  />

  <div className="section_container" dir={isRTL ? "rtl" : "ltr"}>
    <div className="carousel_box">
        <h2>{isRTL? "شركائنا" : "Our Partners"}</h2>
        <ImageCarousel images={images} interval={5000} />
    </div>
  </div>

  <div className="section_container" dir={isRTL ? "rtl" : "ltr"}>
    <div className="carousel_box">
        <h2>{isRTL? "العروض المميزة" : "Special Offers"}</h2>
        <ImageCarousel images={offers} interval={5000} />
    </div>
  </div>

  <div>
    <div className="products-heading">
        {isRTL ? (
                <h2>المنتجات المميزة </h2>
        ) : (
                <h2>Featured Products</h2>
        )}
    </div>

    { (loading) ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-container">
          {(products.length > 0) ? 
            (products.map((product) => (
              <Product key={product._id} product={product} />
            ))) : (
              <p>No featured products available.</p>
            )
          }
        </div>
        ) 
    }
  </div>
    
</>

)
};
/* ADD SERVERSIDE PROPS HERE */

export default Home;



