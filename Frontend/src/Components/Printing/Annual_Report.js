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
            return { ...state, annual_Reports: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function AnnualReport() {

    const [{ loading, error, annual_Reports }, dispatch] = useReducer(reducer, {
        annual_Reports: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/annual_Reports');
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
                            {annual_Reports.map((annual_Report) => (
                                <div className="col-md-3 mb-3" key={annual_Report.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/annual_Report/${annual_Report.slug}`}>
                                            <img src={annual_Report.image} className="card-img-top" alt={annual_Report.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/annual_Report/${annual_Report.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{annual_Report.name}</p>
                                            </Link>
                                            <Rating rating={annual_Report.rating} numReviews={annual_Report.numReviews} />
                                           
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

export default AnnualReport;