import { v4 as uuidv4 } from 'uuid';
import OrderItem from './OrderItem';


export default function OrderList({ id, orderDate, totalPrice, orderItem, status }) {

    let date = orderDate.split('T')[0].split('-').reverse().join('/')

    console.log(orderItem)
    return (
        <div className='border-dashed border-2 border-gray-400 bg-gray-100 rounded-2xl w-full py-10 flex flex-col items-center justify-center gap-4'>
            {orderItem?.map(eachItem => {
                return (
                    <OrderItem
                        key={uuidv4()}
                        id={eachItem.id}
                        imageUrl={eachItem.product.imageUrl}
                        name={eachItem.product.name}
                        totalPrice={eachItem.price}
                        quantity={eachItem.quantity}
                    />
                )
            })}

            <div className='w-2/3 flex justify-between items-baseline'>
                <p className=''>Order date: {date}</p>
                <p className='font-bold text-lg'>Total Price : {totalPrice}</p>
            </div>
            <p className='w-2/3 font-bold text-lg border-t border-gray-500 pt-2'>
                Your order status :
                <span className={`${status ? ('text-green-500') : ('text-amber-500')} ml-2`}>
                    {status ? ('Preparing your order') : ('Order Processing')}
                </span>
            </p>
        </div>
    )
}
