import './CartModal.css'
import { CloseIcon } from "./Icons";

interface Props{
    isOpen: boolean;
    onClose: () => void
}


const CartModal = ({ isOpen, onClose }: Props) => {
    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Cart</h2>
                    <button className="modal-close-button" onClick={onClose}>
                        <CloseIcon fill='#0000' />
                    </button>
                </div>
                <div className="modal-body">
                    <p className="modal-text">Your cart is empty.</p>
                </div>      
            </div>
        </div>
    )
    
}

export default CartModal