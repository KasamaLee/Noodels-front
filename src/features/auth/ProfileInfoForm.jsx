import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Input from './FormInput'
import { validateProfile } from './auth-validator'
import InputErrorMessage from './InputErrorMessage'


export default function ProfileInfoForm({setIsOpenEditModal}) {

    const { authUser, updateProfileInfo } = useContext(AuthContext)
    const [error, setError] = useState({})

    const [input, setInput] = useState({
        email: authUser.email,
        mobile: authUser.mobile || '',
        userName: authUser.userName,
        address: authUser.address || '',
    })


    const handleEditProfile = (e) => {
        e.preventDefault();
        const validationError = validateProfile(input);

        if (validationError) {
            return setError(validationError);
        }
        setError({});
        updateProfileInfo(input)
        setIsOpenEditModal(false)
    }

    return (
        <form onSubmit={handleEditProfile} className="flex flex-col gap-4 w-[500px]" >
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
                    {error.userName && <InputErrorMessage message={error.userName} />}
                </div>
                <div className='w-full'>
                    <label className='text-xs text-gray-500'>Mobile number</label>
                    <Input
                        type='text'
                        placeholder=""
                        value={input.mobile}
                        maxlength={10}
                        onChange={e => setInput({ ...input, mobile: e.target.value })}
                        hasError={error.mobile}
                    />
                    {error.mobile && <InputErrorMessage message={error.mobile} />}
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
                <div className='w-full'>
                    <label className='text-xs text-gray-500'>address</label>
                    <Input
                        type="address"
                        value={input.address}
                        onChange={e => setInput({ ...input, address: e.target.value })}
                        hasError={error.address}
                    />
                    {error.address && <InputErrorMessage message={error.address} />}
                </div>
            </div>

            <button className='mx-auto mt-4 w-40 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-xl font-semibold flex justify-center items-center gap-2 hover:gap-4'>
                Update
            </button>

        </form>
    )
}
