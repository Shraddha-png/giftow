import React, { useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Ratings";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { Store } from "./Store";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, pencils: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Pencil() {

    const [{ loading, error, pencils }, dispatch] = useReducer(reducer, {
        pencils: [],
        loading: true,
        error: '',
    });


    const { state } = useContext(Store);
    const isLoggedIn = state.userInfo !== null; // Check if user is logged in

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/pencils');
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
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {pencils.map((pencil) => (
                                <div className="col-md-3 mb-3" key={pencil.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/pencil/${pencil.slug}`}>
                                            <img src={pencil.image} className="card-img-top px-5" alt={pencil.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/pencil/${pencil.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{pencil.name}</p>
                                            </Link>
                                            <Rating rating={pencil.rating} numReviews={pencil.numReviews} />
                                            {isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{pencil.price}</strong>
                                                </p>
                                            ) : (
                                                <p className="card-text">Login/Register to see Price</p>
                                            )}

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
export default Pencil;