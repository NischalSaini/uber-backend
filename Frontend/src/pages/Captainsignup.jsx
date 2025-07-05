import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';  

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [captainData, setcaptainData] = useState(''); 
  
    const submitHandler = (e) => {
      e.preventDefault();
      setcaptainData({
        fullname:{
          firstname: firstname,
          lastname: lastname
        },
        email: email,
        password: password
      });

      console.log(captainData);
  
      setEmail('');
      setfirstname('');
      setlastname('');
      setPassword('');  
    }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="/vendor.png" alt="Uber logo"/>
          <form onSubmit={(e) =>{
            submitHandler(e);
          }}>
          <h3 className='text-base font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-6' >
            <input 
            required
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Enter your First name'
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
            />
            <input 
            required
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Enter your Last name'
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            />
          </div>

            <h3 className='text-base font-medium mb-2'>What's your email</h3>
            <input 
            required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <h3 className='text-base font-medium'>Enter Password</h3>

            <input 
            required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
            >Login
            </button>

          </form> 
          <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>login here</Link></p>
        </div>
        <div> 
          <p className='text-[12px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Serice apply</span></p>
        </div>
    </div>
    </div>
  )
}

export default CaptainSignup
