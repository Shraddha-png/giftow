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
                    return { ...state, dommagbadges: action.payload, loading: false, error: ''  };
                case 'FETCH_FAIL':
                    return { ...state, loading: false, error: action.payload };
                default:
                    return state;
            }
        };
        
        function Dombadge() {
        
            const [{ loading, error, dommagbadges }, dispatch] = useReducer(reducer, {
                dommagbadges: [],
                loading: true,
                error: '',
            });
           
        
            const { state} = useContext(Store);
            const isLoggedIn = state.userInfo !== null; // Check if user is logged in
           
        
            useEffect(() => {
                const fetchData = async () => {
                    dispatch({ type: 'FETCH_REQUEST' });
                    try {
                        const result = await axios.get(`/api/dommagbadges`);
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
                                    {dommagbadges.map((dommagbadge) => (
                                        <div className="col-md-3 mt-5 mb-3" key={dommagbadge.slug}>
                                            <div className="product card mt-5 cardhover">
                                                <Link to={`/dommagbadge/${dommagbadge.slug}`}>
                                                    <img src={dommagbadge.image} className="card-img-top" alt={dommagbadge.name} />
                                                </Link>
                                                <div className="card-body">
                                                    <Link to={`/dommagbadge/${dommagbadge.slug}`}>
                                                        <p className="card-title">{dommagbadge.name}</p>
                                                    </Link>
                                                    <Rating rating={dommagbadge.rating} numReviews={dommagbadge.numReviews} />
                                                    {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{dommagbadge.price}</strong>
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
        export default Dombadge;
    
    