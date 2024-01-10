import React from 'react'
import CatNotFound from '../components/CatNotFound'
import { useNavigate } from 'react-router-dom'

export default function NotfoundPage() {

  const navigate = useNavigate()

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-10'>
      <CatNotFound />
      <div className='flex flex-col justify-center items-center gap-6'>
        <h2 className='text-6xl text-center'>404</h2>
        <h4 className='text-3xl text-center'>Page not found</h4>
        <button
          className='ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-lg font-semibold'
          onClick={() => navigate('/')}
        >
          back to homepage
        </button>
      </div>
    </div>
  )
}
