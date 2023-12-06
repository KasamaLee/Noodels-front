import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import CategoryItem from './CategoryItem';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';

export default function CategoryList() {

    const { allProducts, allCategory, selectedCategory, setSelectedCategory, handleFilteredProducts } = useContext(ProductContext)

    // console.log(allCategory)

    return (
        <>
            {/* <div
                className={`ring-2 ring-black px-3 py-1 rounded-3xl font-medium cursor-pointer ${selectedCategory === 'All' ? 'bg-amber-400' : 'bg-white'}`}
                onClick={() => setSelectedCategory('All')}
            >
                All
            </div> */}

            <CategoryItem
                name={'All'}
            />

            {allCategory.map((eachCategory, index) => (
                <CategoryItem
                    key={uuidv4()}
                    name={eachCategory.name}
                    categoryId={eachCategory.id}
                />
            ))}
        </>
    )
}
