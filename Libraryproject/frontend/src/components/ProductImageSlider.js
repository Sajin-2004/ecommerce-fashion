import React from 'react';
import './ProductImageSlider.css';

const ProductImageSlider = ({ products }) => {
    if (!products || products.length === 0) return null;

    // Extract images, duplicate the array to allow infinite seamless scrolling
    // If the array is too short, we duplicate it a few more times to fill the screen
    const images = products.map(p => p.image).filter(Boolean);
    
    // We want at least enough images to fill the screen twice for a smooth infinite loop
    let displayImages = [...images];
    while (displayImages.length < 20 && displayImages.length > 0) {
        displayImages = [...displayImages, ...images];
    }
    
    // Final duplication for the continuous CSS scroll effect
    const finalImages = [...displayImages, ...displayImages];

    return (
        <div className="slider-container">
            <div className="slider-track">
                {finalImages.map((imgUrl, index) => (
                    <img 
                        key={index} 
                        src={imgUrl} 
                        alt={`Slider display ${index}`} 
                        className="slider-image" 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductImageSlider;
