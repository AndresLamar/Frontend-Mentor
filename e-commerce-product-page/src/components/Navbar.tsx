import './Navbar.css'
import { MenuIcon, CloseIcon } from './Icons'

const Navbar = () => {
    return (
        <nav className="nav">
        <span id="nav-label" hidden>Navigation</span>
        <button
          id="btnOpen"
          className="nav-menu-open-button"
          aria-expanded="false"
          aria-labelledby="nav-label"
        >
          <MenuIcon />
        </button>
        <div className="nav-menu" role="dialog" aria-labelledby="nav-label">
          <button
            id="btnClose" 
            className="nav-menu-close-button"
            aria-label="Close"
          >
            <CloseIcon fill=''/>
          </button>
          <ul className="nav-links">
            <li className="link"><a href="#">Collection</a></li>
            <li className="link"><a href="#">Men</a></li>
            <li className="link"><a href="#">Women</a></li>
            <li className="link"><a href="#">About</a></li>
            <li className="link"><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar