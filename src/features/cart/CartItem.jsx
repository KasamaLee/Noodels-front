import React from 'react'
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import CartCounter from './CartCounter';
import { useState } from 'react';
import { OrderContext } from '../../contexts/OrderContext';

export default function CartItem({ id, imageUrl, name, price, initialQuantity, maxQuantity }) {

    const { selectedItems, handleCheckbox } = useContext(OrderContext);
    const { handleDeleteCartItem } = useContext(CartContext);

    return (
        <div className='relative flex items-center w-2/3 gap-6'>
            <div className="relative p-6 grow flex items-center gap-8 ring-4 ring-gray-500 bg-white rounded-xl overflow-hidden">

                <img src={imageUrl} className='w-24 h-24 object-cover rounded-lg' />

                <div className='grow flex flex-col'>
                    <p className='text-lg font-semibold'>{name}</p>
                    <p>Price: {price}</p>
                    <p>Quantity: {initialQuantity}</p>
                </div>

                {maxQuantity > 0 ? (
                    <>
                        <CartCounter
                            id={id}
                            initialQuantity={initialQuantity}
                            maxQuantity={maxQuantity}
                            price={price}
                        />
                    </>
                ) : (
                    <div className='absolute z-10 w-full h-full left-0 top-0 flex items-center justify-center'>
                        <h4 className='z-10 text-2xl text-center text-red-900'>Temporary out of stock</h4>
                        <div className='absolute bg-red-300 opacity-60 w-full h-full '>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => handleDeleteCartItem(id)}
                    className='z-10 ml-6 text-sm ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-3xl flex justify-center items-center gap-1 hover:text-red-500 hover:ring-red-500'>
                    Delete <FontAwesomeIcon icon={faTrash} size='1x' />
                </button>
            </div>

            {maxQuantity > 0 &&
                <input
                    className='absolute -right-14 w-6 h-6 accent-amber-600 border-2 bg-gray-100 border-gray-300 rounded-lg focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    type="checkbox"
                    // checked={true}
                    checked={selectedItems.includes(id)}
                    onChange={() => handleCheckbox(id)}
                />
            }
        </div>

    )
}
