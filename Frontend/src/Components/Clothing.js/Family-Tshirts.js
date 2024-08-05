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
            return { ...state, family_tshirts: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function FamilyTshirts() {

    const [{ loading, error, family_tshirts }, dispatch] = useReducer(reducer, {
        family_tshirts: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
 

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/family_tshirts');
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
                            {family_tshirts.map((family_tshirt) => (
                                <div className="col-md-3 mb-3" key={family_tshirt.slug}>
                                    <div className="product card mt-3 cardhoverhold">
                                        <Link to={`/family_tshirt/${family_tshirt.slug}`}>
                                            <img src={family_tshirt.image} className="card-img-top px-5" alt={family_tshirt.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/family_tshirt/${family_tshirt.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{family_tshirt.name}</p>
                                            </Link>
                                            <Rating rating={family_tshirt.rating} numReviews={family_tshirt.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{family_tshirt.price}</strong>
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

export default FamilyTshirts;