import React from 'react'

export default function OrderItem({ id, imageUrl, name, totalPrice, quantity }) {
    return (
        <div className="p-3 w-2/3 flex items-center gap-8 ring-2 ring-gray-500 bg-white rounded-xl overflow-hidden">
            {imageUrl ? (
                <img src={imageUrl} alt='order image' className='w-20 h-20 object-cover rounded-lg' />
            ) : (
                <div className='bg-gray-400 w-20 h-20 rounded-lg'></div>
            )}
            <div className='grow flex flex-col'>
                <p className='font-semibold'>{name}</p>
                <p><span>&#215;</span> {quantity}</p>
                <p>Price: {totalPrice}</p>
            </div>

        </div>

    )
}
