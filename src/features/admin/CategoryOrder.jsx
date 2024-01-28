import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../contexts/AdminContext'

export default function CategoryOrder({ name }) {

    const { selectedCategory, setSelectedCategory } = useContext(AdminContext)


    return (
        <div
            className={`${selectedCategory === name ? 'bg-amber-300' : 'bg-gray-300'} hover:bg-amber-200 w-fit px-3 py-1 rounded-lg cursor-pointer flex gap-3`}
            onClick={() => {
                setSelectedCategory(name)
                
                // if (name === 'Delivered') {
                //     // const completedOrders = ordersData.filter((eachOrder) => (eachOrder.completed))
                //     setFilteredOrders(completedOrders)
                // } else if ((name === 'Undelivered')) {
                //     // const uncompletedOrders = ordersData.filter((eachOrder) => (!eachOrder.completed))
                //     setFilteredOrders(uncompletedOrders)
                // } else {
                //     setFilteredOrders()
                // }
            }}
        >
            {name}
        </div>
    )
}
