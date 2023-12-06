import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';

export default function ProductDetail({ productId, imageUrl, name, desc, price, stockQuantity }) {

    const {
        selectedProductId,
        selectedProductImageUrl,
        selectedProductName,
        selectedProductDesc,
        selectedProductPrice,
        selectedProductStockQuantity
    } = useContext(ProductContext);


    const {
        productCount, setProductCount,
        cartItems, setCartItems,
        productTotalPrice, setProductTotalPrice,
        handleAddToCart
    } = useContext(CartContext);


    return (
        <div className='flex gap-8'>
            {selectedProductImageUrl ? (
                <img src={selectedProductImageUrl} className='w-[500px] object-cover rounded-xl' />
            ) : (
                <div className='bg-gray-400 w-[500px] h-[500px] rounded-xl'></div>
            )}

            <div className='flex flex-col'>
                <h3 className='text-4xl'>{selectedProductName}</h3>
                <div className='flex justify-between'>
                    <h6 className='text-lg font-normal text-gray-500'>Stock: {selectedProductStockQuantity}</h6>
                    <h6 className='text-xl text-amber-500'>{selectedProductPrice} &#3647;</h6>
                </div>

                <button
                    className='mt-4 w-56 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                    onClick={() => handleAddToCart(productId)}
                >
                    Add to cart
                    <FontAwesomeIcon icon={faCartShopping} size='1x' />
                </button>
            </div>
        </div>
    )
}
