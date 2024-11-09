import { Image } from "../assets/images/exportImages";
import CarouselNavButton from "./CarouselNavButton";
import {CloseIcon } from "./Icons";
import "./LightBox.css";

interface Props {
  imageSelected: Image;
  handleNextImage: () => void;
  handlePreviousImage: () => void;
  setImageSelected: React.Dispatch<React.SetStateAction<Image | null>>;
}

const LightBox = ({
  imageSelected,
  handleNextImage,
  handlePreviousImage,
  setImageSelected,
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e.target)
    if ((e.target as Element).classList.contains("dismiss")) {
      setImageSelected(null);
    }
  };

  return (
    <div className="overlay dismiss" onClick={handleClick}>
      <div className="wrapper">

        <CarouselNavButton direction='previous' hideOnDesktop={true} handleClick={handlePreviousImage} />

        <img
          src={imageSelected.src}
          alt={imageSelected.alt}
          width={1000}
          height={1000}
          className="lightbox-image"
        />

        <CarouselNavButton direction='next' hideOnDesktop={true} handleClick={handleNextImage} />
      </div>

      <button className="dismiss close" onClick={handleClick}>
          <CloseIcon />
        </button>
    </div>
  );
};

export default LightBox;
