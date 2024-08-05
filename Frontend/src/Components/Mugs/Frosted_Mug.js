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
            return { ...state, frostedMugs: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Frosted() {
//    ####### Add to Cart######
const [{ loading, error, frostedMugs }, dispatch] = useReducer(reducer, {
    frostedMugs: [],
    loading: true,
    error: '',
});
const { state } = useContext(Store);
const isLoggedIn = state.userInfo !== null; // Check if user is logged in






useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
            const result = await axios.get('/api/frostedMugs');
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
            <div className="container-fluid">
                {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
            <div className="row ">
                {frostedMugs.map((frostedMug) => (
                    <div className="col-md-3 mb-3" key={frostedMug.slug}>
                        <div className="frostedMug card mt-3 cardhover">
                            <Link to={`/frostedMug/${frostedMug.slug}`}>
                                <img src={frostedMug.image} className="card-img-top px-4" alt={frostedMug.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/frostedMug/${frostedMug.slug}`} className="txtdco">
                                    <p className="card-title">{frostedMug.name}</p>
                                </Link>
                                <Rating rating={frostedMug.rating} numReviews={frostedMug.numReviews} />
                                {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{frostedMug.price}</strong>
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

export default Frosted;
