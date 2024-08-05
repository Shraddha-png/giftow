import React, { useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Ratings";

import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { Store } from "./Store";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, mobileholds: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Mobilehol() {
    const [{ loading, error, mobileholds }, dispatch] = useReducer(reducer, {
        mobileholds: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
    const isLoggedIn = state.userInfo !== null; // Check if user is logged in
    

    

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/mobileholds');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

 return(
        <>
        
         {/* ##########add product########## */}

        
         <div>
      
                <div className="container-fluid">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {mobileholds.map((mobilehold) => (
                                <div className="col-md-3 mb-3" key={mobilehold.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/mobilehold/${mobilehold.slug}`}>
                                            <img src={mobilehold.image} className="card-img-top" alt={mobilehold.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/mobilehold/${mobilehold.slug}`}>
                                                <h3 className="card-title">{mobilehold.name}</h3>
                                            </Link>
                                            <Rating rating={mobilehold.rating} numReviews={mobilehold.numReviews} />
                                            {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{mobilehold.price}</strong>
                                                </p>
                                            ) : (
                                                <p className="card-text">Login/Register to see Price</p>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Mobilehol;

