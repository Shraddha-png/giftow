import React, {useEffect, useReducer,} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

import Rating from "./Ratings";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, pens: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Pen() {
    //    ####### Add to Cart######
const [{ loading, error, pens }, dispatch] = useReducer(reducer, {
    pens: [],
    loading: true,
    error: '',
});



useEffect(() => {
    const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
            const result = await axios.get('/api/pens');
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
                {pens.map((pen) => (
                    <div className="col-md-3 mb-3" key={pen.slug}>
                        <div className="frostedMug card cardhover">
                            <Link to={`/pen/${pen.slug}`}>
                                <img src={pen.image} className="card-img-top px-5" alt={pen.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/pen/${pen.slug}`} className="txtdco">
                                    <p className="card-title">{pen.name}</p>
                                </Link>
                                <Rating rating={pen.rating} numReviews={pen.numReviews} />
                               
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

export default Pen;
