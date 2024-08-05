import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Borosillicate from "../Sippers/Borosillicate_Glass_Bottle";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, borosilicategalssbottle: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, borosilicategalssbottle: action.payload };
        default:
            return state;
    }
};

function BorosiglasipScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, borosilicategalssbottle }, dispatch] = useReducer(reducer, {
        borosilicategalssbottle: {},
        loading: true,
        error: '',
    });

    const [selectedVariety, setSelectedVariety] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/borosilicategalssbottles/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                setSelectedPrice(result.data.price1); // Set initial price
            } catch (err) {
                console.error(err);
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, isLoggedIn, userInfo } = state;

    const handleVarietySelection = (variety, price) => {
        setSelectedVariety(variety);
        setSelectedPrice(price);
    };


    const addToCartHandler = async () => {

        if (!selectedVariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === borosilicategalssbottle._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/borosilicategalssbottles/${borosilicategalssbottle._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...borosilicategalssbottle, quantity, variety: selectedVariety, price: selectedPrice }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {

        if (!selectedVariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === borosilicategalssbottle._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/borosilicategalssbottles/${borosilicategalssbottle._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...borosilicategalssbottle, quantity, variety: selectedVariety, price: selectedPrice }
        })
        navigate('/shipping')
    }
    // ########PostRevies##############

    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const submitReview = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        try {
            const { data } = await axios.post(
                '/api/borosilislassbotreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    borosilicategalssbottlId: borosilicategalssbottle._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/borosilicategalssbottles/slug/${slug}`);
            dispatch({ type: 'REVIEW_SUBMITTED', payload: result.data });
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data.message : error.message);
        }
    };


    const onRatingChange = (newRating) => {
        setRating(newRating);
    };



    return loading ? (
        <LoadingBox />)
        : error ? (
            <MessageBox varient="danger">{error}</MessageBox>
        ) : (
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-5">
                        <img className="img-large" src={borosilicategalssbottle.image} alt={borosilicategalssbottle.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4>{borosilicategalssbottle.name}</h4>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={borosilicategalssbottle.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({borosilicategalssbottle.borosilislassbotreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{selectedPrice}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Description:
                                <pre>{borosilicategalssbottle.description}</pre></li>
                        </ul>

                        <p> Product Code: {borosilicategalssbottle.code}</p>
                        <h6>AVAILABLE OPTIONS</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>
                                        <button
                                            className={`btn ${selectedVariety === borosilicategalssbottle.variety1 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => handleVarietySelection(borosilicategalssbottle.variety1, borosilicategalssbottle.price1)}
                                        >
                                            {borosilicategalssbottle.variety1}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn ${selectedVariety === borosilicategalssbottle.variety2 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => handleVarietySelection(borosilicategalssbottle.variety2, borosilicategalssbottle.price2)}
                                        >
                                            {borosilicategalssbottle.variety2}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn ${selectedVariety === borosilicategalssbottle.variety3 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => handleVarietySelection(borosilicategalssbottle.variety3, borosilicategalssbottle.price3)}
                                        >
                                            {borosilicategalssbottle.variety3}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn ${selectedVariety === borosilicategalssbottle.variety4 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => handleVarietySelection(borosilicategalssbottle.variety4, borosilicategalssbottle.price4)}
                                        >
                                            {borosilicategalssbottle.variety4}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row p-3">
                            <div className="col-md-3">
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="d-grid">
                                            <button onClick={buyNowHandler} className="btn btn-success">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="list-group-item">
                                    <div className="d-grid">
                                        <button onClick={addToCartHandler} className="btn btn-primary">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Created Review */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mt-5">
                            <nav className="nav">
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#borosilislassbotreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="borosilislassbotreviews">
                                {userInfo ? (
                                    <form onSubmit={submitReview}>
                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">Rating</label>
                                            <StarRating rating={rating} onRatingChange={onRatingChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="comment" className="form-label">Comment</label>
                                            <textarea
                                                id="comment"
                                                className="form-control"
                                                rows="5"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit Review</button>
                                    </form>
                                ) : (
                                    <MessageBox>
                                        Please <a href="/signin">Sign In</a> to write a review
                                    </MessageBox>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h4 className="relatedspro">RELATED PRODUCTS</h4>
                </div>
                <Borosillicate />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {borosilicategalssbottle.borosilislassbotreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {borosilicategalssbottle.borosilislassbotreviews.map((review) => (
                            <li key={review._id} className="list-group-item">
                                <h5>{review.title}</h5>
                                <StarRating rating={review.rating} onRatingChange={() => { }} />
                                <p>{review.comment}</p>
                                <p>By: {review.user.fname}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
}

export default BorosiglasipScreen;