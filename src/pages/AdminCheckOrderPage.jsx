import axios from '../config/axios'
import { useEffect } from "react"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { ToggleSwitch, Badge, Dropdown } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';

export default function AdminCheckOrderPage() {

    const [ordersData, setOrdersData] = useState()
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        fetchAllOrder()
    }, [])

    const fetchAllOrder = async () => {
        const response = await axios.get('/order/getAll')
        setOrdersData(response.data.order)
    }
    console.log(ordersData)

    const handlePaymentStatus = async (paymentId, status) => {
        try {
            const response = await axios.patch('/order/updateStatus', { paymentId, status })
            if (response.status === 200) {
                // console.log('fetch')
                fetchAllOrder()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className='section py-28'>
            <div className="flex flex-col gap-6">
                <h4 className='text-3xl text-center'>Order</h4>

                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-fit mx-auto text-center text-sm font-light">
                                <thead
                                    className="border-b bg-gray-700 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                    <tr>
                                        <th scope="col" className=" px-6 py-4">#</th>
                                        <th scope="col" className=" px-6 py-4">Username</th>
                                        <th scope="col" className=" px-6 py-4">e-mail</th>
                                        <th scope="col" className=" px-6 py-4">Date and Time</th>
                                        <th scope="col" className=" px-6 py-4">Product</th>
                                        <th scope="col" className=" px-6 py-4">Slip image</th>
                                        <th scope="col" className=" px-6 py-4">Payment status</th>
                                        <th scope="col" className=" px-6 py-4">Address</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {ordersData?.map(eachOrder => {
                                        return (
                                            <tr key={uuidv4()} className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap  px-6 py-4 font-medium">{eachOrder.id}</td>
                                                <td className="whitespace-nowrap  px-6 py-4">
                                                    <Badge href="#" size="sm" color="gray">{eachOrder.user.userName}</Badge>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">{eachOrder.user.email}</td>
                                                <td className="whitespace-nowrap  px-6 py-4">
                                                    <span>{eachOrder.orderDate.split('T')[0].split('-').reverse().join('/')} </span>
                                                    <span className='ml-2'>{eachOrder.orderDate.split('T')[1].slice(0, 5)}</span>
                                                </td>

                                                <td className="whitespace-nowrap p-4">
                                                    <Dropdown label="Product detail" dismissOnClick={false} color='gray'>
                                                        {eachOrder.OrderItem.map(((item, index) => {
                                                            return (
                                                                <Dropdown.Item key={index} className='py-4'>
                                                                    <div className='flex items-center gap-3'>
                                                                        <img src={item.product.imageUrl} alt="product" className='w-12 h-12 object-cover rounded-md border' />
                                                                        <p>{item.product.name} <span>&#215;</span> {item.quantity}</p>
                                                                    </div>
                                                                </Dropdown.Item>
                                                            )
                                                        }))}
                                                    </Dropdown>
                                                </td>

                                                <td className="whitespace-nowrap p-4">
                                                    <a href={eachOrder.payment.slipUrl} target='_blank' className='relative hover:opacity-60'>
                                                        <FontAwesomeIcon icon={faMagnifyingGlassPlus} size='xl' className='absolute top-1/3 -left-2 text-gray-500' />
                                                        <img src={eachOrder.payment.slipUrl} alt="slip" className='w-16 h-20 object-contain mx-auto' />
                                                    </a>
                                                </td>
                                                <td className="whitespace-nowrap p-4">
                                                    <div className='flex flex-col items-center gap-3'>
                                                        {eachOrder.payment.status ? (
                                                            <Badge size="sm" color="success">Accepted</Badge>
                                                        ) : (
                                                            <Badge size="sm" color="failure">Failed</Badge>
                                                        )}
                                                        <ToggleSwitch checked={eachOrder.payment.status} onChange={() => {
                                                            if (eachOrder?.payment.status) {
                                                                // setOrdersData(false)
                                                                handlePaymentStatus(eachOrder.payment.id, false)
                                                            } else {
                                                                // setOrdersData(true)
                                                                handlePaymentStatus(eachOrder.payment.id, true)
                                                            }
                                                        }} />
                                                    </div>
                                                </td>

                                                <td className=" px-6 py-4 w-64 ">
                                                    {eachOrder.user.address}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
