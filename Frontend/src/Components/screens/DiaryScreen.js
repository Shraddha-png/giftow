import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Diaries from "../Diaries";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, diary: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
                return { ...state, diary: action.payload };
        default:
            return state;
    }
};

function DiaryScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, diary }, dispatch] = useReducer(reducer, {
        diary: {},
        loading: true,
        error: '',
    });

    const [selectedVariety, setSelectedVariety] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/diaries/slug/${slug}`);
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

    const handleVarietySelection = (variety) => {
        setSelectedVariety(variety);
    };

    const addToCartHandler = async () => {
        if (!selectedVariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === diary._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/diaries/${diary._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...diary, quantity, variety: selectedVariety, }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        if (!selectedVariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === diary._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/diaries/${diary._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...diary, quantity, variety: selectedVariety, }
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
                '/api/direviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    diaryId: diary._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/diaries/slug/${slug}`);
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
                        <img className="img-large" src={selectedVariety || diary.image} alt={diary.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{diary.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={diary.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({diary.direviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{diary.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <h6>AVAILABLE OPTIONS</h6>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === diary.variety1 ? 'btn-info' : 'btn-bg-info'}`}
                                                onClick={() => handleVarietySelection(diary.variety1)}>
                                                <img src={diary.variety1} alt="variety1" width="50" />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === diary.variety2 ? 'btn-dark' : 'btn-bg-dark'}`}
                                                onClick={() => handleVarietySelection(diary.variety2)}>
                                                <img src={diary.variety2} alt="variety2" width="50" />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === diary.variety3 ? 'btn-danger' : 'btn-bg-danger'}`}
                                                onClick={() => handleVarietySelection(diary.variety3)}>
                                                <img src={diary.variety3} alt="variety3" width="50" />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === diary.variety4 ? 'btn-secondary' : 'btn-bg-secondary'}`}
                                                onClick={() => handleVarietySelection(diary.variety4)}>
                                                <img src={diary.variety4} alt="variety4" width="50" />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === diary.variety5 ? 'btn-success' : 'btn-bg-success'}`}
                                                onClick={() => handleVarietySelection(diary.variety5)}>
                                                <img src={diary.variety5} alt="variety5" width="50" />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === diary.variety6 ? 'btn-warning' : 'btn-bg-warning'}`}
                                                onClick={() => handleVarietySelection(diary.variety6)}>
                                                <img src={diary.variety6} alt="variety6" width="50" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**, we offer premium custom diary printing that helps you stay organized and make a stylish statement. Whether for personal use, corporate gifts, or promotional purposes, our diaries are designed to combine functionality with elegance <br />
                                    <b>Our Types:</b> <br />
                                    Classic Diaries: Traditional formats with daily, weekly, or monthly layouts.<br />
                                    Custom Diaries: Tailored designs to suit your specific needs, including custom layouts and cover designs.<br />
                                    Premium Diaries: High-quality materials and finishes for a luxurious feel, including leather-bound options.<br />
                                    <b>Sizes:</b>
                                    Choose from various sizes, including pocket-sized, A5, and A4, to fit your preferences and requirements.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on diary type, size, and customization options. For a detailed quote based on your specific requirements, please contact us directly.

                                    <ul>
                                        <li> **Designs:** Create your own design or work with our team to develop a personalized cover and interior layout.</li>
                                        <li> **Logos:** Include your company or event logo for a professional and branded touch.</li>
                                        <li> **Colors and Finishes:** Select from a range of colors and finishes, including matte, gloss, and premium textures.</li>
                                        <li> **Paper Quality:** Choose from high-quality paper stocks for writing comfort and durability.</li>
                                        <li> **Special Features:** Add special features such as embossed text, foil stamping, or ribbon markers for a unique touch.</li>
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
                </div>
               {/* Created Review */}
               <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mt-5">
                                <nav className="nav">
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#direviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="direviews">
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
                <Diaries />
                <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                        <h4>Customer Reviews</h4>
                        {diary.direviews.length === 0 && <p>No reviews yet.</p>}
                        <ul className="list-group">
                            {diary.direviews.map((review) => (
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

export default DiaryScreen;
