import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const AddProduct = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row items-start justify-between px-6 py-4 bg-white pt-10">
                {/* Form */}
                <div className="w-full md:w-2/3 ml-16 mr-10">
                    <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Producto</h1>
                    <form className="space-y-4">
                    <div>
                        <label className="block font-medium">Seleccionar Categoría</label>
                        <select className="p-2 mt-1 block w-9/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Duo Shampoo & Acondicionador</option>
                        {/*Update category values ​​with data from the database, automatically */}
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium ">Nombre del Producto</label>
                        <input
                        type="text"
                        className="p-2 mt-1 block w-9/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 "
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Costo del Producto</label>
                        <input
                        type="text"
                        placeholder="₡5000"
                        className="p-2 mt-1 block w-4/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 "
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Gramos</label>
                        <input
                        type="text"
                        placeholder="500g"
                        className=" p-2 mt-1 block w-4/12 rounded-md bg-boneWhite shadow-sm focus:ring-2 "
                        />
                    </div>
                    <div>
                        <label className="block font-medium mt-16">Descripción del nuevo producto</label>
                        <textarea
                        rows="4"
                        className="p-2 mt-1 block w-full rounded-md bg-boneWhite shadow-sm focus:ring-2 h-52"
                        />
                    </div>
                    </form>
                   
                </div>

                {/* Add photo */}
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-[#25A59A] rounded-full cursor-pointer">
                    <span className="text-xl font-bold ">+</span>
                    </div>
                    <p className="mt-2 text-sm">Agregar foto producto</p>
                    <button className="mt-8 px-6 py-2 bg-yellow rounded-md font-medium hover:bg-yellow-600">
                    Guardar Nuevo Producto
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddProduct;