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
            return { ...state, tags: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Tag() {
    //    ####### Add to Cart######
const [{ loading, error, tags }, dispatch] = useReducer(reducer, {
    tags: [],
    loading: true,
    error: '',
});
const { state} = useContext(Store);
const isLoggedIn = state.userInfo !== null; // Check if user is logged in


useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
            const result = await axios.get('/api/tags');
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
                {tags.map((tag) => (
                    <div className="col-md-3 mb-3" key={tag.slug}>
                        <div className="frostedMug card cardhover">
                            <Link to={`/tag/${tag.slug}`}>
                                <img src={tag.image} className="card-img-top px-5" alt={tag.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/tag/${tag.slug}`} className="txtdco">
                                    <p className="card-title">{tag.name}</p>
                                </Link>
                                <Rating rating={tag.rating} numReviews={tag.numReviews} />
                                {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{tag.price}</strong>
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

export default Tag;
