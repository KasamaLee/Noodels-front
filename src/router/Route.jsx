import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../layout/Layout'
import ContactPage from '../pages/ContactPage'
import CartContextProvider from '../contexts/CartContext'
import ProductContextProvider from '../contexts/ProductContext'
import CartPage from '../pages/CartPage'
import OrderContextProvider from '../contexts/OrderContext'
import PaymentPage from '../pages/PaymentPage'
import NotfoundPage from '../pages/NotfoundPage'


const router = createBrowserRouter([
    {
        path: '/',
        element: (
                <ProductContextProvider>
                    <CartContextProvider>
                        <OrderContextProvider>
                            <Layout />
                        </OrderContextProvider>
                    </CartContextProvider>
                </ProductContextProvider>
        ),
        children: [
            { path: '', element: <HomePage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'payment', element: <PaymentPage /> },
            {path: '*', element: <NotfoundPage /> }
        ]
    }
])

export default function Route() {
    return (
        <RouterProvider router={router} />
    )
}
