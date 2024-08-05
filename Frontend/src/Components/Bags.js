

import React, { useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { Store } from "./Store";
import Rating from "./Ratings";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, bags: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Bags() {
    const [{ loading, error, bags }, dispatch] = useReducer(reducer, {
        bags: [],
        loading: true,
        error: '',
    });
    const { state } = useContext(Store);
    const isLoggedIn = state.userInfo !== null; // Check if user is logged in




    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/bags');
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
            <div className="container-fluid">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox varient="danger">{error}</MessageBox>
                ) : (
                    <div className="row">
                        {bags.map((bag) => (
                            <div className="col-md-3 mb-3" key={bag.slug}>
                                <div className="product card mt-3 ">
                                    <Link to={`/bag/${bag.slug}`} className="txtdco">
                                        <img src={bag.image} className="card-img-top catimg px-5 cardhover" alt={bag.name} />
                                    </Link>
                                    <div className="card-body">
                                        <Link to={`/bag/${bag.slug}`}>
                                            <p className="card-title">{bag.name}</p>
                                        </Link>
                                        <Rating rating={bag.rating} numReviews={bag.numReviews} />
                                        {isLoggedIn ? (
                                            <h4 className="card-text">
                                                <strong><i className="bi bi-currency-rupee"></i>{bag.price}</strong>
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


            {/* <div className="container-fluid">

<div className="container-fluid p-0">
    <div className="row mt-3">
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/backpack">
                    <img className="card-img-top catimg" src="/images/Bags/Bagpack/1pc 15_6 Inch Large Capacity Backpack Oxford Cloth Mens Backpack Lightweight Simple Travel Bag School Bag Business Laptop Bag Waterproof - Copy.jpeg" alt="Awards" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/backpack'><h4 className="text-center categorybag">Bagpack</h4></Link>
                </div>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/toteBag">
                    <img className="card-img-top catimg" src="/images/Bags/Tote Bag.jpg" alt="Badges" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/toteBag'><h4 className="text-center categorybag">Tote Bags</h4></Link>
                </div>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/slingbag">
                    <img className="card-img-top catimg" src="/images/bags and wallets/siling bags/Daylite Sling Umhängetasche.jpeg" alt="Bags" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/slingbag'><h4 className="text-center categorybag">Slings Bags</h4></Link>
                </div>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/travelbag">
                    <img className="card-img-top catimg" src="/images/bags and wallets/travel bag/Bolsa De Viagem Modelo Expansiva.jpeg" alt="Bags" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/travelbag'><h4 className="text-center categorybag">Travel Bags</h4></Link>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div className="container-fluid">

<div className="container-fluid p-0">
    <div className="row mt-3">
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/schoolbag">
                    <img className="card-img-top catimg" src="/images/bags and wallets/school bag/Temu｜Multi-pocket Nylon School Backpack For Women, High Capacity, Lightweight Backpack.jpeg" alt="Awards" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/schoolbag'><h4 className="text-center categorybag">School Bags</h4></Link>
                </div>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/nonwoven_bag">
                    <img className="card-img-top catimg" src="/images/Bags/Nonwoven bags/Custom Laminated Totes Collection.jpeg" alt="Badges" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/nonwoven_bag'><h4 className="text-center categorybag">Non Woven Bags</h4></Link>
                </div>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/juteBag">
                    <img className="card-img-top catimg" src="/images/Bags/White Jute Bag.jpg" alt="Bags" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/juteBag'><h4 className="text-center categorybag">Jute Bags</h4></Link>
                </div>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="card p-4" style={{ width: '15 rem' }}>
                <Link to="/wildcraft_bag">
                    <img className="card-img-top catimg" src="/images/bags and wallets/wildcraft bag/Small Gym Bag, Workout Bag (Armygreen) _ Color_ Green_Tan _ Size_ Os.jpeg" alt="Bags" height='390px' />
                </Link>
                <hr />
                <div className="card-title">
                    <Link to='/wildcraft_bag'><h4 className="text-center categorybag">Wildcraft Bags</h4></Link>
                </div>
            </div>
        </div>
    </div>
</div>
</div> */}
        </>
    );
}

export default Bags;
