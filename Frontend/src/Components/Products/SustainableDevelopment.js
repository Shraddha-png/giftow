
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
            return { ...state, sustainablesitems: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function SustainableItem() {
    const [{ loading, error, sustainablesitems }, dispatch] = useReducer(reducer, {
        sustainablesitems: [],
        loading: true,
        error: '',
    });
   

 
  


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/sustainablesitems');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

 return(
        <>
        
         {/* ##########add sustainablesitem########## */}

        
         <div>
             
                <div className="container-fluid">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {sustainablesitems.map((sustainablesitem) => (
                                <div className="col-md-3 mb-3" key={sustainablesitem.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/sustainablesitem/${sustainablesitem.slug}`}>
                                            <img src={sustainablesitem.image} className="card-img-top" alt={sustainablesitem.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/sustainablesitem/${sustainablesitem.slug}`} className="txtdco">
                                                <p className="card-title">{sustainablesitem.name}</p>
                                            </Link>
                                            <Rating rating={sustainablesitem.rating} numReviews={sustainablesitem.numReviews} />
                                           
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
export default SustainableItem;

