import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen"; // Make sure the path is correct
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Coffee from "../Mugs/Coffee_Mug";

// Define the reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
                return { ...state, product: action.payload };
        default:
            return state;
    }
};

// ProductScreen component
function ProductScreen() {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: {},
        loading: true,
        error: '',
    });

    const submitReview = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        try {
            const { data } = await axios.post(
                '/api/reviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    productId: product._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/products/slug/${slug}`);
            dispatch({ type: 'REVIEW_SUBMITTED', payload: result.data });
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data.message : error.message);
        }
    };


    const onRatingChange = (newRating) => {
        setRating(newRating);
    };

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                console.log('Fetched Product:', result.data);
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

    // Buy Now
    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        });
        navigate('/shipping');
    };
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        });
        navigate('/cart');
    };

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-5">
                    <img className="img-large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-md-7 box">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h3>{product.name}</h3>
                        </li>
                        <li className="list-group-item inlineclass">
                            <StarRating rating={product.rating || 0} onRatingChange={onRatingChange} />
                            <p>Review({product.reviews.length})</p>
                        </li>
                        <li className="list-group-item">
                            Price: {isLoggedIn ? (
                                <><i className="bi bi-currency-rupee"></i>{product.price}</>
                            ) : (
                                'Login/Register to see Price'
                            )}
                        </li>
                        <p><b>Category:</b> {product.category}</p>
                        <li className="list-group-item">
                            <b><b> Description:</b></b>
                            <p>At Fine Multiprint Solution, we specialize in crafting custom glass beer mugs that add a touch of personalization to your drinking experience. Whether for a special event, promotional giveaway, or personal enjoyment, we offer a variety of options to suit your needs.<br />
                                <p><b>Pricing:</b>Each type and size of glass beer mug is priced differently. Please contact us directly for a detailed quote based on your specific requirements.</p>
                                <b>Different Types of Name Customizations:</b> <br />
                                Individual Names: Personalize each mug with individual names for gifts or personal use.<br />
                                Group Names: Customize mugs with group names for parties, weddings, or corporate events.<br />
                                <b>Customization Options</b>
                                Color Options: Select from a range of colors to match your branding or personal style.<br />
                                Font Choices: Choose different fonts to suit your theme or personal preference.<br />
                                Handle Personalization: Customize the mug handle with initials or small designs for added uniqueness.<br />
                                For more information or to place an order, please reach out to us at:<br />
                                <b> Phone: 9920033112</b><br />
                                <b> Email: fmprintsolutions@gmail.com</b><br />
                            </p>

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
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="list-group">
                            <div className="list-group-item">
                                <div className="row">
                                    <div className="col">Price</div>
                                    <div className="col">{isLoggedIn ? (
                                        <><i className="bi bi-currency-rupee"></i>{product.price}</>
                                    ) : (
                                        'Login/Register to see Price'
                                    )}</div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row">
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
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#reviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="reviews">
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
            <Coffee />
            <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {product.reviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {product.reviews.map((review) => (
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

export default ProductScreen;
