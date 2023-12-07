import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Input from './FormInput';
import { useState } from 'react';

export default function LoginForm({ setIsRegister, onCloseModal }) {

  const { login } = useContext(AuthContext);

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleLoginForm = (e) => {
    e.preventDefault();
    login(input, onCloseModal)
  }

  return (
    <>
      <form onSubmit={handleLoginForm} className="flex flex-col gap-4 m-auto w-[500px] min-w-[240px]">

        <h6 className="text-lg text-gray-600">Welcome back!</h6 >

        <div>
          <label className='text-xs text-gray-500'>Email address</label>
          <Input
            type="email"
            placeholder=""
            value={input.email}
            onChange={e => setInput({ ...input, email: e.target.value })}
          />
        </div>
        
        <div>
          <label className='text-xs text-gray-500'>Password</label>
          <Input
            type="password"
            placeholder=""
            value={input.password}
            onChange={e => setInput({ ...input, password: e.target.value })}
          />
        </div>

        <button className='mx-auto mt-4 w-40 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-xl font-semibold flex justify-center items-center gap-2 hover:gap-4'>
          Login
        </button>
      </form >

      <div className="flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-300 border-0" />
        <span className="absolute px-3 text-gray-500 -translate-x-1/2 bg-white left-1/2">
          or
        </span>
      </div>

      <div className="text-center">
        <span className="text-gray-500">Don’t have an account?</span>
        <span
          className="cursor-pointer underline text-amber-500 ml-2"
          onClick={() => setIsRegister(true)}
        >
          Register
        </span>
      </div>
    </>
  )
}
