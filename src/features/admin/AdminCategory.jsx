import { useContext } from 'react';
import { useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import Modal from '../../components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';


export default function AdminCategory() {

    const {
        allCategory,
        handleDeleteCategory, handleCreateCategory, handleUpdateCategory,
        handleFilteredProducts, setFilteredProducts
    } = useContext(ProductContext)

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({ id: null, name: '' });


    useEffect(() => {
        if (selectedCategory.id) {
            return handleFilteredProducts(+selectedCategory.id);
        }
        setFilteredProducts(null)
    }, [selectedCategory]);

    return (
        <>
            <div className='py-10 flex flex-col gap-6 items-center'>
                <div className='flex items-center gap-2 w-fit'>
                    <label className='font-semibold text-gray-500 text-xl text-center'>Category : </label>
                    <input
                        type='text'
                        value={selectedCategory.name}
                        maxLength="16"
                        placeholder="Add new"
                        className='w-80 px-4 rounded-lg border-2 border-gray-200'
                        onChange={e => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                    />
                    {selectedCategory.id ? (
                        <button
                            className='top-1 right-2 px-4 py-2 rounded-full font-medium cursor-pointer bg-green-500 text-white hover:opacity-60'
                            onClick={() => {
                                handleUpdateCategory(selectedCategory.id, selectedCategory.name)
                                setSelectedCategory({ id: null, name: '' })
                            }}
                        > Update </button>
                    ) : (
                        <button
                            className='top-1 right-2 px-4 py-2 rounded-full font-medium cursor-pointer bg-green-500 text-white hover:opacity-60'
                            onClick={() => {
                                handleCreateCategory(selectedCategory.name)
                                setSelectedCategory({ id: null, name: '' })
                            }}
                        > + Add </button>
                    )}
                </div>

                <div className='flex flex-wrap gap-4'>
                    {allCategory.map((eachCategory) => (
                        <div
                            key={uuidv4()}
                            className={`${selectedCategory.id === eachCategory.id ? 'bg-amber-300' : 'bg-gray-300'} hover:bg-amber-200 w-fit px-3 py-1 rounded-lg cursor-pointer flex gap-3`}
                            onClick={() => {
                                handleFilteredProducts(+selectedCategory.id)
                                setSelectedCategory({ ...selectedCategory, id: eachCategory.id, name: eachCategory.name })
                            }}
                        >
                            {eachCategory.name}
                            <span
                                className={`cursor-pointer text-xl text-black hover:text-red-500`}
                                onClick={() => {
                                    setIsOpenDeleteModal(true)
                                }}
                            > &#215; </span>
                        </div>
                    ))}
                </div>

                {selectedCategory.id &&
                    <div
                        className={`px-4 py-2 rounded-full font-medium cursor-pointer bg-red-500 text-white hover:opacity-60`}
                        onClick={() => { setSelectedCategory({ id: null, name: '' }) }}
                    > Reset </div>
                }
            </div>

            <Modal isOpenModal={isOpenDeleteModal} onCloseModal={() => setIsOpenDeleteModal(false)}>
                <ConfirmDelete
                    text='Category'
                    handleDelete={() => {
                        handleDeleteCategory(selectedCategory.id)
                        setSelectedCategory({ id: null, name: '' })
                    }}
                    setIsOpenModal={setIsOpenDeleteModal}
                />
            </Modal>

        </>
    )
}
