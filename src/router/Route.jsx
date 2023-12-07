import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../layout/Layout'
import ContactPage from '../pages/ContactPage'
import CartContextProvider from '../contexts/CartContext'
import ProductContextProvider from '../contexts/ProductContext'
import CartPage from '../pages/CartPage'


const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProductContextProvider>
                <CartContextProvider>
                    <Layout />
                </CartContextProvider>
            </ProductContextProvider>
        ),
        children: [
            { path: '', element: <HomePage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'cart', element: <CartPage /> },
        ]
    }
])

export default function Route() {
    return (
        <RouterProvider router={router} />
    )
}
