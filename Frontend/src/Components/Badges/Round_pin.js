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
                return { ...state, roundpinbadges: action.payload, loading: false, error: ''  };
            case 'FETCH_FAIL':
                return { ...state, loading: false, error: action.payload };
            default:
                return state;
        }
    };
    
    function Roundpinbadge() {
    
        const [{ loading, error, roundpinbadges }, dispatch] = useReducer(reducer, {
            roundpinbadges: [],
            loading: true,
            error: '',
        });
       
    
        const { state} = useContext(Store);
        const isLoggedIn = state.userInfo !== null; // Check if user is logged in
      
    
        useEffect(() => {
            const fetchData = async () => {
                dispatch({ type: 'FETCH_REQUEST' });
                try {
                    const result = await axios.get('/api/roundpinbadges');
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
                   
                    <div className="container-fluid mt-5">
                        {loading ? (
                            <LoadingBox />
                        ) : error ? (
                            <MessageBox varient="danger">{error}</MessageBox>
                        ) : (
                            <div className="row">
                                {roundpinbadges.map((roundpinbadge) => (
                                    <div className="col-md-3 mb-3" key={roundpinbadge.slug}>
                                        <div className="product card mt-5 cardhover">
                                            <Link to={`/roundpinbadge/${roundpinbadge.slug}`}>
                                                <img src={roundpinbadge.image} className="card-img-top" alt={roundpinbadge.name} />
                                            </Link>
                                            <div className="card-body">
                                                <Link to={`/roundpinbadge/${roundpinbadge.slug}`}>
                                                    <p className="card-title">{roundpinbadge.name}</p>
                                                </Link>
                                                <Rating rating={roundpinbadge.rating} numReviews={roundpinbadge.numReviews} />
                                                {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{roundpinbadge.price}</strong>
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
    export default Roundpinbadge;