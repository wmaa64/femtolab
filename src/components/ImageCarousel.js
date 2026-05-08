import React, { useState, useEffect } from "react";
import Link from 'next/link'

const ImageCarousel = ({ images=[] , interval= 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered,setIsHovered] = useState(false);

  const currentImage = images?.[currentIndex];

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images.length]);

  useEffect(() => {
     if (isHovered || images.length < 2) return;

    const timer = setInterval(() => {

      setCurrentIndex((prev) => (prev + 1) % images.length);

    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

   // ✅ safe AFTER hooks
  if (!images.length || !currentImage) return null;

  return (
    <div className="carousel">
      <Link key={currentIndex} href={currentImage.link} target="_blank">
        <img
          src={currentImage.src}
          alt={`carousel-${currentIndex}`} 
          className="carousel-image active"
          onMouseEnter={()=> setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}
        />
      </Link>

      {/* Navigation arrows */}
      <button className="carousel-btn prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel-btn next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;
