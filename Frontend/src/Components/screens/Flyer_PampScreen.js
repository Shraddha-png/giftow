import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import FlyerPamplate from "../Printing/Flyer_Pamplates";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, flyer_pamplate: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, flyer_pamplate: action.payload };
        default:
            return state;
    }
};

function FlyerPampScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, flyer_pamplate }, dispatch] = useReducer(reducer, {
        flyer_pamplate: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/flyer_pamplates/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === flyer_pamplate._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/flyer_pamplates/${flyer_pamplate._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...flyer_pamplate, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === flyer_pamplate._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/flyer_pamplates/${flyer_pamplate._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...flyer_pamplate, quantity }
        })
        navigate('/shipping ')
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
                '/api/flyerpampreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    flyer_pamplateId: flyer_pamplate._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/flyer_pamplates/slug/${slug}`);
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
                        <img className="img-large p-5" src={flyer_pamplate.image} alt={flyer_pamplate.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{flyer_pamplate.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={flyer_pamplate.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({flyer_pamplate.flyerpampreviews.length})</p>
                            </li>

                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we provide high-quality custom flyers and pamphlets designed to grab attention and effectively communicate your message. Whether for promotional events, business advertising, or informational purposes, our print materials are crafted to meet your needs and exceed your expectations.<br />
                                    <b>Our Types:</b> <br />
                                    Flyers: Single-page, versatile designs perfect for distributing information quickly and efficiently. Ideal for events, promotions, and announcements.<br />
                                    Pamphlets: Multi-page brochures with various folds (bi-fold, tri-fold) that provide detailed information and are great for educational purposes or in-depth presentations.<br />
                                    Custom Flyers/Pamphlets: Tailored designs with unique sizes, folds, and formats to match your specific requirements and branding.<br />
                                    Premium Flyers/Pamphlets: High-quality materials and finishes, such as glossy or matte coatings and heavy-duty paper stocks, for a professional look.<br />
                                    <b>Sizes:</b>
                                    We offer a range of standard sizes and custom dimensions to suit your needs, from small flyers to larger pamphlets.<br />
                                    <b>Pricing:</b>
                                    Prices vary based on type, size, and customization options. For a detailed quote based on your specific project requirements, please contact us directly.

                                    <ul>
                                        <li> **Designs:** Choose from our design templates or collaborate with our team to create a unique layout that captures your brand’s identity.</li>
                                        <li> **Content:** Personalize with your own text, images, and graphics to effectively convey your message.</li>
                                        <li> **Colors and Finishes:** Select from a variety of colors and finishes, including gloss, matte, or textured options to enhance visual appeal.</li>
                                        <li> **Paper Quality:** Choose from high-quality paper stocks such as matte, gloss, or recycled paper for durability and a premium feel.</li>
                                        <li> **Special Features:** Add special touches like perforations, die-cuts, or folding options to make your flyers or pamphlets stand out.</li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#flyerpampreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="flyerpampreviews">
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
                <FlyerPamplate />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {flyer_pamplate.flyerpampreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {flyer_pamplate.flyerpampreviews.map((review) => (
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

export default FlyerPampScreen;