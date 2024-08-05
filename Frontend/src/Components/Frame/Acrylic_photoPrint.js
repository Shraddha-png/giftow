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
            return { ...state, acrylic_photoprints: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function AcrylicphotoPrint() {

    const [{ loading, error, acrylic_photoprints }, dispatch] = useReducer(reducer, {
        acrylic_photoprints: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
  

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/acrylic_photoprints');
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
                            {acrylic_photoprints.map((acrylic_photoprint) => (
                                <div className="col-md-3 mb-3" key={acrylic_photoprint.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/acrylic_photoprint/${acrylic_photoprint.slug}`}>
                                            <img src={acrylic_photoprint.image} className="card-img-top px-5" alt={acrylic_photoprint.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/acrylic_photoprint/${acrylic_photoprint.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{acrylic_photoprint.name}</p>
                                            </Link>
                                            <Rating rating={acrylic_photoprint.rating} numReviews={acrylic_photoprint.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{acrylic_photoprint.price}</strong>
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
export default AcrylicphotoPrint;