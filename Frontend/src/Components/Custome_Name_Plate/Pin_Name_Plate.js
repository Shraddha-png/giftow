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
            return { ...state, pinnmplates: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Pinplate() {

    const [{ loading, error, pinnmplates }, dispatch] = useReducer(reducer, {
        pinnmplates: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
  


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/pinnmplates');
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
                            {pinnmplates.map((pinnmplate) => (
                                <div className="col-md-3 mb-3" key={pinnmplate.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/pinnmplate/${pinnmplate.slug}`}>
                                            <img src={pinnmplate.image} className="card-img-top" alt={pinnmplate.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/pinnmplate/${pinnmplate.slug}`} className="txtdco">
                                                <p className="card-title">{pinnmplate.name}</p>
                                            </Link>
                                            <Rating rating={pinnmplate.rating} numReviews={pinnmplate.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{pinnmplate.price}</strong>
                                                </p>
                                            ) : (
                                                <p className="card-text">Login/Register to see Price</p>
                                            )}
                                            {/* {pinnmplate.countInStock === 0 ? (
                                                <button className="btn btn-light" disabled>Out of Stock</button>
                                            ) : (
                                                <button className="btn btn-primary" onClick={() => addToCartHandler(pinnmplate)}>Add To Cart</button>
                                            )} */}
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
export default Pinplate;