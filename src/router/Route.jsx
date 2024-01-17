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
import OrderPage from '../pages/OrderPage'
import ProfileInfoPage from '../pages/ProfileInfoPage'
import RedirectIfNotUser from './RedirectIfNotUser'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AdminLayout from '../layout/AdminLayout'
import AdminCheckOrderPage from '../pages/AdminCheckOrderPage'
import AdminEditProductPage from '../pages/AdminEditProductPage'


export default function Route() {

    const { authUser } = useContext(AuthContext)

    let router = createBrowserRouter([
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
                { path: '*', element: <NotfoundPage /> }
            ]
        }
    ])

    if (authUser?.role === 'USER') {
        router = createBrowserRouter([
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
                    { path: 'order', element: <OrderPage /> },
                    { path: 'profile', element: <ProfileInfoPage /> },
                    { path: '*', element: <NotfoundPage /> }
                ]
            },
        ])
    }

    if (authUser?.role === 'ADMIN') {
        router = createBrowserRouter([
            {
                path: '/',
                element: (
                    <AdminLayout />
                ),
                children: [
                    { path: '', element: <AdminCheckOrderPage /> },
                    { path: 'edit', element: <AdminEditProductPage /> },
                    { path: 'profile', element: <ProfileInfoPage /> },
                    { path: '*', element: <NotfoundPage /> }
                ]
            },
        ])
    }


    return (
        <RouterProvider router={router} />
    )
}
