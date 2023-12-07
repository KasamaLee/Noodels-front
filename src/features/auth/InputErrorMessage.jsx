import React from 'react'

export default function InputErrorMessage({ message }) {
    return (
        <span className='text-red-500 text-xs'>{message}</span>
    )
}
