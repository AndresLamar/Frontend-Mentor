import "./Product.css";
import imageProduct from "../assets/images/image-product-1.jpg";
import { PlusIcon, MinusIcon, CartIcon } from "./Icons";

const Product = () => {
  return (
    <main className="product">
      <img
        src={imageProduct}
        alt="Image one of four of Limited Edition Sneakers"
        width={1000}
        height={1000}
        className="product-image"
      />

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
          <div className="quantity-selector">
            <div className="quantity-field">
              <label htmlFor="quantity-input" aria-hidden="true" hidden>
                Enter Number of items
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity-input"
                className="quantity-input"
                placeholder="0"
                min="0"
              />
            </div>
            <button
                type="button"
                className="quantity-decrease quantity-btn"
                aria-label="Decrease quantity"
            >
                <MinusIcon />
            </button>
            <button
                type="button"
                className="quantity-increase quantity-btn"
                aria-label="Increase quantity"
            >
                <PlusIcon />
            </button>
          </div>
          

          <button type="submit" className="product-submit-btn">
            <CartIcon />
            Add to cart
          </button>
        </form>
      </div>
    </main>
  );
};

export default Product;
