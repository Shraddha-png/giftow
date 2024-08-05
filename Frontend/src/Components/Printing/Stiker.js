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
            return { ...state, stickers: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Sticker() {

    const [{ loading, error, stickers }, dispatch] = useReducer(reducer, {
        stickers: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/stickers');
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
                            {stickers.map((sticker) => (
                                <div className="col-md-3 mb-3" key={sticker.slug}>
                                    <div className="product card mt-3  cardhoverhold">
                                        <Link to={`/sticker/${sticker.slug}`}>
                                            <img src={sticker.image} className="card-img-top" alt={sticker.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/sticker/${sticker.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{sticker.name}</p>
                                            </Link>
                                            <Rating rating={sticker.rating} numReviews={sticker.numReviews} />
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

export default Sticker;