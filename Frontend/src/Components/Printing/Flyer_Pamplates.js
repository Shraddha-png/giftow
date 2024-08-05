import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../Ratings";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, flyer_pamplates: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function FlyerPamplate() {

    const [{ loading, error, flyer_pamplates }, dispatch] = useReducer(reducer, {
        flyer_pamplates: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/flyer_pamplates');
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
                            {flyer_pamplates.map((flyer_pamplate) => (
                                <div className="col-md-3 mb-3" key={flyer_pamplate.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/flyer_pamplate/${flyer_pamplate.slug}`}>
                                            <img src={flyer_pamplate.image} className="card-img-top" alt={flyer_pamplate.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/flyer_pamplate/${flyer_pamplate.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{flyer_pamplate.name}</p>
                                            </Link>
                                            <Rating rating={flyer_pamplate.rating} numReviews={flyer_pamplate.numReviews} />
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

export default FlyerPamplate;