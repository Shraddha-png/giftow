import React from 'react';


function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className="col active">Sign-In</div>
            <div className="col active">Shipping</div>
            <div className="col active">Payment</div>
            <div className="col active">Place Order</div>
        </div>
    );
}

export default CheckoutSteps;
