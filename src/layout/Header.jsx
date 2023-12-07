import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="section shadow-md z-50 bg-sky-950 fixed py-4 top-0">

      <div className="container flex justify-between items-center text-white">
        <h1 className='text-xl font-semibold text-white'>Noodels</h1>
        <nav>
          <ul className='flex gap-2 text-lg font-medium'>
            <li
              className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
              onClick={() => {
                navigate('/')
              }}>
              Home
            </li>
            <li
              className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
              onClick={() => {
                navigate('/contact')
              }}>
              Contact
            </li>
            <li
              className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
              onClick={() => {
                // setUserDetailOpen(!userDetailOpen)
              }}>
              User
            </li>
            <li
              className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 bg-amber-500 rounded-3xl hover:ring-white hover:ring-2`}
              onClick={() => {
                // setUserDetailOpen(!userDetailOpen)
              }}>
              Cart
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
