import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import SinglewallSipper from "../Sippers/SingleWallSipper";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, singlwallsipper: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, singlwallsipper: action.payload };
        default:
            return state;
    }
};

function SingleWallSipperScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, singlwallsipper }, dispatch] = useReducer(reducer, {
        singlwallsipper: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/singlwallsippers/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === singlwallsipper._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/singlwallsippers/${singlwallsipper._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...singlwallsipper, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === singlwallsipper._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/singlwallsippers/${singlwallsipper._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...singlwallsipper, quantity }
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
                '/api/singlwallsipreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    singlwallsipperId: singlwallsipper._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/singlwallsippers/slug/${slug}`);
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
                        <img className="img-large" src={singlwallsipper.image} alt={singlwallsipper.name}></img>
                    </div>
                    <div className="col-md-7">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{singlwallsipper.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={singlwallsipper.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({singlwallsipper.singlwallsipreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{singlwallsipper.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Material:
                                <p>{singlwallsipper.material}</p>
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
                {/* Created Review */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mt-5">
                            <nav className="nav">
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#singlwallsipreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="singlwallsipreviews">
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
                <SinglewallSipper />

                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {singlwallsipper.singlwallsipreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {singlwallsipper.singlwallsipreviews.map((review) => (
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

export default SingleWallSipperScreen;