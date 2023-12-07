import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Joi from 'joi';
import Input from './FormInput';
import InputErrorMessage from './InputErrorMessage'
import { useState } from 'react';

export default function RegisterForm({ setIsRegister, onCloseModal }) {

	const registerSchema = Joi.object({
		userName: Joi.string().trim().required(),
		email: Joi.string().trim().email({
			tlds: { allow: ['com', 'net'] }
		}),
		password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).trim().required(),
		confirmPassword: Joi.string().valid(Joi.ref('password'))
			.trim()
			.required()
			.strip(),
		mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
		address: Joi.string().trim()
	})

	const validateRegister = (input) => {
		const { error } = registerSchema.validate(input, { abortEarly: false });

		if (error) {
			const result = error.details.reduce((acc, elem) => {
				const { message, path } = elem;
				acc[path[0]] = message;
				return acc;
			}, {});
			return result;
		}
	}

	const { register } = useContext(AuthContext)
	const [error, setError] = useState({})
	const [input, setInput] = useState({
		userName: '',
		mobile: '',
		email: '',
		password: '',
		confirmPassword: '',
	})


	const handleRegisterForm = (e) => {
		e.preventDefault();
		const validationError = validateRegister(input);

		// ถ้า validationError มีค่าให้ setError()
		if (validationError) {
			return setError(validationError);
		}

		register(input, onCloseModal)
	}


	return (
		<form onSubmit={handleRegisterForm} className="flex flex-col gap-4 w-[500px]">
			
			<h4 className="text-xl text-gray-600">Register</h4 >

			<div className="flex gap-2 justify-between">
				<div className='w-full'>
					<label className='text-xs text-gray-500'>User name</label>
					<Input
						type='text'
						placeholder=""
						value={input.userName}
						onChange={e => setInput({ ...input, userName: e.target.value })}
						hasError={error.userName}
					/>
					{error.firstName && <InputErrorMessage message={error.userName} />}
				</div>
				<div className='w-full'>
					<label className='text-xs text-gray-500'>Mobile number</label>
					<Input
						type='text'
						placeholder=""
						value={input.mobile}
						onChange={e => setInput({ ...input, mobile: e.target.value })}
						hasError={error.mobile}
					/>
					{error.lastName && <InputErrorMessage message={error.mobile} />}
				</div>
			</div>

			<div className="flex gap-2 justify-between">
				<div className='w-full'>
					<label className='text-xs text-gray-500'>Email address</label>
					<Input
						type="email"
						value={input.email}
						onChange={e => setInput({ ...input, email: e.target.value })}
						hasError={error.email}
					/>
					{error.email && <InputErrorMessage message={error.email} />}
				</div>
			</div>

			<div className="flex gap-2 justify-between">
				<div className='w-full text-gray-500'>
					<label className='text-xs'>Password</label>
					<Input
						type="password"
						placeholder=""
						value={input.password}
						onChange={e => setInput({ ...input, password: e.target.value })}
						hasError={error.password}
					/>
					{error.password && <InputErrorMessage message={error.password} />}
				</div>

				<div className='w-full text-gray-500'>
					<label className='text-xs'>Confirm password</label>
					<Input
						type="password"
						placeholder=""
						value={input.confirmPassword}
						onChange={e => setInput({ ...input, confirmPassword: e.target.value })}
						hasError={error.confirmPassword}
					/>
					{error.confirmPassword && <InputErrorMessage message={error.confirmPassword} />}
				</div>

			</div>

			<button className='mx-auto mt-4 w-40 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-xl font-semibold flex justify-center items-center gap-2 hover:gap-4'>
				Register
			</button>

			<div className="flex items-center justify-center w-full">
				<hr className="w-64 h-px my-8 bg-gray-300 border-0" />
				<span className="absolute px-3 text-gray-500 -translate-x-1/2 bg-white left-1/2">
					or
				</span>
			</div>

			<div className="text-center">
				<span className="text-gray-500">Already have an account?</span>
				<span
					className="cursor-pointer underline text-amber-500 ml-2"
					onClick={() => setIsRegister(false)}
				>
					Login
				</span>
			</div>

		</form >
	)
}
