import axios from '../config/axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {

    const [productCount, setProductCount] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [productTotalPrice, setProductTotalPrice] = useState();

    const { authUser } = useContext(AuthContext)

    const handleAddToCart = (selectedProductId) => {

        const newCartItem = {
            productId: selectedProductId,
            quantity: productCount,
            price: productTotalPrice
        }
        const updatedCartItems = [...cartItems, newCartItem]

        setCartItems(updatedCartItems)
        console.log('updatedCartItems', updatedCartItems)

        const requestBody = {
            userId: authUser.id,
            CartItem: updatedCartItems
        }
        // console.log(requestBody)

        const response = axios.post('/cart/add', requestBody)
        console.log(response)
    }

    return (
        <CartContext.Provider
            value={{
                productCount, setProductCount,
                cartItems, setCartItems,
                productTotalPrice, setProductTotalPrice,
                handleAddToCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
