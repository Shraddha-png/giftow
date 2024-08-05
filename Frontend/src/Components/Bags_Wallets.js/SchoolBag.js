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
            return { ...state, schoolbags: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function SchoolBag() {

    const [{ loading, error, schoolbags }, dispatch] = useReducer(reducer, {
        schoolbags: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
   
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/schoolbags');
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
                            {schoolbags.map((schoolbag) => (
                                <div className="col-md-3 mb-3" key={schoolbag.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/schoolbag/${schoolbag.slug}`}>
                                            <img src={schoolbag.image} className="card-img-top px-5" alt={schoolbag.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/schoolbag/${schoolbag.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{schoolbag.name}</p>
                                            </Link>
                                            <Rating rating={schoolbag.rating} numReviews={schoolbag.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{schoolbag.price}</strong>
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
export default SchoolBag;