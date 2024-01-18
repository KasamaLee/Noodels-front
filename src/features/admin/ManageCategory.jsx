import { useContext } from 'react';
import { useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import Counter from './Counter';

export default function ManageCategory() {

    const { allCategory } = useContext(ProductContext);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [isCreateNewCategory, setIsCreateNewCategory] = useState(false);

    return (
        <div className='flex flex-wrap gap-2 items-center'>
            {isCreateNewCategory ? (
                <div className='w-full relative'>
                    <input
                        type='number'
                        value={''}
                        min="0"
                        max="99_999"
                        placeholder=""
                        className='w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200'
                        onChange={e => setUpdatedPrice(e.target.value)}
                    />
                    <button
                        className='absolute top-1 right-2 px-3 py-2 rounded-full font-medium cursor-pointer bg-green-500 text-white hover:opacity-60'
                        onClick={() => setIsCreateNewCategory(true)}
                    >
                        + Add
                    </button>
                </div>
            ) : (
                <>
                    {allCategory.map((eachCategory, index) => (
                        <div
                            className={`${selectedCategoryId === eachCategory.id && 'bg-amber-300'} hover:bg-amber-100 text-sm bg-gray-300 px-3 py-1 rounded-lg cursor-pointer`}
                            onClick={() => {
                                setSelectedCategoryId(eachCategory.id)
                            }}
                        >
                            {eachCategory.name}
                        </div>
                    ))}
                    <button
                        className='ml-2 px-3 py-1 text-sm rounded-full font-medium cursor-pointer bg-green-500 text-white hover:opacity-60'
                        onClick={() => setIsCreateNewCategory(true)}
                    >
                        + Add
                    </button>
                </>
            )}

            <div
                className={`px-3 py-1 text-sm rounded-3xl font-medium cursor-pointer bg-red-500 text-white hover:opacity-60`}
                onClick={() => {
                    setSelectedCategoryId(null)
                    setIsCreateNewCategory(false)
                }}
            >
                x Reset
            </div>
        </div>
    )
}
