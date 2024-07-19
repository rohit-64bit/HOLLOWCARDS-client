import React from 'react'
import { Link } from 'react-router-dom'
import FImage from '../assets/footer-img.png'

const Footer = () => {

  const navData = [

    { title: 'quick links', links: ['home', 'products', 'account', 'cart', 'admin'] },
    { title: 'socials', links: ['facebook', 'twitter', 'instagram', 'youtube'] }

  ]

  return (
    <div className='bg-[#121619] pt-10 px-10 flex justify-between'>

      <div className='flex flex-col gap-5 uppercase pb-10'>

        <p className='text-white font-bold text-3xl'>
          HOLLOWCARDS
        </p>

        <div className='flex gap-10'>
          {
            navData.map((data, index) => (
              <div key={index}>
                <p className='text-white text'>
                  {data.title}
                </p>
                <div className='flex flex-col gap-2 mt-5 text-sm normal-case'>
                  {
                    data.links.map((item, index) => (
                      <Link to={`/${item}`} key={index} className='text-white opacity-70 hover:opacity-100 ease-in-out duration-300 transition-all'>
                        {
                          item.slice(0, 1).toUpperCase() + item.slice(1)
                        }
                      </Link>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>

      </div>

      <img src={FImage} className='w-[60%] 2xl:w-[40%] translate-x-20 -mt-36' alt="" />

    </div>
  )
}

export default Footer