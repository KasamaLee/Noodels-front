import Counter from './Counter'
import { useState } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import ManageCategory from './ManageCategory';
import Joi from 'joi';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import InputErrorMessage from '../auth/InputErrorMessage';


const productSchema = Joi.object({
    updatedName: Joi.string().required().max(40),
    updatedPrice: Joi.number().integer().min(1).max(999_999).required(),
    updatedStock: Joi.number().integer().min(0).max(999_999).required(),
    updatedDesc: Joi.string().max(400).allow('', null)
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
        selectedProductId, setSelectedProductId,
        selectedProductImageUrl, setSelectedProductImageUrl,
        selectedProductName, setSelectedProductName,
        selectedProductDesc, setSelectedProductDesc,
        selectedProductPrice, setSelectedProductPrice,
        selectedProductStockQuantity, setSelectedProductStockQuantity,
        selectedCategoryId, setSelectedCategoryId,
        resetSelectedProductData
    } = useContext(ProductContext);

    const { setInitialLoading } = useContext(AuthContext)
    const [updatedName, setUpdatedName] = useState(selectedProductName)
    const [updatedPrice, setUpdatedPrice] = useState(selectedProductPrice)
    const [updatedStock, setUpdatedStock] = useState(selectedProductStockQuantity)
    const [updatedDesc, setUpdatedDesc] = useState(selectedProductDesc || '')

    const [error, setError] = useState({})
    const [file, setFile] = useState(null)


    const inputEl = useRef(null);

    const handleFile = (e) => {
        console.log(e.target.files[0])
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    // console.log('file:', file)

    const handleError = () => {
        const productObj = {
            updatedName,
            updatedPrice,
            updatedStock,
            updatedDesc
        }
        const validationError = validateProduct(productObj);

        // ถ้า validationError มีค่าให้ setError()
        if (validationError) {
            setError(validationError);
            return true
        }
        return false
    }

    const handleUpdateProduct = async () => {
        if (handleError()) return
        // if(error) return
        try {
            setInitialLoading(true)
            const reqBody = new FormData();
            reqBody.append('image', file);
            reqBody.append('name', updatedName);
            reqBody.append('price', updatedPrice)
            reqBody.append('stockQuantity', updatedStock)
            reqBody.append('desc', updatedDesc)
            reqBody.append('categoryId', selectedCategoryId)
            // for (let [key, value] of reqBody.entries()) {
            //     console.log(key, value);
            // }

            const response = await axios.patch(`/product/update/${selectedProductId}`, reqBody);
            if (response.status === 200) {
                toast.success('Product is updated')
            }
            resetSelectedProductData()
        } catch (err) {
            console.log(err)
            toast.error("Error updating product:", err);
        } finally {
            setInitialLoading(false)
        }
    }

    const handleAddProduct = async () => {
        if (handleError()) return
        // if(error) return
        try {
            setInitialLoading(true)
            const reqBody = new FormData();
            reqBody.append('image', file);
            reqBody.append('name', updatedName);
            reqBody.append('price', updatedPrice)
            reqBody.append('stockQuantity', updatedStock)
            reqBody.append('desc', updatedDesc)
            reqBody.append('categoryId', selectedCategoryId)

            const response = await axios.post(`/product/add`, reqBody);
            if (response.status === 200) {
                toast.success('Product is added')
            }
            resetSelectedProductData()
        } catch (err) {
            console.log(err)
            toast.error("Error adding product:", err);
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
                            selectedCategoryId={selectedCategoryId}
                            setSelectedCategoryId={setSelectedCategoryId}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-500'>Desc: </label>
                        <textarea
                            className='rounded-lg py-2 px-4 border-2 border-gray-200'
                            placeholder='product details'
                            maxLength="500"
                            rows="4"
                            cols="50"
                            value={updatedDesc}
                            onChange={(e) => setUpdatedDesc(e.target.value)}
                        />
                        {error.updatedDesc && <InputErrorMessage message={error.updatedDesc} />}
                    </div>
                </div>
            </div>

            {selectedProductId ? (
                <button
                    className='mx-auto mt-10 w-56 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                    onClick={() => handleUpdateProduct()}
                >
                    Update
                </button>
            ) : (
                <button
                    className='mx-auto mt-10 w-56 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                    onClick={() => handleAddProduct()}
                >
                    Add
                </button>
            )}

        </>
    )
}