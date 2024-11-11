import './CarouselNavButton.css'
import { NextIcon, PreviousIcon } from "./Icons";


interface Props{
    direction: "previous" | "next";
    hideOnDesktop: boolean;
    handleClick: () => void;
}

const CarouselNavButton = ({direction, hideOnDesktop, handleClick}: Props) => {
    return(
        <button className={`icon ${direction}-icon  ${hideOnDesktop ? "hide" : ""}`} onClick={handleClick}>
          {direction === "previous" ? <PreviousIcon /> : <NextIcon />}
        </button>
    )
}

export default CarouselNavButton;