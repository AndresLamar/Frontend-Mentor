import './Header.css'
import Cart from './Cart'
import { Logo } from './Icons'
import avatarImage from '../assets/images/image-avatar.png';
import Navbar from './Navbar'

const Header = () => {
    return (
        <header>
            <div className="left-header">
                <Logo/>
                <Navbar/>
            </div>

            <div className='right-header'>
                <Cart />
                <img src={avatarImage} alt="Avatar" width={100} height={100} className='avatar-image'/>
            </div>
        </header>
    )
}

export default Header