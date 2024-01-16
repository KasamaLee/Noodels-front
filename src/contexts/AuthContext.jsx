import axios from '../config/axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { addAccessToken, getAccessToken, removeAccessToken } from '../utils/local-storage'
import { gapi } from "gapi-script";
import { toast } from 'react-toastify';


export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true);
    const [authUser, setAuthUser] = useState();

    const clientId = "572207410517-5je8gdql4jqq4stlmr2sudgs92bmabtu.apps.googleusercontent.com"


    useEffect(() => {
        if (getAccessToken()) {
            getMe();
        } else {
            setInitialLoading(false);
        }

        // initialize Google API client
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
        // load Google API client for auth service
        gapi.load("client:auth2", initClient)
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
        try {
            // console.log(res.profileObj)
            const data = {
                userName: res.profileObj.givenName,
                email: res.profileObj.email,
                googleId: res.profileObj.googleId,
            }

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
        toast('Log in with Google Failed')
        // console.log('failed', res)
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
            // console.log(err)
            toast.error('email or password incorrect!')
        }
    }

    const logout = () => {
        removeAccessToken()
        setAuthUser(null);
    }

    const updateProfileInfo = async (input) => {
        try {
            const response = await axios.patch('/auth/update/profile', input)
            // console.log(response)
            if (response.status === 200) {
                toast.success('profile info is updated !')
                getMe();
            }
        } catch (err) {
            // console.log(err)
            toast.error("can't update profile info")
        }
    }

    const updatePassword = async (input) => {
        try {
            const response = await axios.patch('/auth/update/password', input)
            // console.log(response)
            if (response.status === 200) {
                toast.success('password is changed!')
                getMe();
            }
        } catch (err) {
            // console.log(err)
            toast.error('old password incorrect!')
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isOpenLoginModal, setIsOpenLoginModal,
                initialLoading, setInitialLoading,
                register,
                login,
                logout,
                authUser,
                clientId,
                onGoogleSuccess, onGoogleFailure,
                updateProfileInfo,
                updatePassword
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