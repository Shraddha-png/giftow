import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Bookmarks from "../Printing/Bookmarks";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, bookmark: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, bookmark: action.payload };
        default:
            return state;
    }
};

function BookmarkScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, bookmark }, dispatch] = useReducer(reducer, {
        bookmark: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/bookmarks/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === bookmark._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bookmarks/${bookmark._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bookmark, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === bookmark._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/bookmarks/${bookmark._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...bookmark, quantity }
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
                '/api/bookmarkreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    bookmarkId: bookmark._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/bookmarks/slug/${slug}`);
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
                        <img className="img-large p-2" src={bookmark.image} alt={bookmark.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{bookmark.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={bookmark.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({bookmark.bookmarkreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we offer custom bookmark printing designed to keep your brand in sight and provide a practical tool for book lovers and professionals alike. Whether you need bookmarks for promotions, events, or personal use, our high-quality options are tailored to fit your needs.<br />
                                    <b>Our Types:</b> <br />
                                    Standard Bookmarks: Classic designs with various sizes, perfect for everyday use and general promotions.<br />
                                    Standard Bookmarks: Classic designs with various sizes, perfect for everyday use and general promotions.<br />
                                    Premium Bookmarks: High-quality materials and finishes, such as laminated surfaces, foil stamping, and textured paper, for a sophisticated touch.<br />
                                    <b>Sizes:</b>
                                    We offer a range of standard sizes and custom dimensions, including popular options like 2” x 6” and 2.5” x 7”. Custom sizes are available to suit your specific preferences.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on bookmark type, size, and customization options. For a detailed quote tailored to your project, please contact us directly.

                                    <ul>
                                        <li> **Designs:** Create your own design or work with our team to develop a layout that fits your brand or message.</li>
                                        <li> **Graphics:** Incorporate your own images, logos, and text to personalize each bookmark.</li>
                                        <li> **Colors and Finishes:** Choose from a variety of colors and finishes, including matte, gloss, or spot UV coating for enhanced visual appeal.</li>
                                        <li> **Paper Quality:** Select from high-quality paper stocks, such as standard cardstock, glossy, or recycled paper, for durability and a premium feel.</li>
                                        <li> **Special Features:** Add special touches like rounded corners, custom shapes, or tassels for a unique and functional design.</li>
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

                    {/* Created Review */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mt-5">
                                <nav className="nav">
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#bookmarkreviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="bookmarkreviews">
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
                    <Bookmarks />
                    <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {bookmark.bookmarkreviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {bookmark.bookmarkreviews.map((review) => (
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

export default BookmarkScreen;