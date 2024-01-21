import axios from '../config/axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import OrderList from '../features/order/OrderList'


export default function OrderPage() {

  const [orderData, setOrderData] = useState()

  useEffect(() => {
    fetchOrder()
  }, [])

  const fetchOrder = async () => {
    const response = await axios.get('/order/get')
    setOrderData(response.data.order)
  }

  // console.log(orderData)

  return (
    <section className='section py-28'>
      <div className='container flex flex-col items-center justify-center gap-8'>
        <h4 className='text-3xl'>Your order history</h4>

        {orderData?.reverse().map(eachOrder => {
          return (
            <OrderList
              key={uuidv4()}
              id={eachOrder.id}
              orderDate={eachOrder.orderDate}
              totalPrice={eachOrder.totalPrice}
              orderItem={eachOrder.OrderItem}
              status={eachOrder.payment.status}
            />
          )
        })}
      </div>
    </section>
  )
}
