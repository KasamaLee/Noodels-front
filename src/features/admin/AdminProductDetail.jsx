import React from 'react'
import Counter from './Counter'
import { useState } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import SuccessAnimation from '../../components/SuccessAnimation';
import { useEffect } from 'react';
import ManageCategory from './ManageCategory';
import Joi from 'joi';

const productSchema = Joi.object({
    selectedProductName: Joi.required().not(null),
    monkAmount: Joi.number().integer().min(1).max(20).required(),
    eventDate: Joi.date().required(),
    selectLocation: Joi.object().required(),
});

const validateProduct = (input) => {
    const { error } = productSchema.validate(input, { abortEarly: false });
    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}

export default function AdminProductDetail() {

    const {
        isOpenModal, setIsOpenModal,
        allCategory,
        selectedProductId,
        selectedProductImageUrl,
        selectedProductName,
        selectedProductDesc,
        selectedProductPrice,
        selectedProductStockQuantity,
        // handleCreateProduct
    } = useContext(ProductContext);

    const [updatedName, setUpdatedName] = useState(selectedProductName)
    const [updatedPrice, setUpdatedPrice] = useState(selectedProductPrice)
    const [updatedStock, setUpdatedStock] = useState(selectedProductStockQuantity)

    const [file, setFile] = useState(null)
    const inputEl = useRef(null);
    const [error, setError] = useState({})

    const handleFile = (e) => {
        console.log(e.target.files[0])
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const resetFile = () => {
        setFile(null)
    }

    const handleCreateProduct = async () => {
        e.preventDefault();
        const validationError = validateRegister(input);

        // ถ้า validationError มีค่าให้ setError()
        if (validationError) {
            return setError(validationError);
        }

        try {
            setInitialLoading(true)
            const reqBody = new FormData();
            reqBody.append('image', file);
            reqBody.append('totalPrice', selectedTotalPrice)
            reqBody.append('totalPrice', updatedInput)

            // for (let [key, value] of reqBody.entries()) {
            //     console.log(key, value);
            // }

            const response = await axios.post('/order/create', reqBody);
            if (response.status === 200) {
                toast.success('your order is completed :)')
            }
        } catch (err) {
            toast.success("sorry, your order is not completed :(")
        } finally {
            setInitialLoading(false)
        }
    }


    return (
        <>
            <div className='grid grid-cols-2 gap-8 relative max-w-4xl'>
                <div>
                    {file ? (
                        <img src={URL.createObjectURL(file)} alt='uploaded image' className='border rounded-xl aspect-square object-cover' />
                    ) : (
                        selectedProductImageUrl ? <img src={selectedProductImageUrl} className='object-cover border rounded-xl aspect-square object-cover' />
                            : <div className='bg-gray-400  border rounded-xl aspect-square' />
                    )}

                    <input
                        ref={inputEl}
                        className='hidden'
                        type="file"
                        onChange={e => handleFile(e)}
                    />
                    <button
                        className='mx-auto mt-4 ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-full flex justify-center items-center gap-2'
                        onClick={() => inputEl.current.click()}
                    >
                        Upload <FontAwesomeIcon icon={faUpload} size='1x' />
                    </button>
                </div>

                <div className='flex flex-col gap-6'>
                    <Counter
                        error={error}
                        updatedName={updatedName}
                        setUpdatedName={setUpdatedName}
                        updatedPrice={updatedPrice}
                        setUpdatedPrice={setUpdatedPrice}
                        updatedStock={updatedStock}
                        setUpdatedStock={setUpdatedStock}
                    />

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-500'>Category: </label>
                        <ManageCategory
                            updatedName={updatedName}
                            updatedPrice={updatedPrice}
                            updatedStock={updatedStock}
                        />


                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-500'>Desc: </label>
                        <textarea
                            className='rounded-lg py-2 px-4 border-2 border-gray-200'
                            placeholder='...'
                            maxLength="500"
                            rows="4"
                            cols="50"
                            value={selectedProductDesc}
                            onChange={(e) => setProductDesc(e.target.value)}
                        />
                    </div>


                </div>
            </div>

            <button
                className='mx-auto mt-10 w-56 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                onClick={() => handleCreateProduct()}
            >
                Update
            </button>

            <SuccessAnimation
                width={380}
                height={380}
            // isSuccess={showSuccessAnimation}
            />
        </>
    )
}
