import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPenToSquare, faDeleteLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

import { db } from '../../firebase/Firebase';
import {collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";


const AdminPrincipalPage = () => {
  
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // categories collection
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

   // products collection
   useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });
    return () => unsubscribe(); 
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter(product =>
    (category === '' || product.category === category) && 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle product click
  const handleProductClick = (productName) => {
    navigate(`/description?product=${productName}`);
  };

  // Handle delete product
  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "products", productToDelete));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div >
      <Navbar className="fixed top-0 left-0 w-full z-50" />
      <div className="flex-col mt-14 items-center justify-center min-h-screen ">
      <div className="flex justify-end mt-4 mb-4">
            <button className='flex items-center mr-20 hover:scale-105 bg-[#25A59A] text-white py-2 px-4 rounded-lg' onClick={() => navigate('/AddProduct')}>
              Agregar producto nuevo
            </button>
          </div>
        <div className="w-9/12 mx-auto">
          <div className="flex space-x-40 p-4 rounded-lg ">
            {/* search input */}
            <div className="relative flex items-center w-3/12 ml-8 z-10">
              <input
                className="h-9 pl-4 pr-4 w-full text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25A59A]"
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-3 text-gray-400"
              />
            </div>

            {/* category products */}
            <select
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="p-2 mt-1 block w-7/12 rounded-lg border border-boneWhite  focus:ring-2 focus:ring-[#25A59A] outline-none"
                
            >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
          </div>

          {/* Products List */}
          <div className="grid grid-cols-4 gap-4 mt-10 mb-20">
                {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg"
                      onClick={() => handleProductClick(product.name)}
                    >
                      <div className="top-2 flex justify-end hover:text-primary">
                        <button 
                          className=" text-[#2a2a2a] p-1 hover:text-[#25A59A] "
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   handleEditProduct(product.id);
                          // }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button 
                          className=" text-[#2a2a2a] p-1 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faDeleteLeft} />
                        </button>
                      </div>

                      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover m-auto rounded-full" />
                      <div className='flex items-center'>
                        <h3 className="text-base font-bold text-[#2a2a2a] ">Nombre: </h3>
                        <p className='ml-2'>{product.name}</p>
                      </div>
                      <div className='flex items-center'>
                        <h3 className="text-base font-bold text-[#2a2a2a]">Precio: </h3>
                        <p className="ml-2">{product.cost}</p>
                      </div>
                    </div>
                ))}
          </div>
        </div>
      </div>

      {/* Delete product modal */}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <span className="text-red-500 text-4xl">⚠️</span>
            <p className="mt-4 text-lg font-semibold">¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button onClick={confirmDeleteProduct} className="px-4 py-2 bg-red-600 text-white rounded-md">
                Eliminar
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-300 text-black rounded-md">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default AdminPrincipalPage;