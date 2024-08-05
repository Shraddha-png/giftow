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
            return { ...state, folders: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function FolderDesktop() {

    const [{ loading, error, folders }, dispatch] = useReducer(reducer, {
        folders: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/folders');
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
                            {folders.map((folder) => (
                                <div className="col-md-3 mb-3" key={folder.slug}>
                                    <div className="product card mt-3 cardhoverhold">
                                        <Link to={`/folder/${folder.slug}`}>
                                            <img src={folder.image} className="card-img-top px-5" alt={folder.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/folder/${folder.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{folder.name}</p>
                                            </Link>
                                            <Rating rating={folder.rating} numReviews={folder.numReviews} />
											
                                           
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

export default FolderDesktop;