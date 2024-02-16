import React, {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../Payment/CheckOutForm";
import axiosInstance from "../../services/axios.service";
import {get} from "lodash";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || '');

export default function Payment({ itemId = 1 }) {
    const [secretKey, setSecretKey] = useState('');

    useEffect(() => {
        if (itemId) {
            axiosInstance.get(`api/payment/get-payment-secret-key?item-id=${itemId}`).then((result) => {
                const { data, statusCode } = result?.data || {};

                if (statusCode === 200) {
                    setSecretKey(get(data, 'client_secret'));
                }
            }).catch(error => {
                console.log(error?.message)
            })
        }
    }, [itemId])

    if (!secretKey || !stripePromise) {
        return <>...</>
    }

    return (
        <Elements stripe={stripePromise} options={{
            clientSecret: secretKey,
        }}>
            <CheckoutForm itemId />
        </Elements>
    );
};