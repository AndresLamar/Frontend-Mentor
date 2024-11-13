import './Header.css'
import { Logo, CartIcon } from './Icons'
import avatarImage from '../assets/images/image-avatar.png';
import Navbar from './Navbar'
import { useState } from 'react';
import CartModal from './CartModal';
import { useItem } from '../context/ItemContext';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const { item } = useItem()

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <header>
            <div className="left-header">
                <div className="logo">
                    <Logo/>
                </div>
                <div className="navbar">
                    <Navbar/>
                </div>
            </div>

            <div className='right-header'>
                <button className='cart-open-button' onClick={openModal}>
                    <span className={`cart-item-quantity ${ item?.quantity ? "show" : ""}`}>
                        {item?.quantity}
                    </span>
                    <CartIcon />
                </button>

                <CartModal isOpen={isModalOpen} onClose={closeModal} />

                <img src={avatarImage} alt="Avatar" width={100} height={100} className='avatar-image'/>
            </div>
        </header>
    )
}

export default Header