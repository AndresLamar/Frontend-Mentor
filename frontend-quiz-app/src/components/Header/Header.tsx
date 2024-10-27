import './Header.css'
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import IconSunLight from "../../assets/images/icon-sun-light.svg";
import IconSunDark from "../../assets/images/icon-sun-dark.svg";
import IconMoonLight from "../../assets/images/icon-moon-light.svg";
import IconMoonDark from "../../assets/images/icon-moon-dark.svg";

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    
    useEffect(() => {
        document.body.dataset.theme = theme === 'dark' ? 'dark' : 'light';
    }, [theme]);

    return(
        <header>
            <div className="selected-topic"></div>
            <div className="light-dark-toggle-container">
                <label htmlFor="toggle">
                    <img src={theme === 'light' ? IconSunDark : IconSunLight} alt="light switch toggle" />
                </label>
                <label htmlFor="toggle">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle__input" onClick={toggleTheme} />
                    <span className="toggle__display"></span>
                </label>
                <label htmlFor="toggle">
                    <img src={theme === 'light' ? IconMoonDark : IconMoonLight} alt="dark switch toggle" />
                </label>
            </div>
        </header>
    )
}

export default Header;