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
            return { ...state, giftsets: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Giftset() {
    const [{ loading, error, giftsets }, dispatch] = useReducer(reducer, {
        giftsets: [],
        loading: true,
        error: '',
    });
     

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/giftsets');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

 return(
        <>
        
         {/* ##########add giftset########## */}

        
         <div>
                
                <div className="container-fluid">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {giftsets.map((giftset) => (
                                <div className="col-md-3 mb-3" key={giftset.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/giftset/${giftset.slug}`}>
                                            <img src={giftset.image} className="card-img-top px-5" alt={giftset.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/giftset/${giftset.slug}`}>
                                                <p className="card-title">{giftset.name}</p>
                                            </Link>
                                            <Rating rating={giftset.rating} numReviews={giftset.numReviews} />
                                            
                                           
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
export default Giftset;

