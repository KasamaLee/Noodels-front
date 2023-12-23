import React from 'react'
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import CatNotFound from '../components/CatNotFound'
import CartItem from '../features/cart/CartItem';
import CartFooter from '../features/cart/CartFooter';
import { OrderContext } from '../contexts/OrderContext';

export default function CartPage() {

	const { authUser } = useContext(AuthContext);
	const { cartData } = useContext(CartContext);
	const { selectedItems } = useContext(OrderContext);
	// console.log(cartData)

	// cartData will be Mutated
	const sortedCartItems = cartData?.CartItem.sort((a, b) => {
		if (a.product.stockQuantity === 0) return 1        // IF a:0 ==> move a BEHIND b
		if (b.product.stockQuantity === 0) return -1       // IF b:0 ==> move a BEFORE b
		return 0;                                          // BOTH a b are NOT 0 ==> No change
	})
	console.log(sortedCartItems)

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
									id={eachCart.id}
									imageUrl={eachCart.product.imageUrl}
									name={eachCart.product.name}
									price={eachCart.price}
									initialQuantity={eachCart.quantity}
									maxQuantity={eachCart.product.stockQuantity}
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
