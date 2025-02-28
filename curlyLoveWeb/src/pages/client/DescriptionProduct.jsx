import React, { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { db } from '../../firebase/Firebase';
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';

const DescriptionProduct = () => {
    const [product, setProduct] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productName = queryParams.get('product');

    useEffect(() => {
        const fetchProduct = async () => {
            const productRef = doc(db, "products", productName);
            const productSnap = await getDoc(productRef);
            if (productSnap.exists()) {
                setProduct(productSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        if (productName) {
            fetchProduct();
        }
    }, [productName]);

    return (
        <div>
            <Navbar />
            <div className='flex-col mt-36 items-center justify-center min-h-screen '>
                {product ? (
                    <div className='w-3/4 p-10 '>
                        <div className='flex justify-between' >
                            <div className='flex-col'>
                                <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-full ml-2" />
                                <h1 className="text-2xl font-bold mt-3">{product.name}</h1>
                                <p className="mt-2">Precio: {product.cost}</p>
                            </div>
                            <div className='flex-col place-items-end'>
                               {/* contador de productos */}
                                <div className='flex items-center justify-center'>
                                    <p>Cantidad deseada: </p>
                                    <p className='mx-4'>0</p>
                                    <button className='ml-5 bg-gray-200 p-2 rounded-full'>-</button>
                                    <button className='ml-5 bg-gray-200 p-2 rounded-full'>+</button>
                                </div>
                                <button className='bg-primary text-white p-2 rounded-lg mt-28'>Agregar al carrito</button>

                            </div>
                        </div>
                        <div className='border rounded-lg p-4 mt-8 '>
                            <h2 className="text-xl font-bold">Descripción</h2>
                            <p className="mt-4">{product.description}</p>
                        </div>
                        
                        
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
                <div className='w-1/4'>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DescriptionProduct;