import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Ratings";

import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, tshirts: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Tshirts() {
    const [{ loading, error, tshirts }, dispatch] = useReducer(reducer, {
        tshirts: [],
        loading: true,
        error: '',
    });
    


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/tshirts');
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
            <div className="row">
                {tshirts.map((tshirt) => (
                    <div className="col-md-3 mb-3" key={tshirt.slug}>
                        <div className="product card mt-3 cardhover">
                            <Link to={`/tshirt/${tshirt.slug}`}>
                                <img src={tshirt.image} className="card-img-top px-4" alt={tshirt.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/tshirt/${tshirt.slug}`} className="txtdco">
                                    <p className="card-title">{tshirt.name}</p>
                                </Link>
                                <Rating rating={tshirt.rating} numReviews={tshirt.numReviews} />
                              
                                
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

export default Tshirts;
