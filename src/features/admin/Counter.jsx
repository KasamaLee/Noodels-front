import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Input from '../auth/FormInput';
import Joi from 'joi';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import InputErrorMessage from '../auth/InputErrorMessage';


export default function Counter({ error, updatedName, setUpdatedName, updatedPrice, setUpdatedPrice, updatedStock, setUpdatedStock }) {

    return (
        <>
            <div className='w-full'>
                <label className='font-semibold text-gray-500'>Product: </label>
                <input
                    type='text'
                    value={updatedName}
                    maxLength="40"
                    placeholder=""
                    className={`${error.updatedName && 'border-red-500'} w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200`}
                    onChange={e => setUpdatedName(e.target.value)}
                />
                {error.updatedName && <InputErrorMessage message={error.updatedName} />}
            </div>

            <div className='flex gap-4'>
                <div className='w-full'>
                    <label className='font-semibold text-gray-500'>Price: </label>
                    <input
                        type='number'
                        value={updatedPrice}
                        placeholder=""
                        className={`${error.updatedPrice && 'border-red-500'} w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200`}
                        onChange={e => setUpdatedPrice(e.target.value)}
                    />
                    {error.updatedPrice && <InputErrorMessage message={error.updatedPrice} />}
                </div>

                <div className='w-full'>
                    <label className='font-semibold text-gray-500'>Stock: </label>
                    <input
                        type='number'
                        value={updatedStock}
                        min="1"
                        max="99_999"
                        placeholder=""
                        className={`${error.updatedStock && 'border-red-500'} w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200`}
                        onChange={e => setUpdatedStock(e.target.value)}
                    />
                    {error.updatedStock && <InputErrorMessage message={error.updatedStock} />}
                </div>
            </div>
        </>
    )
}
