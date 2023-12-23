import axios from '../config/axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { addAccessToken, getAccessToken, removeAccessToken } from '../utils/local-storage'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true);
    const [authUser, setAuthUser] = useState();


    useEffect(() => {
        if (getAccessToken()) {
            getMe();
        } else {
            setInitialLoading(false);
        }
    }, [])

    const getMe = async () => {
        try {
            const response = await axios.get('/auth/me')
            setAuthUser(response.data.user);

            // {
            //     id: 1,
            //     userName: 'John',
            //     email: 'John@gmail.com',
            //     mobile: '0901234567',
            //     address: null,
            //     role: 'USER'
            // }

        } catch (err) {
            console.log(err)
        } finally {
            setInitialLoading(false);
        }
    }

    const onGoogleSuccess = async (res, onCloseModal) => {
        // console.log(res.profileObj)
        const data = {
            userName: res.profileObj.givenName,
            email: res.profileObj.email,
            googleId: res.profileObj.googleId,
        }
        try {
            const response = await axios.post('/auth/googleLogin', data)
            // console.log(response)

            const token = response.data.accessToken;

            // เอา token ไปแปะใส่ localStorage
            addAccessToken(token);
            setAuthUser(response.data.user)
            onCloseModal();

        } catch (err) {
            console.log(err)
        }
    }

    const onGoogleFailure = (res) => {
        alert('Log in with Google Failed')
        console.log('failed', res)
    }

    const register = async (registerData, onCloseModal) => {
        const response = await axios.post('/auth/register', registerData);

        const token = response.data.accessToken;

        // เอา token ไปแปะใส่ localStorage
        addAccessToken(token);
        setAuthUser(response.data.user)
        onCloseModal();
    }

    const login = async (loginData, onCloseModal) => {
        try {

            const response = await axios.post('/auth/login', loginData);

            const token = response.data.accessToken;

            // เอา token ไปแปะใส่ localStorage
            addAccessToken(token);
            setAuthUser(response.data.user)
            onCloseModal();

        } catch (err) {
            console.log(err)
        }
    }

    const logout = () => {
        removeAccessToken()
        setAuthUser(null);

    }

    // console.log(authUser)

    return (
        <AuthContext.Provider
            value={{
                isOpenLoginModal, setIsOpenLoginModal,
                initialLoading,
                register,
                login,
                logout,
                authUser,
                onGoogleSuccess, onGoogleFailure
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


// register success :
// {
//     "user": {
//         "id": 1,
//         "userName": "John",
//         "email": "John@gmail.com",
//         "mobile": "0901234567",
//         "address": null,
//         "role": "USER"
//     },
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzAxOTY2OTExLCJleHAiOjE3MDI1NzE3MTF9.ODGjUeFZm2XwmU6F5QdtBWrsMj84C5FkTcoVcSz7Ku4"
// }