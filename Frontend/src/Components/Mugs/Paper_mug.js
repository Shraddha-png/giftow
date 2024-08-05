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
            return { ...state, paper_mugs: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Papermug() {

    const [{ loading, error, paper_mugs }, dispatch] = useReducer(reducer, {
        paper_mugs: [],
        loading: true,
        error: '',
    });
   

    const { state } = useContext(Store);
	const isLoggedIn = state.userInfo !== null; // Check if user is logged in
  

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/paper_mugs');
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
                <h1>Feature Product</h1>
                <div className="container-fluid">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox varient="danger">{error}</MessageBox>
                    ) : (
                        <div className="row">
                            {paper_mugs.map((paper_mug) => (
                                <div className="col-md-3 mb-3" key={paper_mug.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/paper_mug/${paper_mug.slug}`}>
                                            <img src={paper_mug.image} className="card-img-top" alt={paper_mug.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/paper_mug/${paper_mug.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{paper_mug.name}</p>
                                            </Link>
                                            <Rating rating={paper_mug.rating} numReviews={paper_mug.numReviews} />
											{isLoggedIn ? (
                                                <p className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{paper_mug.price}</strong>
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
export default Papermug;