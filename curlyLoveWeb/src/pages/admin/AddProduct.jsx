import { useState } from 'react';
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { db } from '../../firebase/Firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";

const AddProduct = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [grams, setGrams] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [unit, setUnit] = useState('g'); 

    const categories = ['Skala', 'duos', 'Cremas', 'Shampoo'];//cambiar a las categorias que se tengan en la base de datos
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category || !name || !cost || !grams || !description) {
            setError('Todos los campos son obligatorios para realizar el registro.');
            return;
        }
        if (isNaN(cost) || isNaN(grams)) {
            setError('El costo y los gramos deben ser solo valores numéricos.');
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
                description,
            };

            await setDoc(productRef, product);

            setCategory('');
            setName('');
            setCost('');
            setGrams('');
            setDescription('');
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
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-2 mt-1 block w-9/12 rounded-md bg-boneWhite shadow-sm focus:ring-2"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                            
                                              
                        <label htmlFor="name" className="block font-medium ">Nombre del Producto</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Producto1"
                            className="p-2 mt-1 block w-9/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 "
                            />
                    
                        <label htmlFor="cost" className="block font-medium">Costo del Producto</label>
                        <input
                            type="text"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            placeholder="₡5000"
                            className="p-2 mt-1 block w-4/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 "
                        />
                    
                        <label htmlFor="grams" className="block font-medium">Peso</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={grams}
                                onChange={(e) => setGrams(e.target.value)}
                                placeholder="500"
                                className="p-2 mt-1 block w-4/12 rounded-md bg-boneWhite shadow-sm focus:ring-2"
                            />
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="p-2 mt-1 block w-2/12 rounded-md bg-boneWhite shadow-sm focus:ring-2"
                            >
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                            </select>
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
                    <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-[#25A59A] rounded-full cursor-pointer">
                        <span className="text-xl font-bold ">+</span>
                    </div>
                    <p className="mt-2 text-sm">Agrega foto del nuevo producto</p>
                    {/* <button type="submit" className="mt-8 px-6 py-2 bg-yellow rounded-md font-medium hover:bg-yellow-600">
                        Guardar Nuevo Producto
                    </button> */}
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