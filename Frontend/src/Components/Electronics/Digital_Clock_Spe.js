import React, { useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../Ratings";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Store } from "../Store";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, digitalclock_speakers: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Digitalclockspeaker() {

    const [{ loading, error, digitalclock_speakers }, dispatch] = useReducer(reducer, {
        digitalclock_speakers: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
    

    
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/digitalclock_speakers');
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
                            {digitalclock_speakers.map((digitalclock_speaker) => (
                                <div className="col-md-3 mb-3" key={digitalclock_speaker.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/digitalclock_speaker/${digitalclock_speaker.slug}`}>
                                            <img src={digitalclock_speaker.image} className="card-img-top px-5" alt={digitalclock_speaker.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/digitalclock_speaker/${digitalclock_speaker.slug}`}>
                                                <h3 className="card-title">{digitalclock_speaker.name}</h3>
                                            </Link>
                                            <Rating rating={digitalclock_speaker.rating} numReviews={digitalclock_speaker.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{digitalclock_speaker.price}</strong>
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
export default Digitalclockspeaker;