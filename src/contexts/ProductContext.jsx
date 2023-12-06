import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

export const ProductContext = createContext()

export default function ProductContextProvider({ children }) {

    const [isOpenModal, setIsOpenModal] = useState(false);
    
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState();
    const [selectedProductImageUrl, setSelectedProductImageUrl] = useState();
    const [selectedProductName, setSelectedProductName] = useState();
    const [selectedProductDesc, setSelectedProductDesc] = useState();
    const [selectedProductPrice, setSelectedProductPrice] = useState();
    const [selectedProductStockQuantity, setSelectedProductStockQuantity] = useState();


    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        const response = await axios.get('http://localhost:5555/product/get')
        setAllProducts(response.data.allProducts)
    }

    // console.log(allProducts)
    // console.log(selectedProduct, '--------')

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
                selectedProductStockQuantity, setSelectedProductStockQuantity
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
