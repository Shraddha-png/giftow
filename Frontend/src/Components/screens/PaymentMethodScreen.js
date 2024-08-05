import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
// import CheckoutSteps from '../CheckoutSteps';

function PaymentMethodScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { shippingAddress, paymentMethod } } = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'We Dont Take Any Payment Online');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    };

    return (
        <div>
            {/* <CheckoutSteps step1 step2 step3 /> */}
            <div className="container my-3 py-5">
                <h3 className="text-center">Payment Method</h3>
                <form onSubmit={submitHandler}>
                    <div className="form-check">
                        <input type="radio" id="We Don't Take Any Payment Online" value="We Don't Take Any Payment Online" name="We Don't Take Any Payment Online" className="form-check-input" checked={paymentMethodName === 'We Dont Take Any Payment Online'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="We Don't Take Any Payment Online" className="form-check-label">We Don't Take Any Payment Online</label>
                    </div>
                    {/* <div className="form-check">
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" className="form-check-input" checked={paymentMethodName === 'Stripe'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="stripe" className="form-check-label">Stripe</label>
                    </div> */}

                    {/* <h2>We Don't Take Any Payment Online</h2> */}
                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>
            </div>
        </div>
    );
}

export default PaymentMethodScreen;
