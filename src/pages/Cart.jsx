import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../contexts/MainContext'
import { SERVER_URL, STRIPE_PUBLISHABLE_KEY } from '../services/Helpers'
import { loadStripe } from '@stripe/stripe-js'
import { RiDeleteBin5Line } from "react-icons/ri";

const Item = ({ data }) => {

    const {
        fetchCartData
    } = useContext(MainContext)

    const token = localStorage.getItem('auth-token')

    const [quantity, setQuantity] = useState(data?.quantity)



    const handleRemove = () => {

        fetch(`${SERVER_URL}cart/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                productID: data.productID
            })
        })
            .then(res => res.json())
            .then(json => {
                fetchCartData()
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className='bg-[#C4C4C40F] backdrop-blur-sm p-5 outline outline-1 outline-[#c4c4c4d8] flex justify-between gap-5 rounded-lg w-full'>
            <div className="flex gap-5">
                <img src={data?.image[0]} alt="" className='w-32 aspect-square rounded-md' />
                <div className='text-white font-bold text-lg flex flex-col'>
                    <p>
                        {data?.name}
                    </p>
                    <p className=''>
                        x {data?.quantity}
                    </p>
                </div>
            </div>

            <div className='flex flex-col justify-between'>

                <p className='text-white'>
                    $ {data?.price}
                </p>
                <button
                    className='bg-[#D17724] text-white p-3 rounded-lg w-full'
                    onClick={handleRemove}
                >
                    <RiDeleteBin5Line />
                </button>
            </div>

        </div>
    )
}

const Cart = () => {

    const token = localStorage.getItem('auth-token')

    const {
        fetchUserPofile,
        userProfile,
        cartData,
        fetchCartData
    } = useContext(MainContext)

    const handleCheckout = async () => {

        const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)

        const response = await fetch(`${SERVER_URL}cart/handle-payment-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })

        const session = await response.json()

        console.log(session)

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })

        console.log(result)

        if (result.error) {
            console.log(result.error.message)
        }

    }

    useEffect(() => {
        fetchCartData()
    }, [])

    return (
        <div className='p-10'>

            <p className='
                text-3xl
                font-bold
                text-white
                heading
            '>
                <span className='text-[#F28929]'>C</span>ART
            </p>

            <div className='flex items-center justify-between mt-10 outline outline-1 outline-white bg-white bg-opacity-5 backdrop-blur-md px-10 py-5 rounded-3xl'>
                <p className='text-white text-xl'>
                    Total: $ {
                        cartData?.reduce((acc, item) => acc + (item.price * item.quantity), 0)
                    }
                </p>

                <button
                    disabled={cartData?.length === 0}
                    className='outline outline-2 hover:bg-white hover:bg-opacity-15 bg-none outline-[#D17724] text-white py-3 px-5 rounded-full w-max transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50'
                    onClick={handleCheckout}
                >
                    Checkout
                </button>

            </div>

            <div className='flex gap-5 mt-10'>
                {
                    cartData?.map((item, i) => (
                        <Item key={i} data={item} />
                    ))
                }
            </div>

        </div>
    )
}

export default Cart