import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Bottlesipper from "../Botttle_sipper";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, bottle_sipper: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, bottle_sipper: action.payload };
        default:
            return state;
    }
};

function BottleSipperScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, bottle_sipper }, dispatch] = useReducer(reducer, {
        bottle_sipper: {},
        loading: true,
        error: '',
    });

    const [selectedvariety, setSelectedvariety] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/bottle_sippers/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, isLoggedIn, userInfo } = state;

    const addToCartHandler = async () => {
        if (!selectedvariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === bottle_sipper._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bottle_sippers/${bottle_sipper._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bottle_sipper, quantity, variety: selectedvariety }
        });
        navigate('/cart');
    }

    const buyNowHandler = async () => {
        if (!selectedvariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === bottle_sipper._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bottle_sippers/${bottle_sipper._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bottle_sipper, quantity, variety: selectedvariety }
        });
        navigate('/shipping');
    }

    // Review submission state
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
                '/api/bottle_Sipreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    bottle_sipperId: bottle_sipper._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/bottle_sippers/slug/${slug}`);
            dispatch({ type: 'REVIEW_SUBMITTED', payload: result.data });
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data.message : error.message);
        }
    };

    const onRatingChange = (newRating) => {
        setRating(newRating);
    };

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-5">
                    <img className="img-large" src={bottle_sipper.image} alt={bottle_sipper.name} />
                </div>
                <div className="col-md-7 box">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h3>{bottle_sipper.name}</h3>
                        </li>
                        <li className="list-group-item inlineclass">
                            <StarRating rating={bottle_sipper.rating || 0} onRatingChange={onRatingChange} />
                            <p>Review ({bottle_sipper.bottle_Sipreviews.length})</p>
                        </li>
                        <li className="list-group-item">
                            Price: {isLoggedIn ? (
                                <><i className="bi bi-currency-rupee"></i>{bottle_sipper.price}</>
                            ) : (
                                'Login/Register to see Price'
                            )}
                        </li>
                        <p>Product Code: {bottle_sipper.code}</p>
                        <h6>AVAILABLE OPTIONS</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    {[bottle_sipper.variety1, bottle_sipper.variety2, bottle_sipper.variety3, bottle_sipper.variety4].map((variety, index) => (
                                        variety !== '-' && (
                                            <td key={index}>
                                                <button
                                                    className={`btn ${selectedvariety === variety ? 'btn-primary' : 'btn-outline-primary'}`}
                                                    onClick={() => setSelectedvariety(variety)}
                                                >
                                                    {variety}
                                                </button>
                                            </td>
                                        )
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <li className="list-group-item">
                            Material: {bottle_sipper.material}
                        </li>
                        <li className="list-group-item">
                            Capacity: {bottle_sipper.capacity}
                        </li>
                        <li className="list-group-item">
                            Description:
                            <p>{bottle_sipper.description}</p>
                            <p>For more information or to place an order, please reach out to us at:<br />
                                <b>Phone: 9920033112</b><br />
                                <b>Email: fmprintsolutions@gmail.com</b>
                            </p>
                        </li>
                    </ul>
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
                                <div className="row">
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#bottle_sipreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="bottle_sipreviews">
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
                <Bottlesipper />
                {/* Existing Reviews */}
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {bottle_sipper.bottle_Sipreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {bottle_sipper.bottle_Sipreviews.map((review) => (
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
        </div>

    );
}

export default BottleSipperScreen;
