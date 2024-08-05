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
            return { ...state, hoodies: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Hoodies() {

    const [{ loading, error, hoodies }, dispatch] = useReducer(reducer, {
        hoodies: [],
        loading: true,
        error: '',
    });
   

   
 
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/hoodies');
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
             
                <div className="container-fluid mt-5">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {hoodies.map((hoodie) => (
                                <div className="col-md-3 mb-3" key={hoodie.slug}>
                                    <div className="product card mt-3  cardhoverhold">
                                        <Link to={`/hoodie/${hoodie.slug}`}>
                                            <img src={hoodie.image} className="card-img-top px-5" alt={hoodie.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/hoodie/${hoodie.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{hoodie.name}</p>
                                            </Link>
                                            <Rating rating={hoodie.rating} numReviews={hoodie.numReviews} />
											
                                          
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

export default Hoodies;