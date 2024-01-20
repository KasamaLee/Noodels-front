import { useContext } from 'react';
import { useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { v4 as uuidv4 } from 'uuid';

export default function ManageCategory() {

    const { allCategory, selectedCategoryId, setSelectedCategoryId, handleCreateCategory } = useContext(ProductContext);
    const [isCreateNewCategory, setIsCreateNewCategory] = useState(false);
    const [input, setInput] = useState()

    return (
        <div className='flex flex-wrap gap-2 items-center'>
            {isCreateNewCategory ? (
                <div className='w-full relative'>
                    <input
                        type='text'
                        value={input}
                        maxLength="20"
                        placeholder=""
                        className='w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200'
                        onChange={e => setInput(e.target.value)}
                    />
                    <button
                        className='absolute top-1 right-2 px-3 py-2 rounded-full font-medium cursor-pointer bg-green-500 text-white hover:opacity-60'
                        onClick={() => {
                            handleCreateCategory(input)
                            setIsCreateNewCategory(false)
                        }}
                    >
                        + Add
                    </button>
                </div>
            ) : (
                <>
                    {allCategory.map((eachCategory) => (
                        <div
                            key={uuidv4()}
                            className={`${selectedCategoryId === eachCategory.id ? 'bg-amber-300' : ' bg-gray-300'} hover:bg-amber-100 text-sm px-3 py-1 rounded-lg cursor-pointer`}
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
            )
            }

            <div
                className={`px-3 py-1 text-sm rounded-3xl font-medium cursor-pointer bg-red-500 text-white hover:opacity-60`}
                onClick={() => {
                    setSelectedCategoryId(null)
                    setIsCreateNewCategory(false)
                    setInput()
                }}
            >
                x Reset
            </div>
        </div >
    )
}
