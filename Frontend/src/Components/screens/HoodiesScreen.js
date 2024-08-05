import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Hoodies from "../Clothing.js/Hoodies";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, hoodie: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, hoodie: action.payload };
      
        default:
            return state;
    }
};

function HoodieScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, hoodie }, dispatch] = useReducer(reducer, {
        hoodie: {},
        loading: true,
        error: '',
    });
    const [selectedvariety, setSelectedvariety] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/hoodies/slug/${slug}`);
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
        if (!selectedvariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === hoodie._id && x.variety === selectedvariety);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/hoodies/${hoodie._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...hoodie, quantity, variety: selectedvariety }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        if (!selectedvariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === hoodie._id && x.variety === selectedvariety);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/hoodies/${hoodie._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...hoodie, quantity, variety: selectedvariety }
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
                '/api/hoodiesreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    hoodieId: hoodie._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/hoodies/slug/${slug}`);
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
                        <img className="img-large" src={hoodie.image} alt={hoodie.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{hoodie.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={hoodie.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({hoodie.hoodiesreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At Fine Multiprint Solutions, we specialize in creating personalized hoodies tailored to your preferences. Whether you're looking to showcase different images, add stickers, or incorporate logos, we have options to suit every style.

                                    Our Options:
                                    <ul>
                                        <li> Images: Choose from a wide selection of images or provide your own.</li>
                                        <li> Stickers: Add fun and unique stickers to personalize your hoodie.</li>
                                        <li> Logos: Incorporate your company logo or any design of your choice.</li>
                                    </ul>
                                    Pricing:
                                    Each customization option comes with its own pricing structure. Please contact us directly for a detailed quote based on your specific requirements.

                                    How to Contact Us:
                                    For more information or to place an order, please reach out to us at:<br />

                                    Phone:<b> [Your Phone Number]</b><br />
                                    Email:<b> [Your Email Address]</b><br />
                                    We're here to help you create the perfect hoodie that reflects your individuality. Get in touch today to discuss your customization ideas!</p></li>
                        </ul>
                        <h6>AVAILABLE OPTIONS</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>
                                        <button
                                            className={`btn ${selectedvariety === hoodie.variety1 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setSelectedvariety(hoodie.variety1)}
                                        >
                                            {hoodie.variety1}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn ${selectedvariety === hoodie.variety2 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setSelectedvariety(hoodie.variety2)}
                                        >
                                            {hoodie.variety2}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn ${selectedvariety === hoodie.variety3 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setSelectedvariety(hoodie.variety3)}
                                        >
                                            {hoodie.variety3}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn ${selectedvariety === hoodie.variety4 ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setSelectedvariety(hoodie.variety4)}
                                        >
                                            {hoodie.variety4}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#hoodiesreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="hoodiesreviews">
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
                <Hoodies />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {hoodie.hoodiesreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {hoodie.hoodiesreviews.map((review) => (
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

export default HoodieScreen;