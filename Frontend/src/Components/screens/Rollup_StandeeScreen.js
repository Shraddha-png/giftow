import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Standee from "../Printing/Rollup_Standee";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, standee: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, standee: action.payload };
        default:
            return state;
    }
};

function RollupStandeeScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, standee }, dispatch] = useReducer(reducer, {
        standee: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/standees/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === standee._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/standees/${standee._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...standee, quantity }
        })
        navigate('/cart')
    }
    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === standee._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/standees/${standee._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...standee, quantity }
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
                '/api/standeereviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    standeeId: standee._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/standees/slug/${slug}`);
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
                        <img className="img-large" src={standee.image} alt={standee.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{standee.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={standee.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({standee.standeereviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we offer high-quality custom roll-up standees that make a powerful visual impact for your events, promotions, and business displays. Ideal for trade shows, conferences, and in-store marketing, our roll-up standees are designed to capture attention and convey your message effectively.<br />
                                    <b>Our Types:</b> <br />
                                    Standard Roll-Up Standees: Traditional design with a retractable mechanism, perfect for general use.<br />
                                    Custom Roll-Up Standees: Tailored designs with unique sizes and finishes to fit your specific needs and branding.<br />
                                    Custom Brochures: Tailored designs with unique folds, sizes, and formats to suit your specific requirements.<br />
                                    Premium Roll-Up Standees: High-end materials and finishes, including durable bases and high-quality print media, for a professional look.<br />
                                    <b>Sizes:</b>
                                    We offer various standard sizes and custom dimensions to accommodate different display requirements, including widths from 24” to 36” and heights up to 80”.<br />
                                    <b>Pricing:</b>
                                    Prices vary based on standee type, size, and customization options. For a detailed quote tailored to your project, please contact us directly.

                                    <ul>
                                        <li> **Designs:** Create your own design or collaborate with our team to develop a visually compelling layout that represents your brand or message.</li>
                                        <li> **Graphics:** Incorporate your own images, logos, and text for a fully customized look.</li>
                                        <li> **Colors and Finishes:** Choose from a variety of colors and finishes, including matte, gloss, and UV-resistant options to enhance visibility and durability.</li>
                                        <li> **Special Features:** Add features like retractable mechanisms, carrying cases, or interchangeable graphics for added convenience and flexibility.</li>
                                        <li> **Materials:** Select from high-quality materials such as durable vinyl or fabric to ensure long-lasting use.</li>
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
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="list-group">
                                <div className="list-group-item">
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Status:</div>
                                        <div className="d-grid">
                                            <button onClick={buyNowHandler} className="btn btn-success">Buy Now</button>
                                        </div>
                                    </div>
                                </div>

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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#standeereviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="standeereviews">
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
                <Standee />

                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {standee.standeereviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {standee.standeereviews.map((review) => (
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

export default RollupStandeeScreen;