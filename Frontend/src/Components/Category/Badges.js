

import React, { useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Store } from "../Store";
import Rating from "../Ratings";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, badges: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Badges() {

    const [{ loading, error, badges }, dispatch] = useReducer(reducer, {
        badges: [],
        loading: true,
        error: '',
    });
    const { state } = useContext(Store);
    const isLoggedIn = state.userInfo !== null; // Check if user is logged in





    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/badges');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* ########## Add Product ########## */}
            <div className="container-fluid mt-3">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox varient="danger">{error}</MessageBox>
                ) : (
                    <div className="row">
                        {badges.map((badge) => (
                            <div className="col-md-3 mb-3" key={badge.slug}>
                                <div className="product card cardhover">
                                    <Link to={`/badge/${badge.slug}`}>
                                        <img src={badge.image} className="card-img-top" alt={badge.name} />
                                    </Link>
                                    <div className="card-body">
                                        <Link to={`/badge/${badge.slug}`} className="txtdco">
                                            <p className="card-title">{badge.name}</p>
                                        </Link>
                                        <Rating rating={badge.rating} numReviews={badge.numReviews} />
                                        {isLoggedIn ? (
                                            <p className="card-text">
                                                <strong><i className="bi bi-currency-rupee"></i>{badge.price}</strong>
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



            {/* <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card cardhover" style={{ width: '26rem' }}>
                            <Link to='#'><img src="/images/Name Badges/Metal badges/Silver gradient add logo business staff employee name tag  Zazzle.jpeg" alt='' width='100%' height='350px'></img></Link>
                            <div className="card-body">
                                <Link to=''><div className="card-title">
                                    Metal Name Tag</div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card cardhover" style={{ width: '26rem' }}>
                            <Link to='#'><img src="/images/Name Badges/Round badges/Free Button Mockup.jpeg" alt='' width='100%' height='350px' ></img></Link>
                            <div className="card-body">
                                <Link to=''><div className="card-title">
                                    Round Pin Badge</div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card cardhover" style={{ width: '26rem' }}>
                            <Link to='#'><img src="/images/Name Badges/Metal badges/Corporate Logo Professional Employee Faux Gold Name Tag  Zazzle.jpeg" alt='' width='100%' height='350px' ></img></Link>
                            <div className="card-body">
                                <Link to=''><div className="card-title">
                                    Rose Gold Metal Tag Nametag</div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card cardhover" style={{ width: '26rem' }}>
                            <Link to='#'><img src="/images/Name Badges/Dome Name Badge/Name Badges & Name Tags _ Full Colour _ Magnetic _ Pins.jpeg" alt='' width='100%' height='350px' ></img></Link>
                            <div className="card-body">
                                <Link to=''><div className="card-title">
                                    Dom Magnetic Badge</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card cardhover" style={{ width: '26rem' }}>
                            <Link to='#'><img src="/images/Name Badges/Wodden Badges/Wooden Name Badges _ Custom Designed & Manufactured.jpeg" alt='' width='100%' height='350px'></img></Link>
                            <div className="card-body">
                                <Link to=''><div className="card-title">
                                    Wooden Engraved Name Tag</div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card cardhover" style={{ width: '26rem' }}>
                            <Link to='#'><img src="/images/Name Badges/Acrylic name badge/acrylic-magnetic-pocket-name-tag-badge-1000x1000-removebg-preview.png" alt='' width='100%' height='350px' ></img></Link>
                            <div className="card-body">
                                <Link to=''><div className="card-title">Sunboard and Acrylic Name Tas</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    );
}

export default Badges;
