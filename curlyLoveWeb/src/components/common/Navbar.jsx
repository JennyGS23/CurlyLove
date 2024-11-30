// Navbar Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    
    const handleLogout = () => {
        navigate('/login');
    };
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-primary  shadow-md">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-16 h-13 ml-6 mr-4 rounded-xl" />
            </div>
            <div className="flex items-center">
                <button onClick={() => navigate('/cart')} className="py-2 px-3 rounded transform transition-transform duration-200 hover:scale-110">
                    <FontAwesomeIcon icon={faShoppingCart} className='text-white w-9 h-6'/>
                </button>
                <button onClick={toggleMenu} className="py-2 px-3 mr-2 rounded transform transition-transform duration-200 hover:scale-110">
                    <FontAwesomeIcon icon={faBars} className='text-white w-9 h-6' />
                </button>
                {menuOpen && (
                    <div className="absolute right-8 top-16 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                        <button onClick={() => navigate('/profile')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                            <FontAwesomeIcon icon={faUser} className='mr-2' /> Perfil
                        </button>
                        <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                            <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' /> Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;