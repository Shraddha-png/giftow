import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function FeedbackScreen() {
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/feedback", { fname, lname, number, email, feedback });
            toast.success('Feedback submitted successfully!');
        } catch (err) {
            toast.error('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <div className="bg-white p-3 rounded w-50">
                    <h2 className="text-danger"><center><i class="bi bi-house-door px-3"></i>Feedback Form</center></h2>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="mb-3">
                            <label htmlFor="fname"><strong>First Name</strong></label>
                            <input type="text" id="fname" placeholder='Enter First Name' autoComplete='off' className='form-control rounded-0 bg-light' onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lname"><strong>Last Name</strong></label>
                            <input type="text" id="lname" placeholder='Enter Last Name' autoComplete='off' className='form-control rounded-0 bg-light' onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number"><strong>Number</strong></label>
                            <input type="text" id="number" placeholder='Enter Number' autoComplete='off' className='form-control rounded-0 bg-light' onChange={(e) => setNumber(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" id="email" placeholder='Enter Email' autoComplete='off' className='form-control rounded-0 bg-light' onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="feedback"><strong>Feedback</strong></label>
                            <textarea id="feedback" placeholder='Enter Feedback' autoComplete='off' className='form-control rounded-0 bg-light' onChange={(e) => setFeedback(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded">Submit Feedback</button>
                        <ToastContainer />
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default FeedbackScreen;
