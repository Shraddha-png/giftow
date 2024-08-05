import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Cushion from "../Cushion.js"


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, cushion: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, cushion: action.payload };
        default:
            return state;
    }
};

function CushionScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, cushion }, dispatch] = useReducer(reducer, {
        cushion: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/cushions/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === cushion._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/cushions/${cushion._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...cushion, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === cushion._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/cushions/${cushion._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...cushion, quantity }
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
                '/api/cushionreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    cushionId: cushion._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/cushions/slug/${slug}`);
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
                        <img className="img-large p-5" src={cushion.image} alt={cushion.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{cushion.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={cushion.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({cushion.cushionreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{cushion.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At **Fine Print Solutions**, we offer custom cushion printing services that combine comfort with style. Our high-quality, personalized cushions are perfect for home decor, promotional gifts, or special occasions, ensuring that your designs make a lasting impression.<br />
                                    Standard Cushions: Classic designs with high-quality printing, available in various shapes and sizes to fit any space.<br />
                                    Premium Cushions: Luxurious options with enhanced materials and vibrant, detailed prints for a sophisticated look.<br />
                                    Eco-friendly Cushions: Environmentally conscious options made from sustainable materials with beautiful, eco-friendly printing.<br />
                                    Personalized Cushions: Customizable cushions with your designs, photos, or messages, perfect for unique gifts or branded merchandise.<br />
                                    <b>Sizes:</b>We offer a range of standard sizes and custom dimensions to fit your specific needs<br />
                                    <b>Pricing:</b>Pricing varies based on cushion type, size, quantity, and customization options. For a detailed quote tailored to your project, please contact us directly.<br />
                                    <b>Customization Options:</b><br />
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or collaborate with our team to create unique, personalized cushions that match your vision.</li>
                                        <li> **Color Printing:** Opt for full-color printing to ensure your cushions are vibrant and eye-catching.</li>
                                        <li> **Materials:** Select from a variety of high-quality materials, including cotton, polyester, and eco-friendly fabrics.</li>
                                        <li> **Filling:** Choose from different filling options, such as polyester fiberfill or memory foam, for the perfect level of comfort.</li>
                                        <li> **Finishes:** Add special finishes like piping, tassels, or custom stitching to enhance the look and feel of your cushions.</li>
                                        <li> **Special Features:** Include features like removable covers with zippers for easy cleaning, or custom labels for added personalization.</li>
                                    </ul>
                                    For more information or to place an order, please reach out to us at:<br />
                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b><br />

                                    Let us help you create memorable gift sets that delight recipients and promote your</p></li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#cushionreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="cushionreviews">
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
                <Cushion />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {cushion.cushionreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {cushion.cushionreviews.map((review) => (
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

export default CushionScreen;