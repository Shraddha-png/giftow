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
            return { ...state, roundmgbadges: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Roundbadge() {

    const [{ loading, error, roundmgbadges }, dispatch] = useReducer(reducer, {
        roundmgbadges: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/roundmgbadges');
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
                            {roundmgbadges.map((roundmgbadge) => (
                                <div className="col-md-3 mb-3" key={roundmgbadge.slug}>
                                    <div className="product card mt-5 cardhover">
                                        <Link to={`/roundmgbadge/${roundmgbadge.slug}`}>
                                            <img src={roundmgbadge.image} className="card-img-top" alt={roundmgbadge.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/roundmgbadge/${roundmgbadge.slug}`}>
                                                <p className="card-title">{roundmgbadge.name}</p>
                                            </Link>
                                            <Rating rating={roundmgbadge.rating} numReviews={roundmgbadge.numReviews} />
                                            {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{roundmgbadge.price}</strong>
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
export default Roundbadge;