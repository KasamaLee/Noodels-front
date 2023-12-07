import React from 'react'
import { useState } from 'react'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function LoginOrRegister({ onCloseModal }) {

    const [isRegister, setIsRegister] = useState(false);

    return (
        <>
            {isRegister ? (
                <RegisterForm setIsRegister={setIsRegister} onCloseModal={onCloseModal} />
            ) : (
                <LoginForm setIsRegister={setIsRegister} onCloseModal={onCloseModal} />
            )}
        </>
    )
}
