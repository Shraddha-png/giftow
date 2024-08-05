import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Giftset from "../Giftset";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, giftset: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, giftset: action.payload };
        default:
            return state;
    }
};

function GiftsetScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, giftset }, dispatch] = useReducer(reducer, {
        giftset: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/giftsets/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === giftset._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/giftsets/${giftset._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...giftset, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === giftset._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/giftsets/${giftset._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...giftset, quantity }
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
                '/api/giftreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    giftsetId: giftset._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/giftsets/slug/${slug}`);
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
                        <img className="img-large" src={giftset.image} alt={giftset.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{giftset.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={giftset.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({giftset.giftreviews.length})</p>
                            </li>

                            <li className="list-group-item">
                                Description:
                                <p>At **Fine Print Solutions**, we specialize in creating custom gift sets that are perfect for corporate gifting, special occasions, and promotional events. Our high-quality gift sets are designed to leave a lasting impression, combining elegance and practicality in beautifully packaged arrangements.<br />
                                    Corporate Gift Sets: Thoughtfully curated sets for business clients, partners, and employees, featuring branded items that enhance your corporate identity.<br />Luxury Gift Sets: Premium collections with high-end products and elegant packaging for special occasions and VIP recipients.<br />
                                    Personalized Gift Sets: Customizable sets with unique items tailored to the recipient's preferences, ideal for personal gifting and special celebrations.<br />Promotional Gift Sets: Branded merchandise sets designed to promote your business and increase brand awareness during events and marketing campaigns.<br />
                                    We offer a range of items that can be included in your gift sets, such as:<br />
                                    <ul>
                                        <li> Branded pens, notebooks, and stationery</li>
                                        <li> High-quality mugs, tumblers, and drinkware</li>
                                        <li> Custom apparel like t-shirts and caps</li>
                                        <li> Tech gadgets and accessories</li>
                                        <li> Luxury items such as watches and leather goods</li>
                                        <li> Personalized gifts with recipient names and messages</li>
                                    </ul><br />
                                    <b>Pricing:</b>
                                    Pricing varies based on the type of gift set, contents, quantity, and customization options. For a detailed quote tailored to your project, please contact us directly.<br />
                                    <ul>
                                        <li> **Packaging:** Choose from a variety of packaging options, including custom boxes, bags, and wrapping to enhance the presentation of your gift sets.</li>
                                        <li> **Branding:** Add your company logo, colors, and branding elements to the items and packaging for a cohesive and professional look.</li>
                                        <li> **Personalization:** Customize individual items with recipient names, messages, or specific designs for a personal touch.</li>
                                        <li> **Themes:** Create themed gift sets for specific occasions, holidays, or marketing campaigns.</li>
                                    </ul>
                                    For more information or to place an order, please reach out to us at:<br />
                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b><br />

                                    Let us help you create memorable gift sets that delight recipients and promote your brand. Contact us today to discuss your design ideas and customization options!</p></li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#giftreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="giftreviews">
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
                <Giftset />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {giftset.giftreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {giftset.giftreviews.map((review) => (
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

export default GiftsetScreen;