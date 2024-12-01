import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/logo.png'; 

const Footer = () => {
    return (
        <footer className="bg-login text-white p-4 text-center">
            <div className="flex border-b-2 pb-4 justify-between">
                <img src={logo} alt="Logo" className="w-16 h-13 ml-6 mr-4 rounded-xl" />
                <div className='flex items-end'>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="mr-4">
                        <FontAwesomeIcon icon={faInstagram} className="w-11 h-8" />
                    </a>
                    <a href="https://www.whatsapp.com" target="_blank" rel="noreferrer" className="mr-4">
                        <FontAwesomeIcon icon={faWhatsapp} className="w-11 h-8" />
                    </a>
                </div>
                
            </div>

            <div className='flex justify-between mt-4'>
                <a> {/*redirect to page about CurlyLove*/}
                    <p className="underline mt-4 ml-6 hover:scale-105 cursor-pointer">Acerca de Curly&Love23</p>
                </a>
                <p className="mt-4 mr-6">Desarrollado por <a href="https://www.linkedin.com/in/jennifer-gonzalez-263b66265/" className="text-white underline">JenniferGonzalez</a></p>
            </div>
            
        </footer>
    );
}

export default Footer;