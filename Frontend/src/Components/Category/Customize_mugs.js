import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Rating from "../Ratings";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, mugs: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function CustomisedMug() {

    //    ####### Add to Cart######
    const [{ loading, error, mugs }, dispatch] = useReducer(reducer, {
        mugs: [],
        loading: true,
        error: '',
    });






    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/mugs');
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
                {mugs.map((mug) => (
                    <div className="col-md-3 mb-3" key={mug.slug}>
                        <div className="product card cardhover">
                            <Link to={`/mug/${mug.slug}`}>
                                <img src={mug.image} className="card-img-top" alt={mug.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/mug/${mug.slug}`}>
                                    <p className="card-title">{mug.name}</p>
                                </Link>
                                <Rating rating={mug.rating} numReviews={mug.numReviews} />
                               
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                    )}
            </div>

            {/* Review */}
            {/* <div className="container">
                
            </div> */}

        
        </>
    );
}

export default CustomisedMug;
