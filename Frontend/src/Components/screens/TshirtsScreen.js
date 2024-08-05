import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import StarRating from "./StarRatingScreen";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Tshirts from "../T-shirts.js"


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, tshirt: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
                return { ...state, tshirt: action.payload };
        default:
            return state;
    }
};

function TshirtScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, tshirt }, dispatch] = useReducer(reducer, {
        tshirt: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/tshirts/slug/${slug}`);
                console.log('Fetched Tshirt:', result.data);
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
        const existItem = cart.cartItems.find((x) => x._id === tshirt._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/tshirts/${tshirt._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...tshirt, quantity }
        })
        navigate('/cart')
    }


    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === tshirt._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/tshirts/${tshirt._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...tshirt, quantity }
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
                '/api/treviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    tshirtId: tshirt._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/tshirts/slug/${slug}`);
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
            <div className="contrainer-fluid">
                <div className="row">
                    <div className="col-md-5">
                        <img className="img-large" src={tshirt.image} alt={tshirt.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{tshirt.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={tshirt.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({tshirt.treviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{tshirt.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine T-Shirt Prints**, we specialize in providing high-quality custom t-shirts for all your needs. Whether you’re looking to create unique designs for an event, team, or personal use, we offer a variety of options to ensure your vision comes to life. <br />
                                    <b>Our Types:</b>
                                    T-Shirts: Choose from a range of styles including classic crew necks, v-necks, and more.<br />
                                    Materials: Opt for premium fabrics such as 100% cotton, polyester blends, or eco-friendly options.<br />
                                    Printing Methods: Select from screen printing, direct-to-garment, or heat transfer for the best results.<br />
                                    <b>Sizes:</b><br />
                                    Our t-shirts come in various sizes from small to extra-large to fit everyone comfortably.<br />
                                    <b>Pricing:</b>
                                    Each t-shirt type, size, and customization is priced differently. For a detailed quote based on your specific requirements, please contact us directly.<br />
                                    Customization Options:

                                    <ul>
                                        <li> **Designs:** Upload your own artwork or work with our team to create a design that stands out.</li>
                                        <li> **Logos:** Feature your company or event logo for a professional touch.</li>
                                        <li> **Colors:** Choose from a wide range of colors to match your design and brand.</li>
                                    </ul><br />
                                    How to Contact Us:
                                    For more information or to place an order, please reach out to us at:<br />

                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b><br />
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
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#treviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="treviews">
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
                    <Tshirts />
                    <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {tshirt.treviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {tshirt.treviews.map((review) => (
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

export default TshirtScreen;