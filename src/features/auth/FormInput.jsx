import React from 'react'

export default function Input({ type = 'text', placeholder, value, onChange, name, hasError }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-600 leading-tight hover:border-gray-400 focus:outline-none focus:bg-white focus:border-amber-500     
            ${hasError
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-blue-300 focus:border-blue-500 border-gray-300"
                }`}
            name={name}
            value={value}
            onChange={onChange}
        />
    )
}
