import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../Ratings";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, totebags: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function ToteBags() {

    const [{ loading, error, totebags }, dispatch] = useReducer(reducer, {
        totebags: [],
        loading: true,
        error: '',
    });
   

	// const isLoggedIn = state.userInfo !== null; // Check if user is logged in
    
   
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/totebags');
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
                            {totebags.map((totebag) => (
                                <div className="col-md-3 mb-3" key={totebag.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/totebag/${totebag.slug}`}>
                                            <img src={totebag.image} className="card-img-top px-5" alt={totebag.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/totebag/${totebag.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{totebag.name}</p>
                                            </Link>
                                            <Rating rating={totebag.rating} numReviews={totebag.numReviews} />
											
                                           
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

export default ToteBags;