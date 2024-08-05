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
            return { ...state, project_reports: action.payload, loading: false, error: ''  };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function ProjectReport() {

    const [{ loading, error, project_reports }, dispatch] = useReducer(reducer, {
        project_reports: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/project_reports');
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
                            {project_reports.map((project_report) => (
                                <div className="col-md-3 mb-3" key={project_report.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/project_report/${project_report.slug}`}>
                                            <img src={project_report.image} className="card-img-top" alt={project_report.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/project_report/${project_report.slug}`} className="txtdco">
                                                <p className="card-title txtdco">{project_report.name}</p>
                                            </Link>
                                            <Rating rating={project_report.rating} numReviews={project_report.numReviews} />
										
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

export default ProjectReport;