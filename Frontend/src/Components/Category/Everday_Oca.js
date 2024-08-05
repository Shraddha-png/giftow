import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

import Rating from "../Ratings";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, occasions: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Occassion() {
    //    ####### Add to Cart######
    const [{ loading, error, occasions }, dispatch] = useReducer(reducer, {
        occasions: [],
        loading: true,
        error: '',
    });



    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/occasions');
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
                        {occasions.map((occasion) => (
                            <div className="col-md-3 mb-3" key={occasion.slug}>
                                <div className="frostedMug card cardhover">
                                    <Link to={`/occasion/${occasion.slug}`}>
                                        <img src={occasion.image} className="card-img-top px-5" alt={occasion.name} />
                                    </Link>
                                    <div className="card-body">
                                        <Link to={`/occasion/${occasion.slug}`} className="txtdco">
                                            <p className="card-title">{occasion.name}</p>
                                        </Link>
                                        <Rating rating={occasion.rating} numReviews={occasion.numReviews} />

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

export default Occassion;