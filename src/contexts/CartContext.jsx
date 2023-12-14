import axios from '../config/axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { useEffect } from 'react';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {

    const [productCount, setProductCount] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [productTotalPrice, setProductTotalPrice] = useState();

    const [cartData, setCartData] = useState();


    useEffect(() => {
        fetchCart()
    }, [])


    const fetchCart = async () => {
        const response = await axios.get('/cart/get')
        setCartData(response.data.cart)
    }

    const handleAddToCart = (selectedProductId) => {

        const newCartItem = {
            productId: selectedProductId,
            quantity: productCount,
            price: productTotalPrice
        }
        const updatedCartItems = [...cartItems, newCartItem]

        setCartItems(updatedCartItems)
        // console.log('updatedCartItems', updatedCartItems)

        const requestBody = {
            CartItem: updatedCartItems
        }
        // console.log({requestBody})

        const response = axios.post('/cart/add', requestBody)
        console.log(response)
    }

    return (
        <CartContext.Provider
            value={{
                productCount, setProductCount,
                cartItems, setCartItems,
                productTotalPrice, setProductTotalPrice,
                handleAddToCart,
                cartData, setCartData
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
