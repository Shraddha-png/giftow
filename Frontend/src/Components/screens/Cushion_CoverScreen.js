import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import CushionCover from "../Cushion_Cover";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, cushion_cover: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, cushion_cover: action.payload };

        default:
            return state;
    }
};

function CushionCoverScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, cushion_cover }, dispatch] = useReducer(reducer, {
        cushion_cover: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/cushion_covers/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === cushion_cover._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/cushion_covers/${cushion_cover._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...cushion_cover, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === cushion_cover._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/cushion_covers/${cushion_cover._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...cushion_cover, quantity }
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
                '/api/cushionCoverreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    cushion_coverId: cushion_cover._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/cushion_covers/slug/${slug}`);
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
                    <div className="col-md-5 p-5">
                        <img className="img-large p-5" src={cushion_cover.image} alt={cushion_cover.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{cushion_cover.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={cushion_cover.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({cushion_cover.cushionCoverreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price: {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{cushion_cover.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At **Fine Print Solutions**, we specialize in custom cushion cover screen printing services that add a personal touch to your home decor or promotional items. Our high-quality, screen-printed cushion covers ensure vibrant and durable designs that stand out.<br />
                                    Standard Cushion Covers: Classic designs with high-quality screen printing, available in various shapes and sizes.<br />
                                    Premium Cushion Covers: Luxurious options with enhanced materials and vibrant, detailed screen prints for a sophisticated look.<br />
                                    Eco-friendly Cushion Covers: Environmentally conscious options made from sustainable materials with beautiful, eco-friendly printing.<br />
                                    Personalized Cushion Covers: Customizable covers with your designs, logos, or messages, perfect for unique gifts or branded merchandise.<br />
                                    <b>Sizes:</b>We offer a range of standard sizes and custom dimensions to fit your specific needs.<br />
                                    <b>Pricing:</b>Pricing varies based on cushion cover type, size, quantity, and customization options. For a detailed quote tailored to your project, please contact us directly.<br />
                                    <b>Customization Options:</b><br />
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or collaborate with our team to create unique, personalized cushion covers that match your vision.</li>
                                        <li> **Screen Printing:** Opt for high-quality screen printing to ensure your cushion covers are vibrant and eye-catching.</li>
                                        <li> **Materials:** Select from a variety of high-quality materials, including cotton, polyester, and eco-friendly fabrics.</li>
                                        <li> **Finishes:** Add special finishes like piping, tassels, or custom stitching to enhance the look and feel of your cushion covers.</li>
                                        <li> **Closure Options:** Choose from various closure options, such as zippers or envelope flaps, for easy removal and cleaning.</li>
                                        <li> **Special Features:** Include features like custom labels, multi-color prints, or intricate designs for added personalization.</li>
                                    </ul>
                                    For more information or to place an order, please reach out to us at:<br />

                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b><br />

                                    Let us help you create custom cushion covers that add style and personality to any space. Contact us today to discuss your design ideas and customization options!</p></li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#cushioncoverreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="cushioncoverreviews">
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
                <CushionCover />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {cushion_cover.cushioncoverreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {cushion_cover.cushioncoverreviews.map((review) => (
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

export default CushionCoverScreen;