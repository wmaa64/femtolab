import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered,setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // وقف التبديل

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

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`carousel-${index}`} 
          loading={index === currentIndex ? "eager" : "lazy"}
          className={`carousel-image ${currentIndex === index ? "active" : ""}`}
          onMouseEnter={()=> setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}
        />
      ))}

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
