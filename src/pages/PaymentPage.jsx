import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51O2AMAI47xWQxVGV0k99tPraKxItkbJFMTM62NF3usuyiwNFePFcAYZnb6MZjguJk8FYxZzzmqyY4pW7FBXAtl6K00fCGDlTNi");

export default function PaymentPage() {

    const [isOpenCredit, setIsOpenCredit] = useState(false);

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <section className='section py-28'>
            <div className='container flex justify-center gap-16'>
                {/* <div className='bg-white ring-4 ring-gray-500 p-10 rounded-xl cursor-pointer flex items-center gap-4 hover:ring-amber-400'>
                    <FontAwesomeIcon icon={faQrcode} size='2xl' />
                    QR Code
                </div> */}

                <div className='bg-white ring-4 ring-gray-500 p-10 rounded-xl cursor-pointer flex items-center gap-4 hover:ring-amber-400'>
                    <FontAwesomeIcon icon={faCreditCard} size='2xl' />
                    Credit Card
                </div>

                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </section>
    )
}
