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
            return { ...state, mobile_accessories: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function MobileAcc() {

    const [{ loading, error, mobile_accessories }, dispatch] = useReducer(reducer, {
        mobile_accessories: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
    

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/mobile_accessories');
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
                            {mobile_accessories.map((mobile_accessorie) => (
                                <div className="col-md-3 mb-3" key={mobile_accessorie.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/mobile_accessorie/${mobile_accessorie.slug}`}>
                                            <img src={mobile_accessorie.image} className="card-img-top px-5" alt={mobile_accessorie.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/mobile_accessorie/${mobile_accessorie.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{mobile_accessorie.name}</p>
                                            </Link>
                                            <Rating rating={mobile_accessorie.rating} numReviews={mobile_accessorie.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{mobile_accessorie.price}</strong>
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

export default MobileAcc;