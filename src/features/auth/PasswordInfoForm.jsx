import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useState } from 'react'
import { validatePassword } from './auth-validator'
import InputErrorMessage from './InputErrorMessage'
import Input from './FormInput'

export default function PasswordInfoForm({ setIsOpenPasswordModal }) {

    const { authUser, updatePassword } = useContext(AuthContext)
    const [error, setError] = useState({})

    const [input, setInput] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleEditPassword = (e) => {
        e.preventDefault();
        const validationError = validatePassword(input);

        if (validationError) {
            return setError(validationError);
        }
        setError({});
        updatePassword(input)
        setIsOpenPasswordModal(false)
    }

    return (
        <form onSubmit={handleEditPassword} className="flex flex-col gap-4 w-[500px]" >
            <div className="flex gap-2 justify-between">
                <div className='w-full'>
                    <Input
                        type="text"
                        placeholder="old password"
                        value={input.password}
                        onChange={e => setInput({ ...input, oldPassword: e.target.value })}
                        hasError={error.password}
                    />
                    {error.oldPassword && <InputErrorMessage message={error.oldPassword} />}
                </div>
            </div>

            <div className="flex gap-2 justify-between">
                <div className='w-full'>
                    <Input
                        type="text"
                        placeholder="new password"
                        value={input.password}
                        onChange={e => setInput({ ...input, newPassword: e.target.value })}
                        hasError={error.password}
                    />
                    {error.newPassword && <InputErrorMessage message={error.newPassword} />}
                </div>

                <div className='w-full'>
                    <Input
                        type="text"
                        placeholder="confirm new password"
                        value={input.confirmPassword}
                        onChange={e => setInput({ ...input, confirmPassword: e.target.value })}
                        hasError={error.confirmPassword}
                    />
                    {error.confirmPassword && <InputErrorMessage message={error.confirmPassword} />}
                </div>
            </div>

            <button className='mx-auto mt-4 w-40 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-xl font-semibold flex justify-center items-center gap-2 hover:gap-4'>
                Update
            </button>

        </form>
    )
}
