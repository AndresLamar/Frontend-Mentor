import "./Carousel.css";
import { Image, images, imagesThumbnails } from "../assets/images/exportImages";
import { useEffect, useState } from "react";
import LightBox from "./LightBox";
import Thumbnail from "./Thumbnail";

const Carousel = () => {
  const [imageProduct, setImageProduct] = useState(images[0]);
  const [activeId, setActiveId] = useState(images[0].id);
  const [imageSelected, setImageSelected] = useState<Image | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verificar si es mobile o desktop
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Si el ancho es <= 768px, es mobile
    };    

    // Ejecutar la función en la carga y cuando se cambia el tamaño de la pantalla
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageClick = () => {
    if (!isMobile) {
      setImageSelected(imageProduct); // Solo abrir LightBox en desktop
    }
  };

  const handleThumbnailClick = (id: string) => {
    const selectedImage = images.find((image) => image.id === id);
    if (selectedImage) {
      setImageProduct(selectedImage);
      setActiveId(id);
    }
  };

  const handleNextImage = () => {
    const totalLength = images.length;
    const currentIndex = images.findIndex((image) => image.id === activeId);
    if (currentIndex + 1 >= totalLength) {
      setActiveId(images[0].id);
      setImageProduct(images[0]);
      setImageSelected(images[0]);
      return;
    }
    setActiveId(images[currentIndex + 1].id);
    setImageSelected(images[currentIndex + 1]);
    setImageProduct(images[currentIndex + 1]);
  };

  const handlePreviousImage = () => {
    const totalLength = images.length;
    const currentIndex = images.findIndex((image) => image.id === activeId);
    if(currentIndex === 0){
      setActiveId(images[totalLength - 1].id);
      setImageProduct(images[totalLength - 1]);
      setImageSelected(images[totalLength - 1]);
      return;
    }

    setActiveId(images[currentIndex - 1].id);
    setImageSelected(images[currentIndex - 1]);
    setImageProduct(images[currentIndex - 1])
  }

  return (
    <div className="product-images">
      <div className="product-image-container">
        {isMobile ? (
          <div className="mobile-carousel">
            <LightBox
              imageSelected={imageProduct}
              handleNextImage={handleNextImage}
              handlePreviousImage={handlePreviousImage}
              setImageSelected={setImageSelected}
            />
          </div>
        ) : (
          <>
            <button className="open-lightbox" onClick={handleImageClick}>
              <img
                src={imageProduct.src}
                alt={imageProduct.alt}
                width={1000}
                height={1000}
                className="product-image"
              />
            </button>

            {imageSelected && (
              <LightBox
                imageSelected={imageSelected}
                handleNextImage={handleNextImage}
                handlePreviousImage={handlePreviousImage}
                setImageSelected={setImageSelected}
              />
            )}
        </>
        )}
      </div>
      <div className="product-thumbnails">
        {imagesThumbnails.map((thumbnail) => (
          <Thumbnail key={thumbnail.alt} thumbnail={thumbnail} handleThumbnailClick={handleThumbnailClick} activeId={activeId} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
