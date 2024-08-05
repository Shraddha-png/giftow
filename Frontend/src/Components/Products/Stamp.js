import React, {useEffect, useReducer, useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Store } from "../Store";
import Rating from "../Ratings";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, stamps: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Stamps() {
    //    ####### Add to Cart######
const [{ loading, error, stamps }, dispatch] = useReducer(reducer, {
    stamps: [],
    loading: true,
    error: '',
});
const { state} = useContext(Store);
const isLoggedIn = state.userInfo !== null; // Check if user is logged in


useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
            const result = await axios.get('/api/stamps');
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message });
        }
    };
    fetchData();
}, []);

    return (
        <>
            {/* ########## Add Product ########## */}
            <div className="container-fluid mt-5">
            {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
            <div className="row ">
                {stamps.map((stamp) => (
                    <div className="col-md-3 mb-3" key={stamp.slug}>
                        <div className="frostedMug card cardhover">
                            <Link to={`/stamp/${stamp.slug}`}>
                                <img src={stamp.image} className="card-img-top px-5" alt={stamp.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/stamp/${stamp.slug}`} className="txtdco">
                                    <p className="card-title">{stamp.name}</p>
                                </Link>
                                <Rating rating={stamp.rating} numReviews={stamp.numReviews} />
                                {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{stamp.price}</strong>
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
        </>
    );
}

export default Stamps;
