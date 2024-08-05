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
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, clothings: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Clothing() {
    const [{ loading, error, clothings }, dispatch] = useReducer(reducer, {
        clothings: [],
        loading: true,
        error: '',
    });


    const { state} = useContext(Store);
    const isLoggedIn = state.userInfo !== null; // Check if user is logged in




    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/clothings');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

    return (
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
                            {clothings.map((clothing) => (
                                <div className="col-md-3 mb-3" key={clothing.slug}>
                                    <div className="product card mt-3 cardhover">
                                        <Link to={`/clothing/${clothing.slug}`} >
                                            <img src={clothing.image} className="card-img-top catimg" alt={clothing.name} />
                                        </Link>
                                        <div className="card-body">
                                            <Link to={`/clothing/${clothing.slug}`} className="txtdco">
                                                <h4 className="card-title">{clothing.name}</h4>
                                            </Link>
                                            <Rating rating={clothing.rating} numReviews={clothing.numReviews} />
                                            {isLoggedIn ? (
                                                <h4 className="card-text">
                                                    <strong><i className="bi bi-currency-rupee"></i>{clothing.price}</strong>
                                                </h4>
                                            ) : (
                                                <h4 className="card-text">Login/Register to see Price</h4>
                                            )}
                                           
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* <div className="container-fluid">
               
                <div className="container-fluid p-0">
                    <div className="row mt-3">
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/poloTshirts">
                                    <img className="card-img-top catimg" src="/images/T-shirts/polo t-shirts/V VALANCH Golf Polo Shirts for Men Short Sleeve Moisture Wicking Summer Casual Collared Shirts Tennis Polo.jpeg" alt="Awards" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/poloTshirts'><h4 className="text-center categorybag">Polo T-Shirt</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/coupleTshirts">
                                    <img className="card-img-top catimg" src="/images/T-shirts/couple t-shirts/Valentines Day Shirts  Custom Couple Shirts  Husband And Wife Matching Shirts  Matching T Shirts For Couples  His And Her Valentine Shirts  Husband And Wife Shirt.jpeg" alt="Badges" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/coupleTshirts'><h4 className="text-center categorybag">Couple T-Shirt</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/dryFitTshirts">
                                    <img className="card-img-top catimg" src="/images/T-shirts/Dry Fit Tshirts/Nike Ss Youth Park VI Sportshirt Kinderen - Midnight Navy_Wit - Maat 128.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/dryFitTshirts'><h4 className="text-center categorybag">Dry Fit T-Shirt</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/sportsTshirts">
                                    <img className="card-img-top catimg" src="/images/T-shirts/sports tshirts/Men's adidas Stripe Printing Sports Short Sleeve Black T-Shirt HM5150.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/sportsTshirts'><h4 className="text-center categorybag">Sports T-Shirts</h4></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-5">
               
                <div className="container-fluid p-0">
                    <div className="row mt-3">
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/girlsTshirts">
                                    <img className="card-img-top catimg" src="/images/T-shirts/girls tshirts/Young Women's Tees _ Juniors Tops, Graphic Tees, Basics.jpeg" alt="Awards" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/girlsTshirts'><h4 className="text-center categorybag">Girls T-Shirt</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/fullSleevesTshirts">
                                    <img className="card-img-top catimg" src="/images/T-shirts/full sleave t-shirts/T-Shirt Men Cotton T Shirt Full Sleeve - White _ L.jpeg" alt="Badges" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/fullSleevesTshirts'><h4 className="text-center categorybag">full Sleeves T-Shirt</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/familyTshirts">
                                    <img className="card-img-top catimg" src="/images/T-shirts/family tishirts/Family Matching Love Shirt, Valentines Day Mommy Daddy Baby Tee, Mothers Day Tees, New Mama Dada Shirt, Fathers Day Outfit, Baby Shower Gift.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/familyTshirts'><h4 className="text-center categorybag">Family T-Shirt</h4></Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default Clothing;

