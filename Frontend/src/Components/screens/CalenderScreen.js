import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Calenders from "../Printing/Calenders";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, calender: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, calender: action.payload };
        default:
            return state;
    }
};

function CalenderScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, calender }, dispatch] = useReducer(reducer, {
        calender: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/calenders/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                console.error(err);
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === calender._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/calenders/${calender._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...calender, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === calender._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/calenders/${calender._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...calender, quantity }
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
                '/api/calenderreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    calenderId: calender._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/calenders/slug/${slug}`);
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
                        <img className="img-large" src={calender.image} alt={calender.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{calender.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={calender.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({calender.calenderreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we offer custom calendar printing designed to keep your schedule organized and add a personal touch to any space. Whether for personal use, business promotions, or special events, our calendars combine functionality with style<br />
                                    <b>Our Types:</b> <br />
                                    Wall Calendars: Classic wall calendars with full-page monthly views, perfect for homes and offices.<br />
                                    Desk Calendars: Compact desk calendars with easy-to-reference monthly or daily layouts, ideal for workspaces.<br />
                                    Desk Calendars: Compact desk calendars with easy-to-reference monthly or daily layouts, ideal for workspaces.<br />
                                    Premium Calendars: High-quality materials and finishes for an upscale look, including glossy covers and premium paper stocks.<br />
                                    <b>Sizes:</b>
                                    We offer a variety of standard sizes and custom dimensions to fit your preferences and requirements, from small desk calendars to large wall formats.<br />
                                    <b>Pricing:</b>
                                    Prices vary based on calendar type, size, and customization options. For a detailed quote based on your specific needs, please contact us directly.

                                    <ul>
                                        <li> **Designs:** Create your own design or collaborate with our team to develop a custom layout that matches your style or brand.</li>
                                        <li> **Photos and Artwork:** Include your own images, artwork, or graphics to personalize each month or page.</li>
                                        <li> **Colors and Finishes:** Choose from a range of colors and finishes, including matte, gloss, or laminated covers.</li>
                                        <li> **Special Features:** Add features like custom dates, notes sections, or holiday markings for a personalized touch.</li>
                                        <li> **Binding Options:** Select from various binding options, such as spiral binding, stapled, or glued, to suit your preferences.</li>
                                    </ul>
                                    How to Contact Us:
                                    For more information or to place an order, please reach out to us at:<br />

                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b><br />

                                    Let us help you create envelopes that make a great first impression. Contact us today to discuss your customization options!
                                </p></li>
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
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#calenderreviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="calenderreviews">
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
                    <Calenders />
                    <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {calender.calenderreviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {calender.calenderreviews.map((review) => (
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

export default CalenderScreen;