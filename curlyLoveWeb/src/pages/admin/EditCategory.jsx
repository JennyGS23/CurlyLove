import { useState, useEffect } from "react";
import { db } from "../../firebase/Firebase";
import { collection, setDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function EditCategory({ onClose }) {
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    // Change listening in the collection in real time
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Category"), (snapshot) => {
            const categoriesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            }));
            setCategories(categoriesList);
        });

        return () => unsubscribe(); 
    }, []);

    // Add Category
    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!newCategory.trim()) {
            setError("El nombre de la categoría no puede estar vacío.");
            return;
        }
        if (categories.some(cat => cat.name === newCategory)) {
            setError("La categoría ya existe.");
            return;
        }

        try {
            await setDoc(doc(db, "Category", newCategory), { name: newCategory });
            setNewCategory("");
            setError("");
        } catch (error) {
            setError("Error al agregar la categoría.");
            console.error(error);
        }
    };

    // Delete Category
    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteDoc(doc(db, "Category", categoryId));
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-7/12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Administrar Categorías</h2>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                
                {/* input for add category */}
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nombre de la nueva categoría"
                    className="w-full p-2 border rounded-md mb-2"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                
                <div className="flex justify-end space-x-2 mb-4">
                    <button onClick={handleAddCategory} className="px-4 py-2 bg-[#29B6AB] text-white rounded-md">
                        Agregar
                    </button>
                </div>

                {/* category list */}
                <div className="max-h-60 overflow-y-auto border p-2 rounded-md ">
                    <ul className="space-y-2 ">
                        {categories.map((category) => (
                            <li key={category.id} className="flex justify-between items-center border-b py-2 ">
                                <span>{category.name}</span>
                                <button 
                                    type="button"
                                    onClick={() => handleDeleteCategory(category.id)} className="text-red-500"
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
