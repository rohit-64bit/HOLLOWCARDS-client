import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import dragon from '../assets/dragon.svg'
import smoke from '../assets/smoke.svg'
import { delay, motion, useInView } from 'framer-motion'
import Harrow from '../assets/heroline.png'
import MainContext from '../contexts/MainContext';


const Header = () => {

    const {
        cartData,
        fetchCartData
    } = useContext(MainContext)

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const location = useLocation()

    const navItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Products',
            link: '/products'
        },
        {
            name: 'Account',
            link: '/account'
        }
    ]

    useEffect(() => {
        fetchCartData()
    }, [])

    return (

        <>
            <motion.div
                animate={{ height: location.pathname === '/' ? '85vh' : '15vh' }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className='flex flex-col h-max duration-300 transition-all ease-in-out outline outline-1 outline-[#c4c4c4d8] rounded-[33px] mx-10 backdrop-blur-sm bg-white bg-opacity-5 justify-between'>

                <div className={location.pathname === '/' ?
                    'flex justify-between items-center p-10 duration-300 ease-in-out transition-all' :
                    'flex justify-between items-center p-10 duration-300 ease-in-out transition-all'
                } >

                    <p className='text-2xl text-white font-bold'>
                        HOLLOWCARDS
                    </p>

                    <div className='flex gap-32 items-center z-20'>

                        <nav className='flex gap-10'>

                            {
                                navItems.map((items, i) => {
                                    return (
                                        <NavLink key={i} className={({ isActive }) => isActive ? 'text-[#F28929] duration-300 ease-in-out transition-all' : 'text-white hover:text-[#F28929] duration-300 ease-in-out transition-all'} to={items.link}>
                                            {items.name}
                                        </NavLink>
                                    )
                                })
                            }

                        </nav>

                        <div className='flex gap-5 text-white items-center'>

                            {/* <Link>
                                <FaHeart size={20} />
                            </Link> */}

                            <Link to={'/cart'} className='flex gap-2 items-center'>
                                <FaCartShopping size={20} />
                                <p className='text-white text-sm'>
                                    {
                                        cartData?.length
                                    }
                                </p>
                            </Link>

                        </div>

                    </div>

                </div>

                {
                    location.pathname === '/' && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                                className='flex justify-between items-center h-full p-10'>

                                <div className='flex flex-col gap-10 w-[38%] -mt-20'>

                                    <div className='uppercase text-white heading text-6xl'>
                                        <span className='text-[#F28929]'>W</span>elcome to
                                        <br /> Hollow cards !
                                    </div>

                                    <div className='text-[#B0B0B0] text-sm'>
                                        Step into a world where your favorite pokemon characters come to life through beautifully crafted collectible cards. At Hollowcards, we are passionate about bringing you the finest selection of pokemon and anime cards from the most beloved series. Whether you're a seasoned collector or just starting your journey, our diverse range of cards promises something for everyone.
                                    </div>

                                </div>

                                <div className='w-[62%] realtive flex justify-end'>

                                    <motion.img
                                        initial={{ opacity: 0, x: 1000, y: 0 }}
                                        animate={{ opacity: 1, x: 0, y: 20 }}
                                        transition={{ duration: 0.5, delay: 1.5, ease: 'easeInOut' }}
                                        src={dragon} className='w-[60%] z-10' alt="" />
                                    <motion.img
                                        initial={{ opacity: 0, x: 1000 }}
                                        animate={{
                                            opacity: 1, x: 150,
                                            animationDelay: { duration: 0.5, delay: 1, ease: 'easeInOut' }
                                        }}
                                        transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
                                        src={smoke} alt="" className='translate-x-32 absolute w-[60%]' />

                                </div>

                            </motion.div>
                        </>
                    )
                }



            </motion.div>
        </>
    )
}

export default Header