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
            return { ...state, brochures: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Brochures() {

    const [{ loading, error, brochures }, dispatch] = useReducer(reducer, {
        brochures: [],
        loading: true,
        error: '',
    });
  
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/brochures');
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
                            {brochures.map((brochure) => (
                                <div className="col-md-3 mb-3" key={brochure.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/brochure/${brochure.slug}`}>
                                            <img src={brochure.image} className="card-img-top" alt={brochure.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/brochure/${brochure.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{brochure.name}</p>
                                            </Link>
                                            <Rating rating={brochure.rating} numReviews={brochure.numReviews} />
                                           
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
export default Brochures;