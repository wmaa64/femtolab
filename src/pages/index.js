import React, {useState, useEffect} from "react";
import { NextSeo } from "next-seo";
import ImageCarousel from '../components/ImageCarousel';
import Product from '../components/Product';
import i18n from '../i18n';
//import productsData from "../../data/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: ""
  });

  const images = [
    {
      src: '/images/borosil.jpg',
      link: 'https://www.borosil.com/'
    },
    {
      src: '/images/falcon.jpg',
      link: 'https://www.scientificlabs.ie/brand/FALCON'
    },
    {
      src: '/images/corning.jpg',
      link: 'https://www.corning.com/worldwide/en/products/life-sciences/resources/brands/falcon-brand-products.html'
    },
    {
      src: '/images/cpc.jpg',
      link: 'https://www.cpcbiotech.it/en/'
    },
    {
      src: '/images/isolab.jpg',
      link: 'https://isolab.de/'
    },
    {
      src: '/images/bioendo.jpg',
      link: 'https://www.bioendo.com/'
    },
    {
      src: '/images/sdfine.jpg',
      link: 'https://sdfine.com/'
    }
  ]

  // ✅ Fetch data client-side from API route
  useEffect(() => {
  
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers");
        if (!res.ok) {
          throw new Error("Failed to fetch offers");
        }
        const data = await res.json();
        
        setAllOffers(data);

      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  
  }, []); // refetch if offers count changes


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
  
  const offers = allOffers.slice(0, 12).map(offer => ({
    src: `/images/offers/${offer.src}`,
    link: offer.link || '#'
  }));

  const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value,
  });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const res = await fetch("/api/send-order", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              ...formData,
          }),
      });

      const data = await res.json();

      setLoading(false);
      setSuccess(data.message);
  };
  

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

  <div className="order-message" dir={isRTL ? "rtl" : "ltr"}>
      <h2>{isRTL ? " اطلب برسالة" : "Order By Message"}</h2>

      <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="name"
              placeholder={isRTL ? "الاسم" : "Name"}
              onChange={handleChange}
              required
          />

          <input
              type="email"
              name="email"
              placeholder={isRTL ? "البريد الإلكتروني" : "Email"}
              onChange={handleChange}
              required
          />

          <input
              type="text"
              name="phone"
              placeholder={isRTL ? "رقم الهاتف" : "Phone"}
              onChange={handleChange}
              required
          />

          {/* ORDER MESSAGE */}
          <textarea
            name="message"
            placeholder={isRTL? "اكتب طلبك هنا" : "Write your order here"}
            onChange={handleChange}
            required
            rows="8"
          ></textarea>
          
          <button type="submit" disabled={loading}>
          {loading
              ? isRTL ? "جاري الإرسال..." : "Sending..."
              : isRTL ? "إرسال" : "Submit"}
          </button>
      </form>

      {success && <p>{success}</p>}
  </div>

</>

)
};
/* ADD SERVERSIDE PROPS HERE */

export default Home;