import axios from '../config/axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { AuthContext } from './AuthContext';
import { useMemo } from 'react';
import { toast } from 'react-toastify';


export const CartContext = createContext();

export default function CartContextProvider({ children }) {

    const [productCount, setProductCount] = useState(1);
    const [cartItems, setCartItems] = useState();
    const [productTotalPrice, setProductTotalPrice] = useState();
    const [cartData, setCartData] = useState();
    const [deletingItemId, setDeletingItemId] = useState(null);

    const { authUser, isOpenLoginModal, setIsOpenLoginModal } = useContext(AuthContext)


    const fetchCart = async () => {
        const response = await axios.get('/cart/get')
        setCartData(response.data.cart)
    }


    const sortedCartItems = useMemo(() => {
        if (!cartData?.CartItem) {
            return [];
        }

        // Sort CartItem array
        return [...cartData.CartItem].sort((a, b) => {
            if (a.product.stockQuantity === 0) return 1        // IF a:0 ==> move a BEHIND b
            if (b.product.stockQuantity === 0) return -1       // IF b:0 ==> move a BEFORE b
            return 0;
        });
    }, [cartData?.CartItem]);


    const handleAddToCart = async (selectedProductId) => {
        try {
            if (!authUser) {
                setIsOpenLoginModal(true)
            }

            const newCartItem = {
                productId: selectedProductId,
                quantity: productCount,
                price: productTotalPrice
            }

            const response = await axios.post('/cart/add', newCartItem)
            if (response.status === 200) {
                fetchCart()
            }
        } catch (err) {
            toast.error("Error adding to cart:", err);
        }
    }

    const handleUpDateQuantity = async (cartItemId, quantity, price) => {
        try {
            // console.log(cartItemId, quantity, price)
            const response = await axios.patch(`/cart/update/${cartItemId}`, { quantity, price })
            if (response.status === 200) {
                fetchCart()
            }
        } catch (err) {
            toast.error("Error updating cart:", err);
        }
    }

    const handleDeleteCartItem = async (cartItemId) => {
        try {
            // console.log(cartItemId)
            const response = await axios.delete(`/cart/delete/${cartItemId}`)
            if (response.status === 200) {
                fetchCart()
                toast.success('Product is deleted')
            }
        } catch (err) {
            toast.error("Error deleting cart:", err);
        }
    }

    return (
        <CartContext.Provider
            value={{
                productCount, setProductCount,
                cartItems, setCartItems,
                productTotalPrice, setProductTotalPrice,
                deletingItemId, setDeletingItemId,
                handleAddToCart, handleDeleteCartItem, handleUpDateQuantity,
                cartData, setCartData,
                fetchCart,
                sortedCartItems
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
