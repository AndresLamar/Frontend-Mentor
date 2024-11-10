import "./CartModal.css";
import { CloseIcon, DeleteIcon } from "./Icons";
import { useItem } from "../context/ItemContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  const { item, setItem } = useItem();

  const subTotal = (item?.price ?? 0) * (item?.quantity ?? 0)

  const handleClick = () => {
    setItem(null)
  }


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
        {!item ? (
          <p className="modal-text">Your cart is empty.</p>
        ): (
          <div className="cart-item-wrapper">
          <div className="cart-item">
            <img src={item.image.src} alt={item.image.alt} className="cart-item-image"/>
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <div className="cart-item-">
                <p className="cart-item-price">
                  ${item.price} x {item.quantity}{" "}
                  <span className="cart-item-subtotal">${subTotal}</span>
                </p>
              </div>
            </div>
            <button className="delete-button" onClick={handleClick}>
                <DeleteIcon />
            </button>
          </div>
          <button className="checkout-button">Checkout</button>
        </div>
        )}
        
        </div>
      </div>
    </div>
  );
};

export default CartModal;
