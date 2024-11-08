import './Thumbnail.css'
import { images, imagesThumbnails } from "../assets/images/exportImages";
import { useState } from "react";

const Thumbnail = () => {
  const [imageProduct, setImageProduct] = useState(images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number)  => {
    setImageProduct(images[index])
    setActiveIndex(index);
  }

  return (
    <div className="product-images">
      <div className="product-image-container">
        <button className='open-lightbox'>
            <img
            src={imageProduct.src}
            alt={imageProduct.alt}
            width={1000}
            height={1000}
            className="product-image"
            />
        </button>
      </div>
      
      <div className="product-thumbnails">
        {imagesThumbnails.map((image, index) => (
            <button 
                key={image.src}
                className="thumbnail"
                onClick={() => handleClick(index)}
            >
                <span 
                    className = {`thumbnail-img-wrapper ${index === activeIndex ? "active-img" : ""}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={100}
                  height={100}    
                  className = "product-thumbnail"
                  key={image.src}
                />
                </span>
            </button>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
