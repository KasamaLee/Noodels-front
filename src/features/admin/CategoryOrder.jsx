import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../contexts/AdminContext'

export default function CategoryOrder({ name }) {

    const {
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
    } = useContext(AdminContext)

    return (
        <div
            className={`${selectedCategory === name ? 'bg-amber-300' : 'bg-gray-300'} hover:bg-amber-200 w-fit px-3 py-1 rounded-lg cursor-pointer flex gap-3`}
            onClick={() => {
                setSelectedCategory(name)

                if (name === 'Delivered') {
                    setShownOrders(completedOrders)
                } else if ((name === 'Undelivered')) {
                    setShownOrders(uncompletedOrders)
                } else {
                    setShownOrders(ordersData)
                }
            }}
        >
            {name}
        </div>
    )
}
