import React, { useState } from 'react'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL, SERVER_URL } from '../../services/Helpers'

const AdminHome = () => {

    const adminToken = localStorage.getItem('admin-auth-token')

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: []
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleImage = (e) => {

        console.log(e.target.files)

        setFormData({
            ...formData,
            image: e.target.files
        })

    }

    const handleCreateNew = (e) => {
        e.preventDefault();

        const imageUploadPromises = [];

        for (let i = 0; i < formData?.image?.length; i++) {
            const imageFormData = new FormData();
            imageFormData.append('file', formData.image[i]);
            imageFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            imageFormData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

            const fetchPromise = fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: imageFormData
            })
                .then(res => res.json())
                .then(json => json.url) // Directly get the URL after converting response to JSON
                .catch(err => console.log(err));

            imageUploadPromises.push(fetchPromise);
        }

        Promise.all(imageUploadPromises).then(urls => {
            // All images are uploaded, and 'urls' contains their URLs
            fetch(`${SERVER_URL}products/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-token': adminToken // Send the admin token
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: formData.price,
                    stock: formData.stock,
                    description: formData.description,
                    image: urls // Use the collected URLs
                })
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                })
                .catch(err => console.log(err));
        });
    }

    return (
        <>
            <div className='flex flex-col gap-5 p-10'>

                <h1 className='text-xl text-white'>Admin Home</h1>

                <form
                    onSubmit={handleCreateNew}
                    method='POST'
                    className='bg-[#C4C4C40F] backdrop-blur-sm p-10 outline outline-1 outline-[#c4c4c4d8] flex flex-col gap-5 rounded-lg items-center'>

                    <p className='text-lg text-white font-bold'>
                        Add New Card
                    </p>

                    <input onChange={handleChange} value={formData.name} name='name' type="text" placeholder='Name of Card' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                    <input onChange={handleChange} value={formData.price} name='price' type="number" placeholder='Price of Card' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                    <input onChange={handleChange} value={formData.stock} name='stock' type="number" placeholder='Stock of Card' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                    <textarea onChange={handleChange} value={formData.description} name='description' placeholder='Description of Card' className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                    <input onChange={handleImage} type="file" multiple className='p-3 rounded-lg bg-[#ffffff28] outline-none text-white w-full' />

                    <button className='bg-[#D17724] text-white p-3 rounded-lg w-full'>
                        Add Card
                    </button>

                </form>

            </div>
        </>
    )
}

export default AdminHome