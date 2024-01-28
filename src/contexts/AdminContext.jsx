import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import axios from '../config/axios'
import { Children } from 'react'


export const AdminContext = createContext()

export default function AdminContextProvider({ children }) {

    const [ordersData, setOrdersData] = useState()
    const [shownOrders, setShownOrders] = useState()
    const [completedOrders, setCompletedOrders] = useState()
    const [uncompletedOrders, setUncompletedOrders] = useState()
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All')


    useEffect(() => {
        if (selectedCategory === 'All') {
            setShownOrders(ordersData);
        }
        else if (selectedCategory === 'Delivered') {
            setShownOrders(completedOrders);
        } else if (selectedCategory === 'Undelivered') {
            setShownOrders(uncompletedOrders);
        }
    }, [selectedCategory, completedOrders, uncompletedOrders, ordersData])

    
    const fetchAllOrder = async () => {
        const response = await axios.get('/order/getAll')
        setOrdersData(response.data.order)
        // setShownOrders(response.data.order)
        handleFilteredOrders(response.data.order)
    }


    const handleFilteredOrders = (allOrders) => {
        let newCompletedOrders = []
        let newUncompletedOrders = []

        if (allOrders) {
            for (let eachOrder of allOrders) {
                if (eachOrder.completed) {
                    newCompletedOrders.push(eachOrder)
                } else {
                    newUncompletedOrders.push(eachOrder)
                }
            }
        }
        setCompletedOrders(newCompletedOrders);
        setUncompletedOrders(newUncompletedOrders)
    }


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


    const handleOrderCompleted = async (orderId, status) => {
        try {
            const response = await axios.patch('/order/updateOrderCompleted', { orderId, status })
            if (response.status === 200) {
                fetchAllOrder()

            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <AdminContext.Provider
            value={{
                ordersData, setOrdersData,
                shownOrders, setShownOrders,
                completedOrders, setCompletedOrders,
                uncompletedOrders, setUncompletedOrders,
                isCompleted, setIsCompleted,
                selectedCategory, setSelectedCategory,
                fetchAllOrder,
                handleFilteredOrders,
                handleOrderCompleted,
                handlePaymentStatus,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}
