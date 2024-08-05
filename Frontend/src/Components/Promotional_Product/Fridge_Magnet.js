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
            return { ...state, fridgeMagnets: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function FridgeMagnet() {

    const [{ loading, error, fridgeMagnets }, dispatch] = useReducer(reducer, {
        fridgeMagnets: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
   


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/fridgeMagnets');
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
                            {fridgeMagnets.map((fridgeMagnet) => (
                                <div className="col mb-3" key={fridgeMagnet.slug}>
                                    <div className="product card mt-3  cardhoverhold">
                                        <Link to={`/fridgeMagnet/${fridgeMagnet.slug}`}>
                                            <img src={fridgeMagnet.image} className="card-img-top" alt={fridgeMagnet.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/fridgeMagnet/${fridgeMagnet.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{fridgeMagnet.name}</p>
                                            </Link>
                                            <Rating rating={fridgeMagnet.rating} numReviews={fridgeMagnet.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{fridgeMagnet.price}</strong>
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
export default FridgeMagnet;