import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'

export default function CategoryItem({ name, categoryId }) {

    const { allProduct, selectedCategory, setSelectedCategory, filteredProducts, setFilteredProducts, handleFilteredProducts } = useContext(ProductContext)

    return (
        <div
            className={`ring-2 ring-black px-3 py-1 rounded-3xl font-medium cursor-pointer hover:bg-amber-100 hover:-translate-y-1 ${selectedCategory === name ? 'bg-amber-400' : 'bg-white'}`}
            onClick={() => {
                setSelectedCategory(name)
                
                if (name === 'All') {
                    setFilteredProducts(null)
                } else {
                    handleFilteredProducts(categoryId)
                }
            }}
        >
            {name}
        </div>
    )
}
