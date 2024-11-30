import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/Firebase';
import { Link, useNavigate } from 'react-router-dom';

import { setDoc, doc } from "firebase/firestore";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePhotoChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !lastName || !email || !password || !address || !phoneNumber) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('El correo no es válido.');
            return;
        }

        if (!/^[0-9]{4}[\s][0-9]{4}$/.test(phoneNumber)) {
            setError('El número de teléfono no es válido. Debe tener el formato #### ####.');
            return;
        }

        try {
            const resp = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                uid: resp.user.uid,
                name,
                lastName,
                email,
                address,
                phoneNumber,
                role: 'client',
            };

            await setDoc(doc(db, 'users', resp.user.uid), user);

            navigate('/login');

    
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-login py-8">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center mb-8 text-black">Registro</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="text-sm font-semibold">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-5 mt-2"
                    />
                    <label htmlFor="lastName" className="text-sm font-semibold">
                        Apellido
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Tu apellido"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-5 mt-2"
                    />

                    <label htmlFor="email" className="text-sm font-semibold">
                        Correo
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@dominio.com"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-5 mt-2"
                    />
                    <label htmlFor="password" className="text-sm font-semibold">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-5 mt-2"
                    />
                    <label htmlFor="address" className="text-sm font-semibold">
                        Dirección Exacta
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Dirección Exacta"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-5 mt-2"
                    />
                    <label htmlFor="phoneNumber" className="text-sm font-semibold">
                        Número de Teléfono
                    </label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="8888 8888"
                        className="w-full px-4 py-2 border rounded bg-boneWhite mb-5 mt-2"
                    />
                    <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded mt-4">
                        Registrarse
                    </button>

                    <Link to="/login" className="text-sm text-black text-center mt-6 block underline hover:text-[#25A59A]">
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                </form>
            </div>
        </div>

    );
};

export default Register;