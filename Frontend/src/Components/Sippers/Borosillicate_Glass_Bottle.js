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
            return { ...state, borosilicategalssbottles: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Borosillicate() {

    const [{ loading, error, borosilicategalssbottles }, dispatch] = useReducer(reducer, {
        borosilicategalssbottles: [],
        loading: true,
        error: '',
    });
   

    // const { state } = useContext(Store);

   
    

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/borosilicategalssbottles');
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
                            {borosilicategalssbottles.map((borosilicategalssbottle) => (
                                <div className="col-md-3 mb-3" key={borosilicategalssbottle.slug}>
                                    <div className="product card mt-3 cardhoverhold">
                                        <Link to={`/borosilicategalssbottle/${borosilicategalssbottle.slug}`}>
                                            <img src={borosilicategalssbottle.image} className="card-img-top" alt={borosilicategalssbottle.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/borosilicategalssbottle/${borosilicategalssbottle.slug}`}>
                                                <p className="card-title">{borosilicategalssbottle.name}</p>
                                            </Link>
                                            <Rating rating={borosilicategalssbottle.rating} numReviews={borosilicategalssbottle.numReviews} />
                                          
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
export default Borosillicate;