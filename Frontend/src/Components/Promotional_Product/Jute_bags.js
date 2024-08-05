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
            return { ...state, jutebags: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function JuteBag() {

    const [{ loading, error, jutebags }, dispatch] = useReducer(reducer, {
        jutebags: [],
        loading: true,
        error: '',
    });
   

   
	// const isLoggedIn = state.userInfo !== null; // Check if user is logged in
   

   
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/jutebags');
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
                            {jutebags.map((jutebag) => (
                                <div className="col-md-3 mb-3" key={jutebag.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/jutebag/${jutebag.slug}`}>
                                            <img src={jutebag.image} className="card-img-top px-5" alt={jutebag.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/jutebag/${jutebag.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{jutebag.name}</p>
                                            </Link>
                                            <Rating rating={jutebag.rating} numReviews={jutebag.numReviews} />
											
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


export default JuteBag;