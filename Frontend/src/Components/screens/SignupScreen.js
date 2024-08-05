import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Store } from '../Store';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignupScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [company, setCompany] = useState('');
    const [business, setBusiness] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }
        try {
            const { data } = await axios.post("/api/users/signup", { fname, lname, number, company, business, city, country, email, password });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {

            toast.error('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div className="container-fluid ">
            <div className="d-flex justify-content-center">
                <div className="bg-white p-3 rounded w-50">
                    <h2><center>Sign Up</center></h2>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Your Personal Details</h3><hr />
                                <div className="mb-3">
                                    <label htmlFor="fname"><strong>First Name</strong></label>
                                    <input type="text" id="fname" placeholder='Enter First Name' autoComplete='off' className='form-control rounded-0' onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lname"><strong>Last Name</strong></label>
                                    <input type="text" id="lname" placeholder='Enter Last Name' autoComplete='off' className='form-control rounded-0' onChange={(e) => setLastName(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <input type="email" id="email" placeholder='Enter Email' autoComplete='off' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="number"><strong>Number</strong></label>
                                    <input type="text" id="number" placeholder='Enter Number' autoComplete='off' className='form-control rounded-0' onChange={(e) => setNumber(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password"><strong>Password</strong></label>
                                    <input type="password" id="password" placeholder='Enter Password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                                    <input type="password" id="confirmPassword" placeholder='Confirm Password' className='form-control rounded-0' onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-6">

                                {/* ############### ADDRESS ############# */}
                                <h3>Your address</h3><hr />
                                <div className="mb-3">
                                    <label htmlFor="company"><strong>Company</strong></label>
                                    <input type="text" id="company" placeholder='Company' className='form-control rounded-0' onChange={(e) => setCompany(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="business"><strong>Type of Business</strong></label>
                                    <input type="text" id="business" placeholder='Enter Password' className='form-control rounded-0' onChange={(e) => setBusiness(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city"><strong>City</strong></label>
                                    <input type="text" id="city" placeholder='Enter Password' className='form-control rounded-0' onChange={(e) => setCity(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country"><strong>Country</strong></label>
                                    <input type="text" id="country" placeholder='Enter Password' className='form-control rounded-0' onChange={(e) => setCountry(e.target.value)} required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>

                            <div className="mb-3">
                                Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                            </div>
                        </div>

                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>


    );
}

export default SignupScreen;

