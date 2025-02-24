import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import lightModeIcon from '../../assets/light-mode.svg';
import darkModeIcon from '../../assets/dark-mode.svg';
import Button from '../../components/button/button';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: (isDark: boolean) => void;
}

/**
 * Header component displaying the logo and dark/light mode toggle buttons.
 * @param {boolean} isDarkMode - Indicates whether dark mode is currently active.
 * @param {(isDark: boolean) => void} toggleDarkMode - Function to toggle between light and dark mode.
 */

const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header
      className={`w-full p-4 flex items-center bg-gray-400 dark:bg-gray-600`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => toggleDarkMode(false)}
            variant="default"
            className={`flex items-center rounded-md ${!isDarkMode ? 'opacity-50' : ''}`}
          >
            <img src={lightModeIcon} alt="Light Mode" className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => toggleDarkMode(true)}
            variant="default"
            className={`flex items-center rounded-md ${isDarkMode ? 'opacity-50' : ''}`}
          >
            <img src={darkModeIcon} alt="Dark Mode" className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
