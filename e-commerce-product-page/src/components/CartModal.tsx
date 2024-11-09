import "./CartModal.css";
import { CloseIcon, DeleteIcon } from "./Icons";
import { imagesThumbnails } from "../assets/images/exportImages";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Cart</h2>
          <button className="modal-close-button" onClick={onClose}>
            <CloseIcon fill="#0000" />
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-text">Your cart is empty.</p>

        {/* <div className="cart-item-wrapper">
          <div className="cart-item">
            <img src={imagesThumbnails[0].src} alt="product" className="cart-item-image"/>
            <div className="cart-item-details">
              <h3 className="cart-item-title">Fall Limited Edition Sneakers</h3>
              <div className="cart-item-">
                <p className="cart-item-price">
                  $125.00 x 1{" "}
                  <span className="cart-item-subtotal">$125.00</span>
                </p>
              </div>
            </div>
            <button className="delete-button">
                <DeleteIcon />
            </button>
          </div>
          <button className="checkout-button">Checkout</button>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
