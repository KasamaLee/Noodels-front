import axios from '../config/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { toast } from 'react-toastify';


export const ProductContext = createContext()

export default function ProductContextProvider({ children }) {

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [allProducts, setAllProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductImageUrl, setSelectedProductImageUrl] = useState();
    const [selectedProductName, setSelectedProductName] = useState();
    const [selectedProductDesc, setSelectedProductDesc] = useState('');
    const [selectedProductPrice, setSelectedProductPrice] = useState();
    const [selectedProductStockQuantity, setSelectedProductStockQuantity] = useState();

    const [allCategory, setAllCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCategoryId, setSelectedCategoryId] = useState('All');
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

    const resetSelectedProductData = () => {
        setSelectedProductId()
        setSelectedProductImageUrl()
        setSelectedProductName()
        setSelectedProductDesc('')
        setSelectedProductPrice()
        setSelectedProductStockQuantity()
        setSelectedCategoryId()
    }

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`/product/delete/${productId}`)
            if (response.status === 200) {
                toast.success('Product is deleted')
                fetchProduct()
            }
        } catch (err) {
            toast.error("Error deleting product:", err);
        }
    }

    const handleDeleteCategory = async (id) => {
        try {
            const response = await axios.delete(`/category/delete/${id}`)
            if (response.status === 200) {
                toast.success('Category is deleted')
                fetchCategory()
            }
        } catch (err) {
            toast.error("Error deleting category:", err);
        }
    }

    const handleCreateCategory = async (categoryName) => {
        try {
            const response = await axios.post(`/category/add`, { categoryName })
            if (response.status === 200) {
                toast.success('Category is added')
                fetchCategory()
            }
        } catch (err) {
            toast.error("Error adding category:", err);
        }
    }

    const handleUpdateCategory = async (id, categoryName) => {
        try {
            const response = await axios.patch(`/category/update/${id}`, { id, categoryName })
            if (response.status === 200) {
                toast.success('Category is updated')
                fetchCategory()
            }
        } catch (err) {
            toast.error("Error updating category:", err);
        }
    }


    return (
        <ProductContext.Provider
            value={{
                isOpenModal, setIsOpenModal,
                allProducts, setAllProducts,
                fetchProduct,
                selectedProductId, setSelectedProductId,
                selectedProductImageUrl, setSelectedProductImageUrl,
                selectedProductName, setSelectedProductName,
                selectedProductDesc, setSelectedProductDesc,
                selectedProductPrice, setSelectedProductPrice,
                selectedProductStockQuantity, setSelectedProductStockQuantity,

                allCategory, setAllCategory,
                selectedCategory, setSelectedCategory,
                filteredProducts, setFilteredProducts,
                handleFilteredProducts,
                handleDeleteProduct,
                handleDeleteCategory,
                handleCreateCategory,
                handleUpdateCategory,
                selectedCategoryId, setSelectedCategoryId,
                resetSelectedProductData
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
