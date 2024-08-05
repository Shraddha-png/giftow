import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Pocketbadge from "../Badges/Pocket_Magnetic";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, pocmagbadge: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, pocmagbadge: action.payload };
        default:
            return state;
    }
};

function PocmgbdgScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, pocmagbadge }, dispatch] = useReducer(reducer, {
        pocmagbadge: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/pocmagbadges/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === pocmagbadge._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/pocmagbadges/${pocmagbadge._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...pocmagbadge, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === pocmagbadge._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/pocmagbadges/${pocmagbadge._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...pocmagbadge, quantity }
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
                '/api/pockbdgreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    pocmagbadgeId: pocmagbadge._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/pocmagbadges/slug/${slug}`);
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
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-5">
                        <img className="img-large" src={pocmagbadge.image} alt={pocmagbadge.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{pocmagbadge.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={pocmagbadge.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({pocmagbadge.pockbdgreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{pocmagbadge.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Description:
                                <p>At Fine Multiprint Solution, we specialize in creating custom pocket magnetic badges that offer a convenient and damage-free solution for professional identification. Perfect for corporate settings, events, and promotional purposes, our pocket magnetic badges can be personalized with names, logos, and designs to meet your specific needs.Our pocket magnetic badges are designed for ease of use and a professional appearance, making them ideal for various applications.<br />
                                    <b>Customization Options</b>
                                    <li>Personalized Printing: Add names, titles, company logos, or custom designs to each badge using high-quality printing techniques. Ensure your design stands out with crisp and vibrant prints.</li>
                                    <li>Design Flexibility: Customize the shape, size, and layout of the badges to match your brand or event theme. Options include rectangular, oval, round, or custom shapes.</li>
                                    <li>Material Choices: Choose from durable materials such as metal, plastic, or acrylic to create the perfect look and feel for your badges.</li>
                                    <li>Color Options: Select from a wide range of background and text colors to match your branding or personal preferences. High-quality printing ensures color accuracy and vibrancy.</li>
                                    <b>Features of Custom Pocket Magnetic Badges</b>
                                    Durable Construction: Made from high-quality materials to ensure longevity and resistance to wear and tear.<br />
                                    Secure Magnetic Attachment: Features strong magnets for easy and secure attachment to clothing without causing damage or leaving pinholes. The magnet system typically consists of a magnetic bar placed inside the pocket, which attaches to a magnetic backing on the badge.<br />
                                    Professional Appearance: Designed to provide a polished and professional look, enhancing the image of your brand or event.<br />
                                    <b>Special Uses for Pocket Magnetic Badges</b><br />
                                    Corporate Use: Ideal for employee identification in office settings, retail environments, or customer service roles. Enhance professionalism and brand recognition with customized badges.
                                    Events and Conferences: Perfect for attendees at conferences, seminars, or networking events. Ensure easy identification and add a professional touch to your event.
                                    Promotional Purposes: Great for brand ambassadors, promotional staff, or trade show representatives. Customize with your logo and brand message for increased visibility and engagement.
                                    Personal Gifts: Create personalized badges for special occasions such as graduations, retirements, or recognition awards. Add names, titles, or meaningful messages to commemorate the event.<br />
                                    For more information or to place an order, please reach out to us at:<br />
                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b></p></li>
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
                </div>
                 {/* Created Review */}
                 <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mt-5">
                                <nav className="nav">
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#pockbdgreviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="pockbdgreviews">
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
                <Pocketbadge />
                <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {pocmagbadge.pockbdgreviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {pocmagbadge.pockbdgreviews.map((review) => (
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

export default PocmgbdgScreen;