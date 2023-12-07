import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dropdown() {

    const [isOpenDropdown, setIsOpenDropDown] = useState(false)
    const { authUser, logout } = useContext(AuthContext);

    const dropdownEl = useRef(null);
    //{ current: null }
    //  dropDownEl { current: object <div class='relative'></div> }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropdownEl.current.contains(e.target)) {
                setIsOpenDropDown(false);
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside);
    }, [])



    return (
        <div className='relative' ref={dropdownEl}>
            <button
                className={`cursor-pointer flex justify-center items-center px-4 py-1 gap-1 bg-amber-500 rounded-3xl hover:ring-white hover:ring-2`}
                onClick={() => setIsOpenDropDown(!isOpenDropdown)}
            >
                {authUser.userName}
                <FontAwesomeIcon icon={faChevronDown} size='sm' />
            </button>

            {isOpenDropdown && (
                <div className='w-56 absolute bg-white right-0 translate-y-2 rounded-lg ring-2 ring-gray-500 p-2'>
                    <div onClick={() => setIsOpenDropDown(false)} >

                        <div
                            className='flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100 cursor-pointer'
                            onClick={() => navigate('/profile')}
                        >
                            <div>
                                <div className='text-sm text-gray-500' >user info</div>
                            </div>
                        </div>
                        <hr className='m-2 border' />

                        <div
                            className='flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100 cursor-pointer'
                            onClick={() => navigate('/order')}
                        >

                            <div>
                                <div className='text-sm text-gray-500' >payment history</div>
                            </div>
                        </div>
                        <hr className='m-2 border' />


                        <div
                            className='flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl'
                            onClick={() => {
                                logout()
                                navigate('/')
                            }}
                        >
                            <div className='bg-gray-400 h-9 aspect-square rounded-full flex justify-center items-center'>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </div>
                            <div className='font-semibold text-sm text-gray-500'>Log out</div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
