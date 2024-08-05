import React, { useContext, useState } from 'react';
import { Store } from '../Store';
import { getError } from '../Utiles';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [fname, setName] = useState(userInfo.fname)
    const [lname, setLname] = useState(userInfo.lname)
    const [number, setNumber] = useState(userInfo.number)
    const [company, setCompany] = useState(userInfo.company)
    const [business, setBusiness] = useState(userInfo.business)
    const [city, setCity] = useState(userInfo.city)
    const [country, setCountry] = useState(userInfo.country)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    fname,
                    lname,
                    number,
                    company,
                    business,
                    city,
                    country,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                }
            );
            ctxDispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User Updated Successfully');
        } catch (err) {
            ctxDispatch({
                type: 'UPDATE_FAIL'
            });
            toast.error(getError(err));
        }
    };

    return (
        <>
            <div className='container'>
                <div className='display-6 text-danger'>Edit Profile</div>
                <div className='profile p-5'>
                    <h5 className='mt-3 text-danger'>User Information</h5>
                    <form onSubmit={submitHandler} className='p-5 '>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="fname">
                                    <label><b>First Name:</b></label>
                                    <input className='form-control' type='text' value={fname} onChange={(e) => setName(e.target.value)} required></input>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="lname">
                                    <label><b>Last Name:</b></label>
                                    <input className='form-control' type='text' value={lname} onChange={(e) => setLname(e.target.value)} required></input>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="lname">
                                    <label><b>Mobile Number:</b></label>
                                    <input className='form-control' type='text' value={number} onChange={(e) => setNumber(e.target.value)} required></input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="company">
                                    <label><b>Company Name:</b></label>
                                    <input className='form-control' type='text' value={company} onChange={(e) => setCompany(e.target.value)} required></input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="business">
                                    <label><b>Business Name:</b></label>
                                    <input className='form-control' type='text' value={business} onChange={(e) => setBusiness(e.target.value)} required></input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="city">
                                    <label><b>City Name:</b></label>
                                    <input className='form-control' type='text' value={city} onChange={(e) => setCity(e.target.value)} required></input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="city">
                                    <label><b>Country Name:</b></label>
                                    <input className='form-control' type='text' value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="email">
                                    <label><b>Email:</b></label>
                                    <input className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="password">
                                    <label><b>Password:</b></label>
                                    <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='form-group mb-3' controlid="password">
                                    <label><b>Confirm Password:</b></label>
                                    <input className='form-control' type='password' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <button type='submit' className='btn btn-dark'>update</button>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}