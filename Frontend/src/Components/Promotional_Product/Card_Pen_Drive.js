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
            return { ...state, cardpendrives: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function CardPenDrive() {

    const [{ loading, error, cardpendrives }, dispatch] = useReducer(reducer, {
        cardpendrives: [],
        loading: true,
        error: '',
    });
   



   

   
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/cardpendrives');
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
             
                <div className="conatiner-fluid">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {cardpendrives.map((cardpendrive) => (
                                <div className="col-md-3 mb-3" key={cardpendrive.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/cardpendrive/${cardpendrive.slug}`}>
                                            <img src={cardpendrive.image} className="card-img-top" alt={cardpendrive.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/cardpendrive/${cardpendrive.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{cardpendrive.name}</p>
                                            </Link>
                                            <Rating rating={cardpendrive.rating} numReviews={cardpendrive.numReviews} />
                                           
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

export default CardPenDrive;