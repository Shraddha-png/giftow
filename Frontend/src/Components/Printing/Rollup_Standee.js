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
            return { ...state, standees: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Standee() {

    const [{ loading, error, standees }, dispatch] = useReducer(reducer, {
        standees: [],
        loading: true,
        error: '',
    });
   
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/standees');
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
                            {standees.map((standee) => (
                                <div className="col-md-3 mb-3" key={standee.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/standee/${standee.slug}`}>
                                            <img src={standee.image} className="card-img-top" alt={standee.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/standee/${standee.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{standee.name}</p>
                                            </Link>
                                            <Rating rating={standee.rating} numReviews={standee.numReviews} />
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
export default Standee;