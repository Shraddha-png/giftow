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
            return { ...state, training_mannuals: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function TrainingMannual() {

    const [{ loading, error, training_mannuals }, dispatch] = useReducer(reducer, {
        training_mannuals: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/training_mannuals');
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
                            {training_mannuals.map((training_mannual) => (
                                <div className="col-md-3 mb-3" key={training_mannual.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/training_mannual/${training_mannual.slug}`}>
                                            <img src={training_mannual.image} className="card-img-top" alt={training_mannual.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/training_mannual/${training_mannual.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{training_mannual.name}</p>
                                            </Link>
                                            <Rating rating={training_mannual.rating} numReviews={training_mannual.numReviews} />
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

export default TrainingMannual;