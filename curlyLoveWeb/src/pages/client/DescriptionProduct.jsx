import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { db } from '../../firebase/Firebase';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import '../Styles.css';

const DescriptionProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productName = queryParams.get('product');

    useEffect(() => {
        const fetchProduct = async () => {
            const productRef = doc(db, "products", productName);
            const productSnap = await getDoc(productRef);
            if (productSnap.exists()) {
                const productData = productSnap.data();
                setProduct(productData);
                fetchRelatedProducts(productData.category);
            } else {
                console.log("No such document!");
            }
        };

        const fetchRelatedProducts = async (category) => {
            const q = query(collection(db, "products"), where("category", "==", category));
            const querySnapshot = await getDocs(q);
            const relatedProductsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRelatedProducts(relatedProductsList);
        };

        if (productName) {
            fetchProduct();
        }
    }, [productName]);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleProductClick = (product) => {
        navigate(`/description?product=${product}`);
    };
    

    return (
        <div>
            <Navbar />
            <div className='flex-col mt-24 items-center justify-center min-h-screen '>
                {product ? (
                    <div className='flex'>
                        <div className='w-3/4 p-10 '>
                            <div className='flex justify-between' >
                                {/* product image, name and cost */}
                                <div className='flex-col'>
                                    <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-full ml-2" />
                                    <h1 className="text-2xl font-bold mt-3">{product.name}</h1>
                                    <div className='flex items-center'>
                                        <h3 className="text-base font-bold">Precio: </h3>
                                        <p className='ml-2'>{product.cost}</p>
                                    </div>
                                </div>
                                <div className='flex-col place-items-end'>
                                {/* quantity of desired products */}
                                    <div className='flex items-center justify-center border rounded-lg p-2'>
                                        <p>Cantidad deseada: </p>
                                        <p className='mx-4'>{quantity}</p>
                                        <button className='ml-3 bg-gray-200 py-1 px-3 rounded-full' onClick={decrementQuantity}>-</button>
                                        <button className='ml-2 bg-gray-200 py-1 px-3 rounded-full' onClick={incrementQuantity}>+</button>
                                    </div>
                                    <button className='bg-primary text-white p-2 rounded-lg mt-28'>Agregar al carrito</button>
                                </div>
                            </div>
                            {/* product description */}
                            <div className='border rounded-lg p-4 mt-8 '>
                                <h2 className="text-xl font-bold">Descripción</h2>
                                <p className="mt-4">{product.description}</p>
                            </div>
                        </div>

                        {/* related products */}
                        <div className='flex-col w-1/4 py-9 px- border-l min-h-screen'>
                            <h2 className="text-base font-bold ml-5 mb-4">Productos relacionados</h2>
                            <div className='custom-scroll overflow-y-auto mr-4' style={{ maxHeight: 'calc(100vh - 200px)' }}>
                                {relatedProducts.map((relatedProduct) => (
                                    <div 
                                        key={relatedProduct.id} 
                                        className='border p-4 rounded-lg w-3/4 m-auto mb-5 cursor-pointer hover:shadow-lg'
                                        onClick={() => handleProductClick(relatedProduct.name)}

                                    >
                                        <img src={relatedProduct.image} alt={relatedProduct.name} className="w-32 h-32 object-cover m-auto rounded-full" />
                                        <div className='flex items-center'>
                                            <h3 className="text-base font-bold">Nombre: </h3>
                                            <p className='ml-2'>{relatedProduct.name}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <h3 className="text-base font-bold">Precio: </h3>
                                            <p className="ml-2">{relatedProduct.cost}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DescriptionProduct;