import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import StarRating from "./StarRatingScreen";
import { getError } from "../Utiles";
import { Store } from "../Store";
import DesktopItem from "../Promotional_Product/Desktop_tems";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, desktopitem: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, desktopitem: action.payload };
        default:
            return state;
    }
};

function DesktopItemScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, desktopitem }, dispatch] = useReducer(reducer, {
        desktopitem: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/desktopitems/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === desktopitem._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/desktopitems/${desktopitem._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...desktopitem, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === desktopitem._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/desktopitems/${desktopitem._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...desktopitem, quantity }
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
                '/api/desktopitemreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    desktopitemId: desktopitem._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/desktopitems/slug/${slug}`);
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
            <div className="container-fluid mt-3 ">
                <div className="row">
                    <div className="col-md-5 ">
                        <img className="img-large" src={desktopitem.image} alt={desktopitem.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{desktopitem.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={desktopitem.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({desktopitem.desktopitemreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                {isLoggedIn ? (
                                    <></>
                                ) : (
                                    'Login/Register to see Price'
                                )}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b>
                                <p>At Fine Multiprint Solutions, we specialize in creating custom desktopitems to honor achievements with style and personalization. Whether you need trophies, plaques, or medals, we offer a variety of options to suit every occasion.

                                    Our Types:

                                    Trophies: Choose from traditional cup trophies or modern designs.
                                    Plaques: Select elegant wooden plaques in various sizes and finishes.
                                    Medals: Customize medals with different shapes, ribbons, and engravings.<br />
                                    <b>Sizes:</b>Each type and size of desktopitem is priced differently. Please contact us directly for a detailed quote based on your specific requirements.
                                    <br />

                                    <b>Pricing:</b>
                                    Our desktopitems come in a range of sizes to fit your needs, from small recognitions to grand achievements.<br />

                                    Customization Options:
                                    <ul>
                                        <li> Engravings: Personalize desktopitems with names, dates, and messages.</li>
                                        <li> Logos: Include your company or event logo for added personalization.</li>
                                        <li> Materials: Choose from high-quality materials such as glass, acrylic, or metal.</li>
                                    </ul>
                                    How to Contact Us:
                                    For more information or to place an order, please reach out to us at:<br />

                                    <b> Phone: 9920033112</b><br />
                                    <b> Email: fmprintsolutions@gmail.com</b><br />
                                    Let us help you create memorable desktopitems that reflect the uniqueness of your achievements. Contact us today to discuss your customization ideas!</p></li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#desktopitemreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="desktopitemreviews">
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
                <DesktopItem />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {desktopitem.desktopitemreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {desktopitem.desktopitemreviews.map((review) => (
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

export default DesktopItemScreen;