import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { db } from '../../firebase/Firebase';
import {collection, onSnapshot } from "firebase/firestore";

const ClientPrincipalPage = () => {
  
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cost, setCost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


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

  // Filter products by category or search term or cost
  const filteredProducts = products.filter(product =>
    (category === '' || product.category === category) &&
    (cost === '' || product.cost === cost) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle product click
  const handleProductClick = (productName) => {
    navigate(`/description?product=${productName}`);
  };

  return (
    <div >
      <Navbar className="fixed top-0 left-0 w-full z-50" />
      <div className="flex-col mt-36 items-center justify-center min-h-screen ">
        <div className="w-9/12 mx-auto">
          <div className="flex space-x-20 p-4 rounded-lg ">
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
                className="p-2 mt-1 block rounded-lg border border-boneWhite  focus:ring-2 focus:ring-[#25A59A] outline-none"
                
            >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
            {/* cost products */}
            <select
                value={cost} 
                onChange={(e) => setCost(e.target.value)} 
                className="p-2 mt-1 block rounded-lg border border-boneWhite  focus:ring-2 focus:ring-[#25A59A] outline-none"
            >
                <option value="">Selecciona el costo del producto</option>
                {products.map((product) => (
                    <option key={product.id} value={product.cost}>
                        {product.cost}
                    </option>
                ))}
            </select>
          </div>

          {/* Products List */}
          <div className="grid grid-cols-4 gap-4 mt-10 mb-20">
                {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="border px-4 pt-4 pb-2 rounded-lg cursor-pointer shadow-lg hover:shadow-xl"
                      onClick={() => handleProductClick(product.name)}
                    >
                      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover m-auto rounded-full" />
                      <div className='flex-col items-center'>
                        <h3 className="text-base font-bold">Nombre: </h3>
                        <p className='text-base'>{product.name}</p>
                      </div>
                      <div className='flex'>
                        <h3 className="text-base font-bold">Precio: </h3>
                        <p className="ml-2">{product.cost}</p>
                      </div>
                    </div>
                ))}
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default ClientPrincipalPage;