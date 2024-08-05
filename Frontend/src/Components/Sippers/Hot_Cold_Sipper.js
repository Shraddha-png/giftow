import React, { useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../Ratings";

import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Store } from "../Store";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, hotcoldsippers: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Hotcold() {
    const [{ loading, error, hotcoldsippers }, dispatch] = useReducer(reducer, {
        hotcoldsippers: [],
        loading: true,
        error: '',
    });
    

    const { state } = useContext(Store);
    const isLoggedIn = state.userInfo !== null; // Check if user is logged in
    


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/hotcoldsippers');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

 return(
        <>
        
         {/* ##########add hotcoldsipper########## */}

        
         <div>
           
                <div className="container-fluid">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {hotcoldsippers.map((hotcoldsipper) => (
                                <div className="col-md-3 mb-3" key={hotcoldsipper.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/hotcoldsipper/${hotcoldsipper.slug}`}>
                                            <img src={hotcoldsipper.image} className="card-img-top" alt={hotcoldsipper.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/hotcoldsipper/${hotcoldsipper.slug}`} className="txtdco">
                                                <p className="card-title">{hotcoldsipper.name}</p>
                                            </Link>
                                            <Rating rating={hotcoldsipper.rating} numReviews={hotcoldsipper.numReviews} />
                                            {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{hotcoldsipper.price}</strong>
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
export default Hotcold;

