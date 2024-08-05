import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Brochures from "../Printing/Brochures";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, brochure: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
            return { ...state, brochure: action.payload };
        default:
            return state;
    }
};

function BrochureScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, brochure }, dispatch] = useReducer(reducer, {
        brochure: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/brochures/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === brochure._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/brochures/${brochure._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...brochure, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === brochure._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/brochures/${brochure._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...brochure, quantity }
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
                '/api/brochurereviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    brochureId: brochure._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/brochures/slug/${slug}`);
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
                        <img className="img-large p-5" src={brochure.image} alt={brochure.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{brochure.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={brochure.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({brochure.brochurereviews.length})</p>
                            </li>

                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we specialize in crafting high-quality custom brochures that effectively communicate your message and captivate your audience. Whether you need brochures for marketing, informational purposes, or events, we provide a range of options to fit your needs.<br />
                                    <b>Our Types:</b> <br />
                                    Tri-Fold Brochures: Classic design with three panels, ideal for providing detailed information in a compact format.<br />
                                    Bi-Fold Brochures: Two-panel layout for a sleek, easy-to-read presentation.<br />
                                    Custom Brochures: Tailored designs with unique folds, sizes, and formats to suit your specific requirements.<br />
                                    Premium Brochures: High-end materials and finishes, such as glossy or matte coatings and high-quality paper stocks, for a professional look.<br />
                                    <b>Sizes:</b>
                                    We offer various standard sizes and custom dimensions to ensure your brochures meet your specific needs.<br />
                                    <b>Pricing:</b>
                                    Prices vary based on brochure type, size, and customization options. For a detailed quote based on your project requirements, please contact us directly.

                                    <ul>
                                        <li> **Designs:** Choose from our design templates or work with our team to create a custom layout that aligns with your brand.</li>
                                        <li> **Content:** Personalize your brochures with custom text, images, and graphics to effectively convey your message.</li>
                                        <li> **Colors and Finishes:** Select from a range of colors and finishes, including glossy, matte, or textured options.</li>
                                        <li> **Paper Quality:** Choose from various high-quality paper stocks, such as matte, gloss, or recycled paper.</li>
                                        <li> **Special Features:** Add special touches like embossed text, foil stamping, or die-cut shapes for added impact.</li>
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
                
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mt-5">
                                <nav className="nav">
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#brochurereviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="brochurereviews">
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
                    <Brochures />
                    <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {brochure.brochurereviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {brochure.brochurereviews.map((review) => (
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

export default BrochureScreen;