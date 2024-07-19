import React, { useContext, useEffect, useState } from 'react'
import { SERVER_URL } from '../services/Helpers'
import { useNavigate } from 'react-router-dom'
import MainContext from '../contexts/MainContext'

const Authenticate = () => {

    const {
        fetchUserPofile,
        userProfile,
    } = useContext(MainContext)

    const navigate = useNavigate()

    const [formType, setFormType] = useState("login")

    const sesssionToken = localStorage.getItem('auth-token')

    const [formData, setFormData] = useState({
        email: '',
        name: sesssionToken ? userProfile?.name : '',
        password: '',
        address: sesssionToken ? userProfile?.address : '',
        phone: sesssionToken ? userProfile?.phone : ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {

        fetch(`${SERVER_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    localStorage.setItem('auth-token', json.token)
                    navigate('/')
                    setFormData({
                        email: '',
                        password: '',
                        name: '',
                        address: '',
                        phone: ''
                    })
                } else {
                    console.log(json.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    const handleRegister = (e) => {

        fetch(`${SERVER_URL}users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    // toast.success(json.message)
                    setFormData({
                        email: '',
                        password: '',
                        name: '',
                        address: '',
                        phone: ''
                    })
                } else {
                    console.log(json.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    const handleAdminLogin = (e) => {

        fetch(`${SERVER_URL}users/admin-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    localStorage.setItem('admin-auth-token', json.token)
                    setFormData({
                        email: '',
                        password: '',
                        name: '',
                        address: '',
                        phone: ''
                    })
                    navigate('/admin')
                } else {
                    console.log(json.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        if (formType === 'login') {
            handleLogin()
        } else if (formType === 'register') {
            handleRegister()
        } else {
            handleAdminLogin()
        }

    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        navigate('/')
    }

    const handleUpdate = (e) => {

        e.preventDefault()

        fetch(`${SERVER_URL}users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': sesssionToken
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    // toast.success(json.message)
                    setFormData({
                        email: '',
                        password: '',
                        name: '',
                        address: '',
                        phone: ''
                    })
                } else {
                    console.log(json.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {

        fetchUserPofile()

    }, [sesssionToken])

    return (
        <div className='flex justify-center items-center h-[70vh] '>

            {!sesssionToken ?
                <form method='POST' onSubmit={handleSubmit} className='bg-[#C4C4C40F] backdrop-blur-sm p-10 outline outline-1 outline-[#c4c4c4d8] flex flex-col gap-5 rounded-lg items-center'>

                    <p className='text-lg text-white font-bold'>
                        {
                            formType === 'login' ? 'Login' : formType === 'register' ? 'Register' : 'Admin Login'
                        }
                    </p>

                    <input onChange={handleChange} value={formData.email} name='email' type="email" placeholder='Email' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white' />

                    <input onChange={handleChange} value={formData.password} name='password' type="password" placeholder='Password' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white' />

                    {
                        formType === 'register' && (
                            <>
                                <input onChange={handleChange} value={formData.name} name='name' type="text" placeholder='Name' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white' />

                                <input onChange={handleChange} value={formData.address} name='address' type="text" placeholder='Address' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white' />

                                <input onChange={handleChange} value={formData.phone} name='phone' type="text" placeholder='Phone' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white' />

                            </>
                        )
                    }


                    <button className='bg-[#D17724] text-white p-3 rounded-lg w-full'>
                        {
                            formType === 'login' ? 'Login' : formType === 'register' ? 'Register' : 'Admin Login'
                        }
                    </button>

                    {
                        formType === 'login' ?
                            <button
                                type='button'
                                onClick={() => setFormType('register')}
                                className='text-center text-white opacity-50 hover:opacity-100 duration-300 w-max'>
                                Create an account
                            </button>
                            :
                            <button
                                type='button'
                                onClick={() => setFormType('login')}
                                className='text-center text-white opacity-50 hover:opacity-100 duration-300 w-max'>
                                Login
                            </button>

                    }

                    <button
                        onClick={() => setFormType('admin')}
                        type='button' className='text-center text-white opacity-50 hover:opacity-100 duration-300 w-max'>
                        Admin Login
                    </button>

                </form>
                :
                <div className='h-full flex flex-col w-[70%] py-10'>

                    <div className='flex w-full justify-between items-center'>

                        <p className='text-white text-lg font-bold'>Edit your account</p>
                        <button className='bg-[#D17724] text-white px-5 py-2 rounded-lg ' onClick={handleLogout}>Logout</button>

                    </div>

                    <form action=""
                        method='POST'
                        onSubmit={handleUpdate}
                        className='bg-[#C4C4C40F] backdrop-blur-sm p-10 outline outline-1 outline-[#c4c4c4d8] flex flex-col gap-5 rounded-lg items-center mt-10'
                    >


                        <input onChange={handleChange} value={formData.name} name='name' type="text" placeholder='Name' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                        <input onChange={handleChange} value={formData.address} name='address' type="text" placeholder='Address' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                        <input onChange={handleChange} value={formData.phone} name='phone' type="text" placeholder='Phone' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                        <input onChange={handleChange} value={formData.password} name='password' type="password" placeholder='Enter New Password' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                        <button className='outline outline-2 hover:bg-white hover:bg-opacity-15 bg-none outline-[#D17724] text-white py-3 px-5 rounded-full w-max transition-all duration-300 ease-in-out'>
                            Update Profile
                        </button>

                    </form>

                </div>
            }

        </div>
    )
}

export default Authenticate