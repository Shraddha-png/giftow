import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Bestseller from "../Category/Best_Seller_Product";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, best_seller: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
            return { ...state, best_seller: action.payload };
        default:
            return state;
    }
};

function BestSellerScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, best_seller }, dispatch] = useReducer(reducer, {
        best_seller: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/best_sellers/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === best_seller._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/best_sellers/${best_seller._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...best_seller, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === best_seller._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/best_sellers/${best_seller._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...best_seller, quantity }
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
                '/api/bestSelreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    best_sellerId: best_seller._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/best_sellers/slug/${slug}`);
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
                        <img className="img-large" src={best_seller.image} alt={best_seller.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{best_seller.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={best_seller.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({best_seller.bestSelreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{best_seller.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Description:
                                <p>{best_seller.description}</p>
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
                    <div className="container-fluid">
                        <div className="col-md-3 mt-5">
                            <nav className="nav">
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#bestSelreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="bestSelreviews">
                                {userInfo ? (
                                    <form className="form px-5" onSubmit={submitReview}>
                                        <div>
                                            <label htmlFor="rating"><strong>Rating:</strong></label>
                                            <select
                                                id="rating"
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))} className="form-control"
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="title" className="mt-3"><strong>Title:</strong></label><br />
                                            <input
                                                id="title" className="mt-3 form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="comment" className="mt-3"><strong>Comment:</strong></label><br />
                                            <textarea
                                                id="comment" className="mt-3 form-control"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)} required
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="btn btn-primary mt-3" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <MessageBox>
                                        Please <a href="/signin">Sign In</a> to write a review
                                    </MessageBox>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h4 className="relatedspro">RELATED PRODUCTS</h4>
                    </div>
                    <Bestseller />
                    <hr className="mt-1" />
                    <div className="container bg-light">
                        <div className="col">
                            <h5>Reviews ({best_seller.bestSelreviews.length})</h5>
                            {best_seller.bestSelreviews.length === 0 && (
                                <MessageBox>There is no review</MessageBox>
                            )}
                            <ul>
                                {best_seller.bestSelreviews.map((review, index) => (
                                    <li key={`review_${index}`}>
                                        <strong>{review.name}</strong>
                                        <StarRating rating={review.rating} onRatingChange={() => { }} />
                                        <p>{review.title}</p>
                                        <p>{review.comment}</p>
                                    </li>

                                ))}

                            </ul>

                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        );
}

export default BestSellerScreen;