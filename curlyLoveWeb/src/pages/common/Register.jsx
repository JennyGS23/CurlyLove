import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-login">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-8 text-black text-left">Registro</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-sm font-semibold">
                        Correo
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@dominio.com"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-6 mt-2"
                    />
                    <label htmlFor="password" className="text-sm font-semibold">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-6 mt-2"
                    />
                    <label htmlFor="confirmPassword" className="text-sm font-semibold">
                        Corfirmar Contraseña
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="********"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-6 mt-2"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <button type="submit" className="w-60 bg-primary text-white py-2 rounded hover:bg-[#29B6AB] mt-6">
                            Registrar
                        </button>
                        <Link to="/login" className="text-sm mt-6 block underline hover:text-[#25A59A]">
                            ¿Ya tienes cuenta? Inicia Sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Register;