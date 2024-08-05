import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Couplemug from "../Mugs/Couple_Mug";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, couplemug: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, couplemug: action.payload };
        default:
            return state;
    }
};

function CouplemugScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, couplemug }, dispatch] = useReducer(reducer, {
        couplemug: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/couplemugs/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                console.error(err);
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        }
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, isLoggedIn, userInfo } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === couplemug._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/couplemugs/${couplemug._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...couplemug, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === couplemug._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/couplemugs/${couplemug._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...couplemug, quantity }
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
                '/api/cmugreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    couplemugId: couplemug._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/couplemugs/slug/${slug}`);
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
                        <img className="img-large" src={couplemug.image} alt={couplemug.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{couplemug.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={couplemug.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({couplemug.cmugreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price: {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{couplemug.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Description:
                                <p>Make your special moments last with personalized Couple Mugs adorned with your favorite photo and a memorable date. Delight that beautiful couple or your better half with a gift that captures your love in every sip. At Fine Multiprint Solution, we specialize in crafting custom glass beer mugs that add a touch of personalization to your drinking experience. Whether for a special event, promotional giveaway, or personal enjoyment, we offer a variety of options to suit your needs.<br />
                                    <b>Pricing</b><b />
                                    Each type and size of glass beer mug is priced differently. Please contact us directly for a detailed quote based on your specific requirements.<br />
                                    <b>Different Types of Name Customizations</b><br />
                                    Individual Names: Personalize each mug with individual names for gifts or personal use.<br />
                                    Group Names: Customize mugs with group names for parties, weddings, or corporate events.<br />
                                    Event Names: Include event names or dates to commemorate special occasions.<br />
                                    <b>Customization Options</b><br />
                                    Color Options: Select from a range of colors to match your branding or personal style.<br />
                                    Font Choices: Choose different fonts to suit your theme or personal preference.<br />
                                    Handle Personalization: Customize the mug handle with initials, small designs, or opt for a unique heart-shaped handle for added charm and uniqueness.<br />
                                    <b>Special Options for Couples and Weddings</b><br />
                                    Couples' Names: Personalize mugs with the names of the couple.<br />
                                    Wedding Dates: Include the wedding date for a lasting keepsake.<br />
                                    Photos: Print photos of the couple on the mugs for a truly unique touch.<br />
                                    For more information or to place an order, please reach out to us at:<br />
                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b>
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
                </div>

                {/* Created Review */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mt-5">
                            <nav className="nav">
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#cmugreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="cmugreviews">
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
                <Couplemug />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {couplemug.cmugreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {couplemug.cmugreviews.map((review) => (
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

export default CouplemugScreen;