import React from 'react'
import Header from '../layouts/Header'

import Box from '../assets/box.png'
import Diamond from '../assets/diamond.png'
import Dispatch from '../assets/dispatch.png'

import Img1 from '../assets/sampleCards/1.jpg'
import Img2 from '../assets/sampleCards/2.jpg'
import Img3 from '../assets/sampleCards/3.jpg'
import Img4 from '../assets/sampleCards/4.jpg'
import { Link } from 'react-router-dom'

const Home = () => {

    const img = [
        Img1, Img2, Img3, Img4
    ]

    const data = [

        {
            title: 'Same day dispatch',
            description: 'All orders placed before 1:00 p.m. will be shipped the same day',
            icon: Dispatch
        },
        {
            title: 'High quality assurance',
            description: 'All orders placed before 1:00 p.m. will be shipped the same day',
            icon: Diamond
        },
        {
            title: 'Careful packaging',
            description: 'All orders placed before 1:00 p.m. will be shipped the same day',
            icon: Box
        },

    ]

    return (

        <>

            <div className='mt-52'>

                <div className='uppercase text-white heading text-5xl text-center'>
                    <span className='text-[#F28929]'>O</span>UR FEATURED CARDS
                </div>

                <div className='flex flex-col justify-center items-center'>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 p-10 items-center justify-center'>

                        {
                            img.map((items, i) => {
                                return (
                                    <img key={i} src={items} alt='card' className={i % 2 === 0 ? ' w-44 h-56 rounded-lg shadow-custom object-contain bg-white saturate-0 hover:saturate-100 duration-300 ease-in-out hover:scale-110' : ' w-44 h-56 rounded-lg shadow-custom object-contain mt-10 bg-white saturate-0 hover:saturate-100 duration-300 ease-in-out hover:scale-110'} />
                                )
                            })
                        }


                    </div>

                    <Link to='/products' className='mt-10 px-5 py-3 bg-[#D17724] text-white rounded-lg shadow-custom duration-300 ease-in-out transition-all hover:bg-[#D17724] hover:shadow-none'>
                        View all cards
                    </Link>

                </div>

            </div>

            <div className='mt-32 mb-10 p-10 border-t-1 border-t-[#ffffffc9] border-b-[#ffd7aa69] border-b-1 grid grid-flow-col gap-20 bg-[#C4C4C40F] backdrop-blur-sm'>

                {
                    data.map((items, i) => {
                        return (
                            <div key={i} className='flex flex-col gap-5 items-center text-white'>
                                <img src={items.icon} alt={items.title} className='w-20 h-20 p-5 rounded-full border shadow-custom' />
                                <div className='flex flex-col gap-3 items-center'>
                                    <p className='text-2xl font-bold'>{items.title}</p>
                                    <p className='text-[#B0B0B0] text-center text-sm'>{items.description}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

            <div className='mt-32 mb-10 p-10 border-t-1 border-t-[#ffffffc9] border-b-[#ffd7aa69] border-b-1 grid grid-flow-col gap-20 bg-[#C4C4C40F] backdrop-blur-sm'>

                <div className='text-center text-white '>
                    Coming Soon
                </div>

            </div>

        </>

    )
}

export default Home