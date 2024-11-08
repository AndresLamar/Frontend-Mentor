import './Thumbnail.css'
import { images, imagesThumbnails } from "../assets/images/exportImages";
import { useState } from "react";

const Thumbnail = () => {
  const [imageProduct, setImageProduct] = useState(images[0]);
  const [activeId, setActiveId] = useState(images[0].id);

  const handleClick = (id: string)  => {

    const selectedImage = images.find((image) => image.id === id);
    if (selectedImage) {
      setImageProduct(selectedImage);
      setActiveId(id); 
    }
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
        {imagesThumbnails.map((thumbnail) => (
            <button 
                key={thumbnail.src}
                className="thumbnail"
                onClick={() => handleClick(thumbnail.id)}
            >
                <span 
                    className = {`thumbnail-img-wrapper ${thumbnail.id === activeId ? "active-img" : ""}`}>
                <img
                  src={thumbnail.src}
                  alt={thumbnail.alt}
                  width={100}
                  height={100}    
                  className = "product-thumbnail"
                  key={thumbnail.src}
                />
                </span>
            </button>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
