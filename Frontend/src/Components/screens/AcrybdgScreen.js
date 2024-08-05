import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Metalbadge from "../Badges/Acrylic_Name_Magnetic";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, acrynamebadge: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, acrynamebadge: action.payload };
        default:

            return state;
    }
};

function AcrynabdgScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, acrynamebadge }, dispatch] = useReducer(reducer, {
        acrynamebadge: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/acrynamebadges/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === acrynamebadge._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/acrynamebadges/${acrynamebadge._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...acrynamebadge, quantity }
        })
        navigate('/cart')
    }

    // Buy Now
    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === acrynamebadge._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/acrynamebadges/${acrynamebadge._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...acrynamebadge, quantity }
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
                '/api/acrnmbgereviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    acrynamebadgeId: acrynamebadge._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/acrynamebadges/slug/${slug}`);
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
                    <div className="col-md-5 ">
                        <img className="img-large p-5" src={acrynamebadge.image} alt={acrynamebadge.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4>{acrynamebadge.name}</h4>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={acrynamebadge.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({acrynamebadge.acrnmbgereviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{acrynamebadge.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At Fine Multiprint Solution, we specialize in crafting custom acrylic name badges that enhance your professional image with personalized flair. Whether for corporate events, conferences, or everyday office use, we offer a variety of options to suit your needs.</p><br />
                                <li><b>Standard Acrylic Badges:</b> Sleek and professional, perfect for daily wear.</li>
                                <li><b>Colorful Acrylic Badges:</b> Vibrant options to match your brand or personal style.</li>
                                <li><b>Premium Acrylic Badges:</b> Elegant designs with metal accents for a sophisticated look.</li>
                                <b>Sizes:</b><br />
                                Choose from different sizes, including standard rectangular or custom shapes, to suit your preference.<br />
                                <b>Pricing:</b><br />
                                Each type and size of acrylic name badge is priced differently. Please contact us directly for a detailed quote based on your specific requirements.<br />
                                <b>Different Types of name</b>
                                <li><b>Individual Names:</b>Personalize each badge with individual names for team members or event attendees.</li>
                                <li><b>Position Titles:</b> Include job titles or positions to distinguish roles within your organization.</li>
                                <li><b>Event Names:</b>Customize badges with event names or themes for special occasions.</li>
                                <b>Customization Options:</b>
                                <li><b>Logo Integration</b> Include your company logo or event branding for added visibility.</li>
                                <li><b>Color Options</b> Choose from a range of colors to complement your design aesthetic.</li>
                                <li><b>Font Choices</b>Select from various fonts to match your corporate identity or personal preference.</li>
                                How to Contact Us:
                                For more information or to place an order, please reach out to us at:<br />

                                <b> Phone: 9920033112</b><br />
                                <b> Email: fmprintsolutions@gmail.com</b><br />
                                Let us help you create memorable awards that reflect the uniqueness of your achievements. Contact us today to discuss your customization ideas!
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
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#acrnmbgereviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="acrnmbgereviews">
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
                    <Metalbadge />

                    <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {acrynamebadge.acrnmbgereviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {acrynamebadge.acrnmbgereviews.map((review) => (
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

export default AcrynabdgScreen;