import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCon, setConPassword] = useState('');
    const [company, setCompany] = useState('');
    const [business, setBusiness] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (number.length !== 10) {
            setError('Mobile number must be 10 digits');
            return;
        }


        axios.post("/api/users/signup", {
            firstName,
            lastName,
            number,
            email,
            password,
            passwordCon,
            company,
            business,
            city,
            country
        })
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error);
            });
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <div className="bg-white p-3 rounded w-50">
                    <h2><center>Sign Up</center></h2>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="row">
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="col-md-6">
                                <p>Your Personal Details</p>
                                <hr />
                                <div className="mb-3">
                                    <label>
                                        <strong>First Name</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='First Name'
                                        autoComplete='off'
                                        name='firstName'
                                        className='form-control rounded-0'
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Last Name</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Last Name'
                                        autoComplete='off'
                                        name='lastName'
                                        className='form-control rounded-0'
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Mobile number</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Mobile Number'
                                        autoComplete='off'
                                        name='number'
                                        className='form-control rounded-0'
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Email</strong>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder='Enter Email'
                                        autoComplete='off'
                                        name='email'
                                        className='form-control rounded-0'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Password</strong>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder='Password'
                                        name='password'
                                        className='form-control rounded-0'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Password Confirm</strong>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder='Confirm Password'
                                        name='passwordCon'
                                        className='form-control rounded-0'
                                        onChange={(e) => setConPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <p>Your Address</p>
                                <hr />
                                <div className="mb-3">
                                    <label>
                                        <strong>Company</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Company'
                                        name='company'
                                        className='form-control rounded-0'
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Type of Business</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Type of Business'
                                        name='business'
                                        className='form-control rounded-0'
                                        onChange={(e) => setBusiness(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>City</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='City Name'
                                        name='city'
                                        className='form-control rounded-0'
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        <strong>Country</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Country'
                                        name='country'
                                        className='form-control rounded-0'
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success w-10 rounded-0 justify-content-center">
                                Sign Up
                            </button>
                            <p>Already have an account?</p>
                            <Link to="/signin" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;


