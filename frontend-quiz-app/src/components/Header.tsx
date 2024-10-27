import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    
    useEffect(() => {
        document.body.dataset.theme = theme === 'dark' ? 'dark' : 'light';
    }, [theme]);

    return(
        <header>
            <button onClick={toggleTheme}>
                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </button>
        </header>
    )
}

export default Header;