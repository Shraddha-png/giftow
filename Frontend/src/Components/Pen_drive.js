import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Ratings";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, pendrives: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Pendrive() {
    const [{ loading, error, pendrives }, dispatch] = useReducer(reducer, {
        pendrives: [],
        loading: true,
        error: '',
    });







    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/pendrives');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

    return (
        <>

            {/* ##########add product########## */}


            <div>

                <div className="container-fluid">
                    <div className="">
                        {loading ? (
                            <LoadingBox />
                        ) : error ? (
                            <MessageBox varient="danger">{error}</MessageBox>
                        ) : (
                            <div className="row">
                                {pendrives.map((pendrive) => (
                                    <div className="col-md-3 mb-3" key={pendrive.slug}>
                                        <div className="product card mt-3 cardhover">
                                            <Link to={`/pendrive/${pendrive.slug}`}>
                                                <img src={pendrive.image} className="card-img-top" alt={pendrive.name} />
                                            </Link>
                                            <div className="card-body">
                                                <Link to={`/pendrive/${pendrive.slug}`}>
                                                    <p className="card-title">{pendrive.name}</p>
                                                </Link>
                                                <Rating rating={pendrive.rating} numReviews={pendrive.numReviews} />


                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pendrive;

