
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
            return { ...state, calenders: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Calenders() {

    const [{ loading, error, calenders }, dispatch] = useReducer(reducer, {
        calenders: [],
        loading: true,
        error: '',
    });
   

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/calenders');
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
                            {calenders.map((calender) => (
                                <div className="col-md-3 mb-3" key={calender.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/calender/${calender.slug}`}>
                                            <img src={calender.image} className="card-img-top" alt={calender.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/calender/${calender.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{calender.name}</p>
                                            </Link>
                                            <Rating rating={calender.rating} numReviews={calender.numReviews} />
                                           
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

export default Calenders;