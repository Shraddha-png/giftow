import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Sticker from "../Printing/Stiker";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, sticker: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
                return { ...state, sticker: action.payload };
        default:
            return state;
    }
};

function StickerScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, sticker }, dispatch] = useReducer(reducer, {
        sticker: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/stickers/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === sticker._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/stickers/${sticker._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...sticker, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === sticker._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/stickers/${sticker._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...sticker, quantity }
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
                '/api/stickerreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    stickerId: sticker._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/stickers/slug/${slug}`);
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
                        <img className="img-large p-5" src={sticker.image} alt={sticker.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{sticker.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={sticker.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({sticker.stickerreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**, we offer custom sticker printing services designed to make your brand, message, or personal touch stand out. From promotional stickers to decorative designs, our high-quality printing ensures vibrant colors and durable materials that can be used for a variety of applications.<br />
                                    <b>Our Types:</b> <br />
                                    Standard Stickers: Classic designs with a range of sizes and shapes, perfect for general use and promotions.<br />
                                    Custom Stickers: Fully personalized stickers with unique shapes, sizes, and designs to fit your specific needs and branding.<br />
                                    Premium Stickers: High-end options including weather-resistant materials, glossy or matte finishes, and specialty shapes for a professional and long-lasting result.<br />

                                    <b>Sizes:</b>
                                    We offer a variety of standard sizes and custom dimensions to fit your specific design needs. Common sizes include 2” x 2”, 3” x 3”, and 4” x 6”. Custom sizes and shapes are available upon request.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on sticker type, size, quantity, and customization options. For a detailed quote tailored to your project, please contact us directly.
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or work with our team to create a unique design that aligns with your brand or message.</li>
                                        <li> **Shapes:** Opt for standard shapes like circles and rectangles, or choose custom die-cut shapes for a distinctive look.</li>
                                        <li> **Colors and Finishes:** Select from a range of colors and finishes, including full-color printing, gloss, matte, or clear backgrounds.</li>
                                        <li> **Materials:** Choose from various materials such as vinyl, paper, or transparent film for durability and application versatility.</li>
                                        <li> **Special Features:** Add features like waterproofing, scratch-resistance, or easy-peel backing for added functionality and durability.</li>
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
                </div>
                {/* Created Review */}
                <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mt-5">
                                <nav className="nav">
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#stickerreviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="stickerreviews">
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
                <Sticker />
                <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {sticker.stickerreviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {sticker.stickerreviews.map((review) => (
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

export default StickerScreen;