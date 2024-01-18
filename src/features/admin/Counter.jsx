import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Input from '../auth/FormInput';
import Joi from 'joi';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';


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
                    className='w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200'
                    onChange={e => setUpdatedName(e.target.value)}
                    hasError={error.mobile}
                />
                {error.lastName && <InputErrorMessage message={error.mobile} />}
            </div>

            <div className='flex gap-4'>
                <div className='w-full'>
                    <label className='font-semibold text-gray-500'>Stock: </label>
                    <input
                        type='number'
                        value={updatedPrice}
                        min="0"
                        max="99_999"
                        placeholder=""
                        className='w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200'
                        onChange={e => setUpdatedPrice(e.target.value)}
                        hasError={error.mobile}
                    />
                    {error.lastName && <InputErrorMessage message={error.mobile} />}
                </div>

                <div className='w-full'>
                    <label className='font-semibold text-gray-500'>Price: </label>
                    <input
                        type='number'
                        value={updatedStock}
                        min="1"
                        max="99_999"
                        placeholder=""
                        className='w-full px-4 text-lg font-bold focus:text-amber-500 rounded-lg border-2 border-gray-200'
                        onChange={e => setUpdatedStock(e.target.value)}
                        hasError={error.mobile}
                    />
                    {error.lastName && <InputErrorMessage message={error.mobile} />}
                </div>
            </div>
        </>
    )
}
