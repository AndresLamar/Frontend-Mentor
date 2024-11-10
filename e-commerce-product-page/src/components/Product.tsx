import "./Product.css";
import { CartIcon } from "./Icons";
import QuantitySelector from "./QuantitySelector";
import Carousel from "./Carousel";
import { useItem } from "../context/ItemContext";
import { imagesThumbnails } from "../assets/images/exportImages";

const Product = () => {
  const { quantity, setItem, setQuantity } = useItem();

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    setItem({
      image: imagesThumbnails[0],
      price: 125.00,
      title: 'Fall Limited Edition Sneakers',
      quantity: quantity
    })

    setQuantity(0)
  };

  return (
    <main className="product">
      <Carousel />

      <div className="product-info">
        <span className="product-brand">SNEAKER COMPANY</span>
        <h1 className="product-title">Fall Limited Edition Sneakers</h1>

        <p className="product-description">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer.
        </p>

        <div className="product-price">
          <span className="product-current-price">
            $125.00 <span className="product-discount">50%</span>
          </span>
          <span className="product-old-price">$250.00 </span>
        </div>

        <form className="product-form">
          <QuantitySelector />

          <button
            type="submit"
            className="product-submit-btn"
            onClick={(e) => handleClick(e)}
          >
            <CartIcon />
            Add to cart
          </button>
        </form>
      </div>
    </main>
  );
};

export default Product;
