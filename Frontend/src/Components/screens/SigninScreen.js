import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Store } from '../Store';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', { email, password });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error('Invalid email or password: ' + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      {/* <div className="container-sm"> */}

      <section className="h-100 gradient-form" style={{ background: "#eee" }}>
        <             div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                      <div className="text-center">
                        <img src="/images/LOGO/Giftoworld Final Logo.png"
                          style={{ width: "185px" }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1 text-success">Giftoworld</h4>
                      </div>
                      <form onSubmit={submitHandler}>
                        <div className="mb-3">
                          <label htmlFor="email"><strong>Email</strong></label>
                          <input type="email" id="email" placeholder='Enter Email' autoComplete='off' className='form-control' onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password"><strong>Password</strong></label>
                          <input type="password" id="password" placeholder='Enter Password' className='form-control' onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Sign In</button>
                     
                        <div className="mb-3 mt-2">
                          New Customer? <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
                        </div>
                      </form>
                      <ToastContainer />
                      {/* </div> */}

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className=" px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;


