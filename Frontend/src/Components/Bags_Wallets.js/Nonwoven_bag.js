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
            return { ...state, non_wovenbags: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Nonwovenbag() {

    const [{ loading, error, non_wovenbags }, dispatch] = useReducer(reducer, {
        non_wovenbags: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
 

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/non_wovenbags');
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
             
                <div className="container mt-5">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {non_wovenbags.map((non_wovenbag) => (
                                <div className="col-md-3 mb-3" key={non_wovenbag.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/non_wovenbag/${non_wovenbag.slug}`}>
                                            <img src={non_wovenbag.image} className="card-img-top " alt={non_wovenbag.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/non_wovenbag/${non_wovenbag.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{non_wovenbag.name}</p>
                                            </Link>
                                            <Rating rating={non_wovenbag.rating} numReviews={non_wovenbag.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{non_wovenbag.price}</strong>
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
export default Nonwovenbag;