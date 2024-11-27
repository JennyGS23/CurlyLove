//crea un login con firebase
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
        <div className="flex flex-col items-center justify-center w-2/3  text-white p-8 bg-login">
            <img src={logo} alt="Logo" className="w-40 h-40 mb-4 rounded-full z-10" />
            <h1 className="text-4xl font-bold mb-4 z-10">Curly&Love23</h1>
            <p className='text-2xl z-10'>Cuida tu cabello con tus productos favoritos</p>
        </div>
        <div className="flex items-center justify-center w-1/3 bg-white p-8">
            <div className="bg-white p-8 rounded w-full max-w-md ">
                <h1 className="text-2xl font-bold mb-12 text-left">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-sm font-semibold">
                        Correo
                        <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-6 mt-2"
                    />
                    <label htmlFor="password" className="text-sm font-semibold ">
                        Contraseña
                        <FontAwesomeIcon icon={faLock} className="ml-2" />
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-6 mt-2"
                    />
                    <div className='flex flex-col items-center justify-center'>
                        <button type="submit" className="w-60 bg-primary text-white py-2 rounded hover:bg-[#29B6AB] mt-6">
                            Iniciar Sesión
                        </button>

                        <a href="/register" className="text-sm mt-6 block underline  hover:text-[#25A59A]">
                            ¿No tienes cuenta? Regístrate
                        </a>
                    </div>
                
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;