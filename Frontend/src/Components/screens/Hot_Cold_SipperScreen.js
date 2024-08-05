import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Hotcold from "../Sippers/Hot_Cold_Sipper";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, hotcoldsipper: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, hotcoldsipper: action.payload };
        default:
            return state;
    }
};

function HotcoldScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, hotcoldsipper }, dispatch] = useReducer(reducer, {
        hotcoldsipper: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/hotcoldsippers/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === hotcoldsipper._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/hotcoldsippers/${hotcoldsipper._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...hotcoldsipper, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === hotcoldsipper._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/hotcoldsippers/${hotcoldsipper._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...hotcoldsipper, quantity }
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
                '/api/hotcoldsip_reviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    hotcoldsipperId: hotcoldsipper._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/hotcoldsippers/slug/${slug}`);
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
            <div className="container-fluid MT-3">
                <div className="row">
                    <div className="col-md-5">
                        <img className="img-large" src={hotcoldsipper.image} alt={hotcoldsipper.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{hotcoldsipper.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={hotcoldsipper.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({hotcoldsipper.hotcoldsip_reviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{hotcoldsipper.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Material:
                                <p>{hotcoldsipper.material}</p>
                            </li>
                            <li className="list-group-item">
                                Description:
                                <p>At Fine Multiprint Solution, we offer custom hot and cold flask sippers designed to keep your beverages at the perfect temperature, whether hot or cold. Ideal for personal use, corporate gifts, or promotional giveaways, our flask sippers combine practicality with personalization.Our hot and cold flask sippers are perfect for maintaining the temperature of your drinks, whether you're on the go or enjoying a moment of relaxation. <br />
                                    <b>Customization Options</b><br />
                                    Personalized Printing: Add your custom designs, logos, or messages with high-quality printing. Create unique and functional items for any occasion or promotional effort.<br />
                                    Color Choices: Select from a range of colors and finishes to match your branding or personal style. Options include classic metallics, vibrant hues, and sleek matte finishes.<br />
                                    Design Flexibility: Customize the body and lid of the flask sipper with detailed graphics, text, or patterns. Ensure your design is both practical and eye-catching.<br />
                                    <b>Features of Hot and Cold Flask Sippers</b><br />
                                    Temperature Retention: Designed to keep beverages hot or cold for extended periods, making them perfect for coffee, tea, water, or other drinks.<br />
                                    Durable Construction: Made from high-quality materials like stainless steel, ensuring longevity and resistance to wear and tear.<br />
                                    Convenient Design: Includes features like leak-proof lids, easy-to-carry handles, and wide mouths for easy filling and cleaning.<br />
                                    For more information or to place an order, please reach out to us at:<br />
                                    <b>Phone: [Your Phone Number]</b><br />
                                    <b>Email: [Your Email Address]</b><br /></p></li>
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
                                            <><i className="bi bi-currency-rupee"></i>{hotcoldsipper.price}</>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#hotcoldsip_reviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="hotcoldsip_reviews">
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
                <Hotcold />

                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {hotcoldsipper.hotcoldsip_reviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {hotcoldsipper.hotcoldsip_reviews.map((review) => (
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

export default HotcoldScreen;