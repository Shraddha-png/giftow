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
            return { ...state, bookmarks: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Bookmarks() {

    const [{ loading, error, bookmarks }, dispatch] = useReducer(reducer, {
        bookmarks: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/bookmarks');
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
                            {bookmarks.map((bookmark) => (
                                <div className="col-md-3 mb-3" key={bookmark.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/bookmark/${bookmark.slug}`}>
                                            <img src={bookmark.image} className="card-img-top" alt={bookmark.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/bookmark/${bookmark.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{bookmark.name}</p>
                                            </Link>
                                            <Rating rating={bookmark.rating} numReviews={bookmark.numReviews} />
                                           
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

export default Bookmarks;