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
            return { ...state, mouse_keyboards: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Mousekeyboard() {

    const [{ loading, error, mouse_keyboards }, dispatch] = useReducer(reducer, {
        mouse_keyboards: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/mouse_keyboards');
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
                            {mouse_keyboards.map((mouse_keyboard) => (
                                <div className="col-md-3 mb-3" key={mouse_keyboard.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/mouse_keyboard/${mouse_keyboard.slug}`}>
                                            <img src={mouse_keyboard.image} className="card-img-top" alt={mouse_keyboard.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/mouse_keyboard/${mouse_keyboard.slug}`}>
                                                <h3 className="card-title">{mouse_keyboard.name}</h3>
                                            </Link>
                                            <Rating rating={mouse_keyboard.rating} numReviews={mouse_keyboard.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{mouse_keyboard.price}</strong>
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
export default Mousekeyboard;