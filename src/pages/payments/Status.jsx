import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SERVER_URL } from './../../services/Helpers';
import MainContext from '../../contexts/MainContext';

const Status = () => {

    const token = localStorage.getItem('auth-token')

    const {
        fetchCartData
    } = useContext(MainContext)

    const params = useParams()
    const navigate = useNavigate()

    const query = new URLSearchParams(window.location.search)

    const sessionID = query.get('session_id')

    const [orderID, setOrderID] = useState('')

    const handlePaymentSuccess = () => {

        setOrderID('Loading...')

        fetch(`${SERVER_URL}cart/handle-payment-success`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                session_id: sessionID
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log('Order successful')
                    setOrderID(data.orderID)
                    fetchCartData()
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    useEffect(() => {
        handlePaymentSuccess()
    }, [])


    return (
        <div
            className='flex items-center justify-center h-[75vh]'
        >

            <div className='bg-[#C4C4C40F] backdrop-blur-sm p-10 outline outline-1 outline-[#c4c4c4d8] flex flex-col gap-5 rounded-lg items-center'>
                <h1 className='text-white text-2xl'>
                    {
                        params.status === 'success' ? 'Payment Successful' : 'Payment Failed'
                    }
                </h1>
                {
                    params.status === 'success' &&
                    <p className='text-white'>
                        Order ID: {orderID}
                    </p>}
                <button
                    className='bg-[#D17724] text-white p-3 rounded-lg w-full'
                    onClick={() => navigate('/products')}
                >
                    Continue Shopping
                </button>
            </div>

        </div>
    )
}

export default Status