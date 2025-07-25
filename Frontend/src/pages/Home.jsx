import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(/cab.png)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img className='w-16 ml-8' src="/vendor.png" alt="Uber logo"/>
            <div className='bg-white pb-7 py-4 px-4'>
              <h2 className='text-3xl font-bold'>Get started with Vendor</h2>
              <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
