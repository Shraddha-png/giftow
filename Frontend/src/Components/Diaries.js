import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Ratings";

import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: ''  };
        case 'FETCH_SUCCESS':
            return { ...state, diaries: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Diaries() {
    const [{ loading, error, diaries }, dispatch] = useReducer(reducer, {
        diaries: [],
        loading: true,
        error: '',
    });
    // const [diarys, setProducts] = useState([]);

  
   
  

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/diaries');
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
                            {diaries.map((diary) => (
                                <div className="col-md-3 mb-3" key={diary.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/diary/${diary.slug}`}>
                                            <img src={diary.image} className="card-img-top px-5" alt={diary.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/diary/${diary.slug}`}>
                                                <p className="card-title">{diary.name}</p>
                                            </Link>
                                            <Rating rating={diary.rating} numReviews={diary.numReviews} />
                                            
                                            
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
export default Diaries;

