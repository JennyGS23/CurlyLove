import { useState, useEffect } from 'react';
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import EditCategory from "./EditCategory";
import EditBrand from "./EditBrand";
import { db } from '../../firebase/Firebase';
import {collection, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [grams, setGrams] = useState('');
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [unit, setUnit] = useState('g'); 
    const [image, setImage] = useState(null);


    const [success, setSuccess] = useState(false);
    const [isModalCategory, setIsModalCategory] = useState(false);
    const [isModalBrand, setIsModalBrand] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Category"), (snapshot) => {
          const categoryList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCategories(categoryList);
        });
        return () => unsubscribe(); 
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Brand"), (snapshot) => {
          const brandList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBrands(brandList);
        });
        return () => unsubscribe(); 
    }, []);


    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category || !name || !cost || !grams || !brand || !description) {
            setError('Todos los campos son obligatorios para realizar el registro.');
            return;
        }
        if (isNaN(cost) || isNaN(grams)) {
            setError('El costo y los gramos deben ser solo valores numéricos.');
            return;
        }
        if (image === null) {
            setError('Por favor, agrega una imagen para el producto.');
            return;
        }
        
        try{
            // verification if the product already exists
            const productRef = doc(db, 'products', name);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
                setError('El producto con este nombre ya existe en la base de datos.');
                return;
            }

            // add product to the database if it does not exist
            const product = {
                category,
                name,
                cost: `₡${cost}`,
                grams: `${grams}${unit}`,
                brand,
                description,
                image,
            };

            await setDoc(productRef, product);

            setCategory('');
            setName('');
            setCost('');
            setGrams('');
            setDescription('');
            setImage(null);
            setError('');
            setSuccess(true); 
            
           
        }

        catch (error) {
            setError(error.message);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row items-start justify-between px-6 py-4 bg-white pt-10 mb-16">
                {/* Form */}
                <div className="w-full md:w-2/3 ml-16 mr-10">
                    <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Producto</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <label htmlFor="category" className="block font-medium">Categoría</label>
                        <div className='flex items-center space-x-2'>
                            <select className="p-2 mt-1 block w-7/12 rounded-md bg-boneWhite shadow-sm focus:ring-2">
                                <option value="">Selecciona una categoría</option>
                                {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                                ))}
                            </select>
                            <button 
                                type='button'
                                onClick={() => setIsModalCategory(true)}
                                className="px-4 py-2 bg-yellow rounded-md font-medium hover:bg-yellow-600"
                            >
                                <FontAwesomeIcon icon={faPenToSquare}/>
                            </button>
                            {isModalCategory && <EditCategory onClose={() => setIsModalCategory(false)} />}
                        </div>
                        
                            
                                              
                        <label htmlFor="name" className="block font-medium ">Nombre del Producto</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Producto1"
                            className="p-2 mt-1 block w-7/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 "
                            />
                    
                        <label htmlFor="cost" className="block font-medium">Costo del Producto</label>
                        <input
                            type="text"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            placeholder="₡5000"
                            className="p-2 mt-1 block w-7/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 "
                        />
                    
                        <label htmlFor="grams" className="block font-medium">Peso</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={grams}
                                onChange={(e) => setGrams(e.target.value)}
                                placeholder="500"
                                className="p-2 mt-1 block w-64 rounded-md bg-boneWhite shadow-sm focus:ring-2"
                            />
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="p-2 mt-1 block w-3/12 rounded-md bg-boneWhite shadow-sm focus:ring-2"
                            >
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                            </select>
                        </div>

                        <label htmlFor="brand" className="block font-medium">Marca</label>
                        <div className='flex items-center space-x-2'>
                        <select className="p-2 mt-1 block w-7/12 rounded-md bg-boneWhite shadow-sm focus:ring-2">
                            <option value="">Selecciona una marca</option>
                            {brands.map((brand) => (
                            <option key={brand.id} value={brand.name}>
                                {brand.name}
                            </option>
                            ))}
                        </select>
                            <button 
                                type='button'
                                onClick={() => setIsModalBrand(true)}
                                className="px-4 py-2 bg-yellow rounded-md font-medium hover:bg-yellow-600"
                            >
                                <FontAwesomeIcon icon={faPenToSquare}/>
                            </button>
                            {isModalBrand&& <EditBrand onClose={() => setIsModalBrand(false)} />}
                       </div>
                        <div>
                            <label htmlFor="description" className="block font-medium mt-16">Descripción del producto nuevo</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="p-2 mt-1 block w-full rounded-md bg-boneWhite shadow-sm focus:ring-2 h-52"
                            />
                        
                            <div className="flex justify-end mt-8 space-x-5">
                                {error && <p className="text-red-500">{error}</p>}
                                <button type="submit" className="px-5 py-2 bg-yellow rounded-md font-medium hover:bg-yellow-600">
                                    Guardar Producto Nuevo
                                </button>
                            </div>

                        </div>
                    </form>
                   
                </div>

                {/* Add photo */}
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-[#25A59A] rounded-full cursor-pointer relative">
                        <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                        {image ? (
                            <img src={image} alt="Vista previa" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span><FontAwesomeIcon icon={faPlus} className='border-[#25A59A]'/></span>
                        )}
                    </div>
                    <p className="mt-2 text-sm">Agrega foto del nuevo producto</p>
                </div>
            </div>


            {success && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <span className="text-green-500 text-4xl">✔️</span>
                        <p className="mt-4 text-lg font-semibold">Producto agregado correctamente</p>
                        <button onClick={() => setSuccess(false)} className="mt-4 px-4 py-2 bg-[#29B6AB] text-white rounded-md">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default AddProduct;