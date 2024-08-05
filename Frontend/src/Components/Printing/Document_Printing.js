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
            return { ...state, document_printings: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function DocumentPrinting() {

    const [{ loading, error, document_printings }, dispatch] = useReducer(reducer, {
        document_printings: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/document_printings');
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
                            {document_printings.map((document_printing) => (
                                <div className="col-md-3 mb-3" key={document_printing.slug}>
                                    <div className="product card mt-3  cardhover">
                                        <Link to={`/document_printing/${document_printing.slug}`}>
                                            <img src={document_printing.image} className="card-img-top" alt={document_printing.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/document_printing/${document_printing.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{document_printing.name}</p>
                                            </Link>
                                            <Rating rating={document_printing.rating} numReviews={document_printing.numReviews} />
                                           
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

export default DocumentPrinting;