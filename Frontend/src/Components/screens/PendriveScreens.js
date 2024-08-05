import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Pendrive from "../Pen_drive";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, pendrive: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, pendrive: action.payload };
        default:
            return state;
    }
};

function PendriveScreens() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, pendrive }, dispatch] = useReducer(reducer, {
        pendrive: {},
        loading: true,
        error: '',
    });

    const [selectedVariety, setSelectedVariety] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/pendrives/slug/${slug}`);
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

    const handleVarietySelection = (variety, price) => {
        setSelectedVariety(variety);
        setSelectedPrice(price);
    };


    const addToCartHandler = async () => {

        if (!selectedVariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === pendrive._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/pendrives/${pendrive._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...pendrive, quantity, variety: selectedVariety, price: selectedPrice }
        })
        navigate('/cart')
    }


    const buyNowHandler = async () => {

        if (!selectedVariety) {
            window.alert('Please select a variety');
            return;
        }
        const existItem = cart.cartItems.find((x) => x._id === pendrive._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/pendrives/${pendrive._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...pendrive, quantity, variety: selectedVariety, price: selectedPrice }
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
                '/api/pendrivereviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    pendriveId: pendrive._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/pendrives/slug/${slug}`);
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
                        <img className="img-large" src={pendrive.image} alt={pendrive.name}></img>
                    </div>
                    <div className="col-md-7 box bg-light">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{pendrive.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={pendrive.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({pendrive.pendrivereviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <p className="card-text">
                                        <strong><i className="bi bi-currency-rupee"></i>{selectedPrice}</strong>
                                    </p>
                                ) : (
                                    <p className="card-text">Login/Register to see Price</p>
                                )}
                            </li>
                            <h6>AVAILABLE OPTIONS</h6>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === pendrive.variety1 ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => handleVarietySelection(pendrive.variety1, pendrive.price1)}
                                            >
                                                {pendrive.variety1}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === pendrive.variety2 ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => handleVarietySelection(pendrive.variety2, pendrive.price2)}
                                            >
                                                {pendrive.variety2}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${selectedVariety === pendrive.variety3 ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => handleVarietySelection(pendrive.variety3, pendrive.price3)}
                                            >
                                                {pendrive.variety3}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At **Fine Print Solutions**, we offer custom pen drive printing services that combine practicality with personalization. Perfect for corporate gifts, promotional giveaways, or personal use, our high-quality pen drives can be customized with logos, names, and different storage capacities to meet your specific needs.<br />
                                    Luxury Pen Drives: Premium options with elegant designs and high-end materials for a sophisticated touch.<br />
                                    Novelty Pen Drives: Unique and fun designs that stand out, ideal for special events and themed promotions.<br />
                                    <b>Capacity:</b>We offer pen drives in a range of storage capacities to suit your needs, including 4GB, 8GB, 16GB, 32GB, 64GB, and higher capacities upon request.<br />
                                    <b>Pricing:</b>Pricing varies based on pen drive type, storage capacity, quantity, and customization options. For a detailed quote tailored to your project, please contact us directly.<br />
                                    <b>Customization Options:</b><br />
                                    <ul>
                                        <li> Logos: Add your company or event logo to the pen drives for a professional and branded look.</li>
                                        <li> Names: Personalize pen drives with individual names or messages for unique gifts or special recognitions.</li>
                                        <li> Designs: Choose from our design templates or work with our team to create a custom look that aligns with your brand or event.</li>
                                        <li> Colors: Select from a variety of colors and finishes, including matte, gloss, metallic, or custom colors to match your brand.</li>
                                        <li> Materials: Choose from different materials such as plastic, metal, wood, or eco-friendly options for a distinctive and durable pen drive.</li>
                                        <li> Packaging: Opt for custom packaging solutions to enhance the presentation and impact of your pen drives, including gift boxes, pouches, or branded sleeves.</li>
                                    </ul>
                                </p><br />
                                For more information or to place an order, please reach out to us at:<br />
                                <b> Phone: 9920033112</b><br />
                                <b> Email: fmprintsolutions@gmail.com</b><br /></li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#pendrivereviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="pendrivereviews">
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
                <Pendrive />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {pendrive.pendrivereviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {pendrive.pendrivereviews.map((review) => (
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

export default PendriveScreens;