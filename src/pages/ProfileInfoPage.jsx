import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import ProfileInfoForm from '../features/auth/ProfileInfoForm'
import PasswordInfoForm from '../features/auth/PasswordInfoForm'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal'

export default function ProfileInfoPage() {

    const { authUser, setAuthUser } = useContext(AuthContext)
    console.log(authUser)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false)

    return (
        <section className='section py-28'>

            <div className='container flex flex-col gap-8 items-center'>
                <h4 className='text-3xl'>Your profile</h4>

                <div className='w-2/3 flex flex-col gap-8 p-16 rounded-2xl bg-white ring-4 ring-gray-500'>

                    <div className='grow flex justify-between'>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <span className='text-gray-400'>username</span>
                                <p>{authUser.userName}</p>
                            </div>

                            <div>
                                <span className='text-gray-400'>e-mail</span>
                                <p>{authUser.email}</p>
                            </div>

                            <div>
                                <span className='text-gray-400'>mobile</span>
                                <p>{authUser.mobile ? (authUser.mobile) : ('none')}</p>
                            </div>

                            <div>
                                <span className='text-gray-400'>address</span>
                                <p>{authUser.mobile ? (authUser.address) : ('none')}</p>
                            </div>
                        </div>

                        <div
                            className='cursor-pointer text-gray-500 hover:text-blue-500 active:text-blue-500 flex gap-2 h-fit'
                            onClick={() => { setIsOpenEditModal(true) }}
                        >
                            <span>แก้ไข</span>
                            <FontAwesomeIcon icon={faEdit} size='xl' />
                        </div>
                    </div>

                    {!authUser?.googleId &&
                        <div
                            className='grow flex flex-col gap-1'
                            onClick={() => setIsOpenPasswordModal(true)}
                        >
                            <span className='text-gray-400'>password</span>
                            <div className='flex gap-2 justify-between'>
                                <FontAwesomeIcon icon={faEyeSlash} size='lg' />
                                <div className='cursor-pointer text-gray-500 hover:text-blue-500 active:text-blue-500 flex gap-2'>
                                    <span>แก้ไข</span>
                                    <FontAwesomeIcon icon={faEdit} size='xl' />
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>

            <Modal isOpenModal={isOpenEditModal} onCloseModal={() => setIsOpenEditModal(false)}>
                <ProfileInfoForm setIsOpenEditModal={setIsOpenEditModal}></ProfileInfoForm>
            </Modal>

            <Modal isOpenModal={isOpenPasswordModal} onCloseModal={() => setIsOpenPasswordModal(false)}>
                <PasswordInfoForm setIsOpenPasswordModal={setIsOpenPasswordModal}></PasswordInfoForm>
            </Modal>
        </section>
    )
}
