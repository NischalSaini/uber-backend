import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setcaptainData] = useState({})
  
    React.useEffect(() => {
      if (captainData.email && captainData.password) {
        console.log(captainData);
      }
    }, [captainData]);
  
    const submitHandler = (e)=>{
      e.preventDefault();
      setcaptainData({
        email: email,
        password: password
      });
      setEmail('');
      setPassword('');
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-20 mb-3' src="/vendor.png" alt="Uber logo"/>
          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>

            <input 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium'>Enter Password</h3>

            <input 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            />

            <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
            >Login
            </button>

          </form> 
          <p className='text-center'>Join a fleet <Link to='/captain-signup' className='text-blue-600'>Register as a captain</Link></p>
        </div>
        <div> 
          <Link to='/login' className='bg-[#e28a1e] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
            Sign In as User
          </Link>
        </div>
    </div>
  )
}

export default CaptainLogin
