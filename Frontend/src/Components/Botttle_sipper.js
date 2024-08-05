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
            return { ...state, bottle_sippers: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Bottlesipper() {

    const [{ loading, error, bottle_sippers }, dispatch] = useReducer(reducer, {
        bottle_sippers: [],
        loading: true,
        error: '',
    });
  
   
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/bottle_sippers');
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
                            {bottle_sippers.map((bottle_sipper) => (
                                <div className="col-md-3 mb-3" key={bottle_sipper.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/bottle_sipper/${bottle_sipper.slug}`}>
                                            <img src={bottle_sipper.image} className="card-img-top px-5" alt={bottle_sipper.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/bottle_sipper/${bottle_sipper.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{bottle_sipper.name}</p>
                                            </Link>
                                            <Rating rating={bottle_sipper.rating} numReviews={bottle_sipper.numReviews} />
											
                                          
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
export default Bottlesipper;