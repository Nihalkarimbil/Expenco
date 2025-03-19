import React from 'react'

function Register() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='w-96 bg-white p-6 rounded-lg shadow-lg'>
            <h1 className='text-3xl font-bold text-center'>Register</h1>
            <form className='mt-6'>
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-gray-600'>Username</label>
                    <input type='text' id='username' name='username' placeholder='Enter your username' className='w-full p-2 border border-gray-300 rounded
                    mt-1' />
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-600'>Email</label>
                    <input type='text' id='email' name='email' placeholder='Enter your email' className='w-full p-2 border border-gray-300 rounded
                    mt-1' />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-600'>Password</label>
                    <input type='text' id='email' name='email' placeholder='Enter your password' className='w-full p-2 border border-gray-300 rounded
                    mt-1' />
                </div>
            </form>

        </div>
      
    </div>
  )
}

export default Register
