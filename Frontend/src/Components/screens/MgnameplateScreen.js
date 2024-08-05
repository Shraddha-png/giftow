import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Magplate from "../Custome_Name_Plate/Magnet_Nmae_Plate";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, mgnameplate: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, mgnameplate: action.payload };
        
        default:
            return state;
    }
};

function MgnameplateScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, mgnameplate }, dispatch] = useReducer(reducer, {
        mgnameplate: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/mgnameplates/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === mgnameplate._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/mgnameplates/${mgnameplate._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...mgnameplate, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === mgnameplate._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/mgnameplates/${mgnameplate._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...mgnameplate, quantity }
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
                '/api/mgnmplatereviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    mgnameplateId: mgnameplate._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/mgnameplates/slug/${slug}`);
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
                        <img className="img-large" src={mgnameplate.image} alt={mgnameplate.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{mgnameplate.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={mgnameplate.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({mgnameplate.mgnmplatereviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                Price : {isLoggedIn ? (
                                    <><i className="bi bi-currency-rupee"></i>{mgnameplate.price}</>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                Description:
                                <p>At Fine Multiprint Solution, we offer custom magnet name plates that combine functionality with a sleek, professional appearance. Perfect for corporate settings, events, and promotional purposes, our magnet name plates can be personalized with names, logos, and designs to meet your specific needs.Our magnet name plates are designed to provide a secure and damage-free alternative to traditional pin-backed name plates, making them ideal for a variety of professional and personal uses.<br />
                                    <b>Customization Options</b>
                                    Personalized Printing: Add individual names, titles, and company logos to each name plate using high-quality printing techniques. Ensure a polished and professional look.<br />
                                    Design Flexibility: Customize the shape, size, and layout of the name plates to match your brand or event theme. Options include rectangular, oval, or custom shapes.<br />
                                    Material Choices: Choose from various materials such as metal, plastic, or acrylic to create the perfect look and feel for your name plates.<br />
                                    Color Options: Select from a range of background and text colors to match your branding or personal preferences. Options include classic metallic finishes, bold colors, and sleek monochromes.<br />
                                    <b>Features of Custom Magnet Name Plates</b><br />
                                    Durable Construction: Made from high-quality materials to ensure longevity and resistance to wear and tear.<br />
                                    Secure Magnetic Attachment: Features strong magnets for easy and secure attachment to clothing without causing damage or leaving pinholes.<br />
                                    Professional Appearance: Designed to provide a polished and professional look, enhancing the image of your brand or event.<br />
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
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="list-group">
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Price</div>
                                        <div className="col">{isLoggedIn ? (
                                            <><i className="bi bi-currency-rupee"></i>{mgnameplate.price}</>
                                        ) : (
                                            'Login/Register to see Price'
                                        )}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="d-grid">
                                            <button onClick={buyNowHandler} className="btn btn-success">Buy Now</button>
                                        </div>
                                    </div>
                                </div>

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
                {/* Created Review */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mt-5">
                            <nav className="nav">
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#mgnmplatereviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="mgnmplatereviews">
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
                <Magplate />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {mgnameplate.mgnmplatereviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {mgnameplate.mgnmplatereviews.map((review) => (
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

export default MgnameplateScreen;