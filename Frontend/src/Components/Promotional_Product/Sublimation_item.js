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
            return { ...state, sublimation_items: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function SublimationItem() {

    const [{ loading, error, sublimation_items }, dispatch] = useReducer(reducer, {
        sublimation_items: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
   

   

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/sublimation_items');
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
                            {sublimation_items.map((sublimation_item) => (
                                <div className="col-md-3 mb-3" key={sublimation_item.slug}>
                                    <div className="product card mt-3  cardhoverhold">
                                        <Link to={`/sublimation_item/${sublimation_item.slug}`}>
                                            <img src={sublimation_item.image} className="card-img-top" alt={sublimation_item.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/sublimation_item/${sublimation_item.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{sublimation_item.name}</p>
                                            </Link>
                                            <Rating rating={sublimation_item.rating} numReviews={sublimation_item.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{sublimation_item.price}</strong>
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
export default SublimationItem;