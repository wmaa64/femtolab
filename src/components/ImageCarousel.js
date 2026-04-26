import React, { useState, useEffect } from "react";
import Link from 'next/link'

const ImageCarousel = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];
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
      <Link key={currentIndex} href={currentImage.link} target="_blank">
        <img
          src={currentImage.src}
          alt={`carousel-${currentIndex}`} 
          className="carousel-image active"
          onMouseEnter={()=> setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}
        />
      </Link>

      {/*images.map((image, index) => (
        <Link key={index} href={image.link} target="_blank">
          <img
            src={image.src}
            alt={`carousel-${index}`} 
            loading={index === currentIndex ? "eager" : "lazy"}
            className={`carousel-image ${currentIndex === index ? "active" : ""}`}
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
          />
        </Link>
      ))*/}

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
