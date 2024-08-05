
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import StarRating from "./StarRatingScreen";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Bags from "../Bags";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, bag: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, bag: action.payload };
        default:
            return state;
    }
};

function BagScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, bag }, dispatch] = useReducer(reducer, {
        bag: {},
        loading: true,
        error: '',
    });

    const [selectedvariety, setSelectedvariety] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/bags/slug/${slug}`);
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
        if (!selectedvariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === bag._id && x.variety === selectedvariety);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bags/${bag._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bag, quantity, variety: selectedvariety }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        if (!selectedvariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === bag._id && x.variety === selectedvariety);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bags/${bag._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bag, quantity, variety: selectedvariety }
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
                '/api/bagreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    bagId: bag._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/bags/slug/${slug}`);
            dispatch({ type: 'REVIEW_SUBMITTED', payload: result.data });
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data.message : error.message);
        }
    };


    const onRatingChange = (newRating) => {
        setRating(newRating);
    };


    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-5">
                    <img className="img-large" src={bag.image} alt={bag.name}></img>
                </div>
                <div className="col-md-7 box">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h3>{bag.name}</h3>
                        </li>
                        <li className="list-group-item inlineclass">
                            <StarRating rating={bag.rating || 0} onRatingChange={onRatingChange} />
                            <p>Review({bag.bagreviews.length})</p>
                        </li>
                        <li className="list-group-item">
                            Price : {isLoggedIn ? (
                                <><i className="bi bi-currency-rupee"></i>{bag.price}</>
                            ) : (
                                'Login/Register to see Price'
                            )}
                        </li>

                        <p> Product Code: {bag.code}</p>
                        <h6>AVAILABLE OPTIONS</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    {[bag.variety1, bag.variety2, bag.variety3, bag.variety4].map((variety, index) => (
                                        variety !== '-' && (
                                            <td key={index}>
                                                <button
                                                    className={`btn ${selectedvariety === variety ? 'btn-primary' : 'btn-outline-primary'}`}
                                                    onClick={() => setSelectedvariety(variety)}
                                                >
                                                    {variety}
                                                </button>
                                            </td>
                                        )
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <li className="list-group-item">
                            Description:
                            <p>{bag.description}</p>
                            <p><b>Customization Options</b><br />
                                Logo Printing: Add your company logo or custom design using high-quality printing techniques. Ensure your brand stands out with clear and vibrant logo representation.<br />
                                Logo Printing: Add your company logo or custom design using high-quality printing techniques. Ensure your brand stands out with clear and vibrant logo representation.<br />
                                Design Flexibility: Customize the bags with various designs, messages, or patterns. Create a unique look that reflects your brand or personal style.<br />
                                Color Choices: Select from a range of bag colors to complement your logo and design. Options include classic neutrals, bold colors, and trendy patterns.<br />
                                <b>Special Uses for Custom Bags:</b><br />
                                Promotional Items: Perfect for corporate giveaways, trade shows, or marketing campaigns. Print your logo or promotional message to increase brand visibility and engagement.<br />
                                Corporate Gifts: Ideal for employee gifts, client appreciation, or corporate events. Customize with your logo to create a professional and practical gift.<br />
                                Event Favors: Great for weddings, parties, or conferences. Design custom bags that reflect the theme of your event and provide guests with a useful and memorable keepsake.<br />
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

                {/* Created Review */}
                {/* Created Review */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mt-5">
                            <nav className="nav">
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#bagreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="bagreviews">
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
                <Bags />

                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {bag.bagreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {bag.bagreviews.map((review) => (
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

export default BagScreen;
