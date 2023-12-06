import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import CategoryItem from './CategoryItem';
import { v4 as uuidv4 } from 'uuid';

export default function CategoryList() {

    const [allCategory, setAllCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchCategory = async () => {
        const response = await axios.get('http://localhost:5555/category/get')
        setAllCategory(response.data.allCategory)
    }

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
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {allCategory.map((eachCategory, index) => (
                <CategoryItem
                    key={uuidv4()}
                    name={eachCategory.name}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            ))}
        </>
    )
}
