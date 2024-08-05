import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
// import CheckoutSteps from "../CheckoutSteps";

function ShippingAddressScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress } } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [companyName, setCompanyName] = useState(shippingAddress.companyName || '');
    const [businessName, setBusinessName] = useState(shippingAddress.businessName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [region, setRegion] = useState(shippingAddress.region || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, companyName, businessName, address, city, postalCode, country, region }
        });
        localStorage.setItem('shippingAddress', JSON.stringify({ fullName, companyName, businessName, address, city, postalCode, country, region }));
        navigate('/placeorder');
    };

    return (
        <div>
            {/* <CheckoutSteps step1 step2 /> */}
            <div className="container my-3 py-5 border bg-light">

                <h3 className="text-center text-danger"><i className="bi bi-truck px-3" />Shipping Address</h3>
                <form onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-3">
                                <label htmlFor="fullName"><b>Full Name</b></label>
                                <input type="text" id="fullName" className="form-control" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-3">
                                <label htmlFor="companyName"><b>Company</b></label>
                                <input type="text" id="companyName" className="form-control" placeholder="Enter Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-3">
                                <label htmlFor="businessName"><b>Type of Bussiness</b></label>
                                <input type="text" id="businessName" className="form-control" placeholder="Enter Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group mb-3">
                                <label htmlFor="address"><b>Address</b></label>
                                <input type="text" id="address" className="form-control" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <label htmlFor="city"><b>City</b></label>
                                <input type="text" id="city" className="form-control" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <label htmlFor="postalCode"><b>Postal Code</b></label>
                                <input type="text" id="postalCode" className="form-control" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <label htmlFor="country"><b>Country</b></label>
                                <input type="text" id="country" className="form-control" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <label htmlFor="region"><b>Region/State</b></label>
                                <input type="text" id="region" className="form-control" placeholder="Enter region" value={region} onChange={(e) => setRegion(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>

            </div>
        </div>
    );
}

export default ShippingAddressScreen;
