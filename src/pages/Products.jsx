import React, { useState, useEffect, useContext } from 'react'
import MainContext from '../contexts/MainContext'
import { SERVER_URL } from '../services/Helpers'
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Product = ({ data }) => {

    const {
        fetchUserPofile,
        fetchCartData
    } = useContext(MainContext)

    const navigate = useNavigate()

    const token = localStorage.getItem('auth-token')

    const [isExpanded, setIsExpanded] = useState(false)

    const handleAddToCart = () => {

        if (!token) {
            navigate('/account')
            return
        }

        fetch(`${SERVER_URL}cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                productID: data._id,
                quantity: 1
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
        <>
            <div className='hover:bg-[#C4C4C40F] hover:backdrop-blur-sm p-5 hover:outline hover:outline-1 hover:outline-[#c4c4c4d8] flex flex-col gap-5 rounded-lg transition-all ease-in-out duration-500'>

                <img src={
                    data?.image[0]
                } alt="" className='h-96 bg-white bg-opacity-20 rounded-md object-contain' />

                <div className='flex justify-between'>
                    <div className='flec flex-col justify-between'>

                        <p className='text-white text-lg'>
                            {data?.name}
                        </p>

                        {
                            data?.stock > 0 ?
                                <p className='text-white text-xs'>
                                    In Stock
                                </p>
                                :
                                <p className='text-white text-xs'>
                                    Out of Stock
                                </p>
                        }

                    </div>
                    <p className='text-[#F28929] font-medium text-lg'>
                        $ {data?.price}
                    </p>
                </div>

                {
                    isExpanded &&
                    <p className='text-white'>
                        {data?.description}
                    </p>
                }

                <div className='flex gap-5'>

                    <button
                        onClick={handleAddToCart}
                        className='outline outline-2 hover:bg-white hover:bg-opacity-15 bg-none outline-[#D17724] text-white p-3 rounded-full w-full transition-all duration-300 ease-in-out'>
                        Add to Cart
                    </button>

                    <button onClick={() => setIsExpanded(!isExpanded)} className='bg-white bg-opacity-15 text-white px-5 py-4 rounded-full'>
                        {
                            isExpanded ?
                                <FaRegEyeSlash />
                                : <FaRegEye />
                        }
                    </button>

                </div>

            </div>
        </>
    )

}

const Products = () => {

    const {
        fetchProducts,
        products
    } = useContext(MainContext)

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='p-10'>
            <p className='
                text-3xl
                font-bold
                text-white
                heading
            '>
                <span className='text-[#F28929]'>P</span>RODUCTS
            </p>
            <div className='mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>

                {
                    products?.map((data) => {
                        return <Product key={data._id} data={data} />
                    })
                }

            </div>
        </div>
    )
}

export default Products