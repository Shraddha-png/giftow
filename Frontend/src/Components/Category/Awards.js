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
            return { ...state, awards: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Awards() {
    //    ####### Add to Cart######
    const [{ loading, error, awards }, dispatch] = useReducer(reducer, {
        awards: [],
        loading: true,
        error: '',
    });



    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/awards');
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
                        {awards.map((award) => (
                            <div className="col-md-3 mb-3" key={award.slug}>
                                <div className="frostedMug card cardhover">
                                    <Link to={`/award/${award.slug}`}>
                                        <img src={award.image} className="card-img-top px-5" alt={award.name} />
                                    </Link>
                                    <div className="card-body">
                                        <Link to={`/award/${award.slug}`} className="txtdco">
                                            <p className="card-title">{award.name}</p>
                                        </Link>
                                        <Rating rating={award.rating} numReviews={award.numReviews} />

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

export default Awards;
