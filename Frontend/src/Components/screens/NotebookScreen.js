import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Notebook from "../Notebook";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, notebook: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, notebook: action.payload };
        default:
            return state;
    }
};

function NotebookScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, notebook }, dispatch] = useReducer(reducer, {
        notebook: {},
        loading: true,
        error: '',
    });

    const [selectedVariety, setSelectedVariety] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/notebooks/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === notebook._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/notebooks/${notebook._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...notebook, quantity, variety: selectedVariety, }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {

        if (!selectedVariety) {
            window.alert('Please select a variety');
            return;
        }

        const existItem = cart.cartItems.find((x) => x._id === notebook._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/notebooks/${notebook._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...notebook, quantity, variety: selectedVariety, }
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
                '/api/notebookreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    notebookId: notebook._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/notebooks/slug/${slug}`);
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
                    <div className="col-md-5 p-5">
                        <img className="img-large" src={notebook.image} alt={notebook.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{notebook.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={notebook.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({notebook.notebookreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{notebook.price}</>
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
                                                className={`btn ${selectedVariety === notebook.variety1 ? 'btn-info' : 'btn-bg-info'}`}
                                                onClick={() => handleVarietySelection(notebook.variety1)}>
                                                {notebook.variety1}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === notebook.variety2 ? 'btn-dark' : 'btn-bg-dark'}`}
                                                onClick={() => handleVarietySelection(notebook.variety2)}>
                                                {notebook.variety2}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === notebook.variety3 ? 'btn-danger' : 'btn-bg-danger'}`}
                                                onClick={() => handleVarietySelection(notebook.variety3)}>
                                                {notebook.variety3}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === notebook.variety4 ? 'btn-secondary' : 'btn-bg-secondary'}`}
                                                onClick={() => handleVarietySelection(notebook.variety4)}>
                                                {notebook.variety4}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === notebook.variety5 ? 'btn-success' : 'btn-bg-success'}`}
                                                onClick={() => handleVarietySelection(notebook.variety5)}>
                                                {notebook.variety5}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === notebook.variety6 ? 'btn-warning' : 'btn-bg-warning'}`}
                                                onClick={() => handleVarietySelection(notebook.variety6)}>
                                                {notebook.variety6}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At **Fine Print Solutions**, we offer custom multi-color notebook printing services that blend functionality with vibrant design. Perfect for corporate giveaways, promotional events, or personal use, our high-quality notebooks ensure your brand stands out with every page.<br />
                                    Standard Notebooks: Classic designs with multi-color covers, ideal for everyday use and promotional giveaways.<br />
                                    Premium Notebooks: High-end options featuring durable materials, vibrant colors, and customizable features for a sophisticated look.<br />
                                    Eco-friendly Notebooks: Environmentally conscious options with recycled paper and sustainable materials, available in various colors.<br />
                                    Personalized Notebooks: Customizable covers with multi-color printing, perfect for personalized gifts or branded merchandise.<br />
                                    <b>Sizes:</b>We offer a range of standard sizes and custom dimensions to fit your specific needs.<br />
                                    <b>Pricing:</b>Pricing varies based on notebook type, size, quantity, and customization options. For a detailed quote tailored to your project, please contact us directly.</p><br />
                                <ul>
                                    <li> **Designs:** Choose from our design templates or collaborate with our team to create a unique cover that aligns with your brand and preferences.</li>
                                    <li> **Color Printing:** Opt for full-color covers and interior pages to make your notebooks vibrant and visually appealing.</li>
                                    <li> **Materials:** Select from a variety of paper stocks, including standard, premium, and eco-friendly options for the interior pages.</li>
                                    <li> **Finishes:** Choose from finishes such as matte, gloss, or satin for the cover to enhance the look and feel of your notebooks.</li>
                                    <li> **Binding Options:** Choose from binding methods such as spiral binding, perfect binding, or saddle stitching for a durable and professional finish.</li>
                                    <li> **Special Features:** Add features like elastic closures, ribbon markers, or pockets for added functionality and style.</li>
                                </ul>
                                For more information or to place an order, please reach out to us at:<br />
                                <b> Phone: 9920033112</b><br />
                                <b> Email: fmprintsolutions@gmail.com</b><br />

                                Let us help you create memorable gift sets that delight recipients and promote your</li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#notebookreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="notebookreviews">
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
                <Notebook />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {notebook.notebookreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {notebook.notebookreviews.map((review) => (
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

export default NotebookScreen;