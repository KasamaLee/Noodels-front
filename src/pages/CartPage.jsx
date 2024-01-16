import React from 'react'
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import CatNotFound from '../components/CatNotFound'
import CartItem from '../features/cart/CartItem';
import CartFooter from '../features/cart/CartFooter';
import { OrderContext } from '../contexts/OrderContext';
import { useEffect } from 'react';

export default function CartPage() {

	const { authUser } = useContext(AuthContext);
	const { cartData, sortedCartItems } = useContext(CartContext);
	const { selectedItems, setSelectedItems } = useContext(OrderContext);

	// console.log(cartData?.CartItem)
	// console.log(sortedCartItems)


    useEffect(() => {
        setSelectedItems([])
    },[])

	return (
		<section className='section py-28'>
			<div className='container flex flex-col items-center gap-8'>

				{authUser ? (
					<>
						<h4 className='text-3xl'>Cart</h4>
						{sortedCartItems?.map(eachCart => {
							return (
								<CartItem
									key={uuidv4()}
									eachCart={eachCart}
								/>
							)
						})}
					</>
				) : (
					<>
						<h4 className='pt-24 text-2xl text-center'>
							Your cart is empty, <br />
							Continue shopping
						</h4>
						<CatNotFound />
					</>
				)}

			</div>
			{selectedItems.length > 0 && <CartFooter />}

		</section>
	)
}
