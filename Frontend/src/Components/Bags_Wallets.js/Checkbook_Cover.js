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
            return { ...state, checkbook_covers: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function CheckbookCover() {

    const [{ loading, error, checkbook_covers }, dispatch] = useReducer(reducer, {
        checkbook_covers: [],
        loading: true,
        error: '',
    });
   

    const { state} = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
   

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/checkbook_covers`);
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
                            {checkbook_covers.map((checkbook_cover) => (
                                <div className="col-md-3 mb-3" key={checkbook_cover.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/checkbook_cover/${checkbook_cover.slug}`}>
                                            <img src={checkbook_cover.image} className="card-img-top px-5" alt={checkbook_cover.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/checkbook_cover/${checkbook_cover.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{checkbook_cover.name}</p>
                                            </Link>
                                            <Rating rating={checkbook_cover.rating} numReviews={checkbook_cover.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{checkbook_cover.price}</strong>
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
export default CheckbookCover;