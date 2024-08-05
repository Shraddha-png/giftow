import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import StarRating from "./StarRatingScreen";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Badges from "../Category/Badges";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, badge: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, badge: action.payload };
        default:
            return state;
    }
};

function BadgesScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, badge }, dispatch] = useReducer(reducer, {
        badge: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/badges/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === badge._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/badges/${badge._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...badge, quantity }
        })
        navigate('/cart')
    }
    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === badge._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/badges/${badge._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...badge, quantity }
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
                '/api/breviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    badgeId: badge._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/badges/slug/${slug}`);
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
                        <img className="img-large mt-3 ml-2" src={badge.image} alt={badge.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{badge.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={badge.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({badge.breviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{badge.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At **Fine Print Solutions**, we specialize in creating high-quality name tags and badges that offer both functionality and style. Whether for corporate use, events, or personal identification, our diverse range of products ensures you find the perfect solution to meet your needs.<br />
                                    {badge.description}< br />
                                    <b>Sizes:</b>We offer a range of standard sizes and custom dimensions to fit your specific requirements. <br />
                                    <b>Pricing:</b>Pricing varies based on name tag type, size, quantity, and customization options. For a detailed quote tailored to your project, please contact us directly.<br />
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or collaborate with our team to create a unique layout that aligns with your brand and identification needs.</li>
                                        <li> **Engravings and Printing:** Personalize name tags with engraved or printed names, titles, logos, and other details for a professional look.</li>
                                        <li> **Colors and Finishes:** Select from a variety of colors and finishes, including brushed metal, polished metal, rose gold, natural wood, and acrylic options.</li>
                                        <li> **Materials:** Choose from high-quality materials such as stainless steel, aluminum, brass, wood, sunboard, and acrylic for durability and a premium feel.</li>
                                        <li> **Attachment Options:** Opt for magnetic backs, pin backs, or clip attachments for easy and secure wearing.</li>
                                        <li> **Special Features:** Add features like rounded corners, custom shapes, protective coatings, or doming for added functionality and longevity.</li>
                                    </ul>
                                    For more information or to place an order, please reach out to us at:<br />
                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b><br />

                                    Let us help you create metal name tags that enhance your professional image and ensure clear identification. Contact us today to discuss your design ideas and customization options!</p></li>
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


                    {/* Created Review */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mt-5">
                                <nav className="nav">
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#breviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="breviews">
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
                    <Badges />
                    <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {badge.breviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {badge.breviews.map((review) => (
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

export default BadgesScreen;