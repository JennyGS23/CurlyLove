import { useState, useEffect } from "react";
import { db } from "../../firebase/Firebase";
import { collection, setDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function EditBrand({ onClose }) {
    const [newBrand, setNewBrand] = useState("");
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState("");

    // Change listening in the collection in real time
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Brand"), (snapshot) => {
            const brandList = snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            }));
            setBrands(brandList);
        });
        
        return () => unsubscribe(); 
    }, []);

    // Add Brands
    const handleAddBrands = async (e) => {
        e.preventDefault();

        if (!newBrand.trim()) {
            setError("El nombre de la marca no puede estar vacío.");
            return;
        }
        if (brands.some(brand => brand.name === newBrand)) {
            setError("La marca ya existe.");
            return;
        }

        try {
            await setDoc(doc(db, "Brand", newBrand), { name: newBrand });
            setNewBrand("");
            setError("");
        } catch (error) {
            setError("Error al agregar la marca.");
            console.error(error);
        }
    };

    // Delete Brands
    const handleDeleteBrand = async (brandId) => {
        try {
            await deleteDoc(doc(db, "Brand", brandId));
        } catch (error) {
            console.error("Error al eliminar la marca:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-7/12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Administrar Marcas</h2>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                
                {/* input for add brand */}
                <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="Nombre de la nueva marca"
                    className="w-full p-2 border rounded-md mb-2"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                
                <div className="flex justify-end space-x-2 mb-4">
                    <button onClick={handleAddBrands} className="px-4 py-2 bg-[#29B6AB] text-white rounded-md">
                        Agregar
                    </button>
                </div>

                {/* brand list */}
                <div className="max-h-60 overflow-y-auto border p-2 rounded-md ">
                    <ul className="space-y-2 ">
                        {brands.map((brand) => (
                            <li key={brand.id} className="flex justify-between items-center border-b py-2 ">
                                <span>{brand.name}</span>
                                <button 
                                    type="button"
                                    onClick={() => handleDeleteBrand(brand.id)} className="text-red-500"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
