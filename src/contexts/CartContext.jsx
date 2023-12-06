import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const CartContext = createContext();

export default function CartContextProvider({children}) {

    const [productCount, setProductCount] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [productTotalPrice, setProductTotalPrice] = useState();

    const handleAddToCart = (productId) => {

        const newCartItem = {
            productId: productId,
            quantity: productCount,
            price: productTotalPrice
        }
        const updatedCartItems = [...cartItems, newCartItem]
        
        setCartItems(updatedCartItems)

        console.log('updatedCartItems', updatedCartItems)

        const requestBody = {
            userId: 1,
            CartItem: updatedCartItems
        }

        console.log(requestBody)

        // const response = axios.post('http://localhost:5555/cart/add', requestBody)
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
