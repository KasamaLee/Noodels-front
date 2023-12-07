import axios from '../config/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

export const ProductContext = createContext()

export default function ProductContextProvider({ children }) {

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [allProducts, setAllProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductImageUrl, setSelectedProductImageUrl] = useState();
    const [selectedProductName, setSelectedProductName] = useState();
    const [selectedProductDesc, setSelectedProductDesc] = useState();
    const [selectedProductPrice, setSelectedProductPrice] = useState();
    const [selectedProductStockQuantity, setSelectedProductStockQuantity] = useState();

    const [allCategory, setAllCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState(null);
    

    useEffect(() => {
        fetchProduct()
        fetchCategory()
    }, [])

    const fetchProduct = async () => {
        const response = await axios.get('/product/get')
        setAllProducts(response.data.allProducts)
    }

    const fetchCategory = async () => {
        const response = await axios.get('/category/get')
        setAllCategory(response.data.allCategory)
    }

    const handleFilteredProducts = (categoryId) => {
        const newFilteredProducts = allProducts.filter((eachProduct) => (eachProduct.countryId === categoryId))
        setFilteredProducts(newFilteredProducts);
    }

    return (
        <ProductContext.Provider
            value={{
                isOpenModal, setIsOpenModal,
                allProducts, setAllProducts,
                selectedProductId, setSelectedProductId,
                selectedProductImageUrl, setSelectedProductImageUrl,
                selectedProductName, setSelectedProductName,
                selectedProductDesc, setSelectedProductDesc,
                selectedProductPrice, setSelectedProductPrice,
                selectedProductStockQuantity, setSelectedProductStockQuantity,

                allCategory, setAllCategory,
                selectedCategory, setSelectedCategory,
                filteredProducts, setFilteredProducts,
                handleFilteredProducts
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
