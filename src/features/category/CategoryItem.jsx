import React from 'react'

export default function CategoryItem({ name, selectedCategory, setSelectedCategory }) {
    return (
        <div
            className={`ring-2 ring-black px-3 py-1 rounded-3xl font-medium cursor-pointer hover:-translate-y-1 ${selectedCategory === name ? 'bg-amber-400' : 'bg-white'}`}
            onClick={() => setSelectedCategory(name)}
        >
            {name}
        </div>
    )
}
