import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Bomboo from "../Sippers/Bomboo_bottle";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, bomboobottle: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
                return { ...state, bomboobottle: action.payload };
        default:
            return state;
    }
};

function BombooScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, bomboobottle }, dispatch] = useReducer(reducer, {
        bomboobottle: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/bomboobottles/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                console.error(err);
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, isLoggedIn, userInfo } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === bomboobottle._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bomboobottles/${bomboobottle._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bomboobottle, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === bomboobottle._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bomboobottles/${bomboobottle._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bomboobottle, quantity }
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
                '/api/bamboobotreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    bomboobottleId: bomboobottle._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/bomboobottles/slug/${slug}`);
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
                        <img className="img-large" src={bomboobottle.image} alt={bomboobottle.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{bomboobottle.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={bomboobottle.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({bomboobottle.bamboobotreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{bomboobottle.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Description:
                                <p>Bamboo and Stainless Steel Construction: The Bamboo Oasis Water Bottle brings together the strength of stainless steel and the natural beauty of bamboo. The result is a durable, eco-friendly companion that not only looks good but also stands the test of time. <br />
                                    Leak-Proof Design: Experience worry-free hydration with our leak-proof design. The bamboo lid with a silicone seal ensures a tight seal, preventing spills and leaks whether you're on your daily commute, at the gym, or exploring the great outdoors.<br />
                                    Stylish Bamboo Exterior: The exterior of the bottle features a bamboo sleeve, not only providing a stylish and natural aesthetic but also adding a comfortable grip that stays cool to the touch. Embrace the beauty of nature while you stay hydrated.<br />
                                    Wide Mouth Opening: The wide mouth of the bottle makes filling, pouring, and cleaning a breeze. Whether you prefer ice-cold water, hot tea, or a refreshing smoothie, the Bamboo Oasis Water Bottle is versatile and accommodating.<br />
                                    Environmentally Friendly Choice: By choosing the Bamboo Oasis Water Bottle, you're making a positive choice for the environment. Reduce single-use plastic waste and embrace a sustainable lifestyle with a reusable and eco-conscious water bottle.</p></li>
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
                                    <div className="d-grid">
                                        <button onClick={addToCartHandler} className="btn btn-primary">Add To Cart</button>
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
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#bamboobotreviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="bamboobotreviews">
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
                    <Bomboo />
                    <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {bomboobottle.bamboobotreviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {bomboobottle.bamboobotreviews.map((review) => (
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

export default BombooScreen;