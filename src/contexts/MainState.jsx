import { useState } from 'react';
import MainContext from './MainContext';
import { SERVER_URL } from '../services/Helpers';

const MainState = ({ children }) => {

    const token = localStorage.getItem('auth-token');

    const adminToken = localStorage.getItem('admin-auth-token');

    const [userProfile, setUserProfile] = useState({})

    const fetchUserPofile = () => {

        fetch(`${SERVER_URL}users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
            .then(res => res.json())
            .then(json => {
                setUserProfile(json);
            })
            .catch(err => {
                console.log(err)
            })

    }

    const [products, setProducts] = useState([])

    const fetchProducts = () => {

        fetch(`${SERVER_URL}products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                setProducts(json.data);
            })
            .catch(err => {
                console.log(err)
            })

    }

    const [cartData, setCartData] = useState([])

    const fetchCartData = () => {

        fetch(`${SERVER_URL}cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
            .then(res => res.json())
            .then(json => {
                setCartData(json.data);
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <MainContext.Provider value={{

            fetchUserPofile,
            userProfile,
            products,
            fetchProducts,
            cartData,
            fetchCartData

        }}>
            {children}
        </MainContext.Provider>
    );

}

export default MainState;