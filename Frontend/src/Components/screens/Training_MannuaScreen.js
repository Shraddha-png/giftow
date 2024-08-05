import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import TrainingMannual from "../Printing/Training_mannual";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, training_mannual: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, training_mannual: action.payload };

        default:
            return state;
    }
};

function TrainingMannualScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, training_mannual }, dispatch] = useReducer(reducer, {
        training_mannual: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/training_mannuals/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === training_mannual._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/training_mannuals/${training_mannual._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...training_mannual, quantity }
        })
        navigate('/cart')
    }


    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === training_mannual._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/training_mannuals/${training_mannual._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...training_mannual, quantity }
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
                '/api/tramanreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    training_mannualId: training_mannual._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/training_mannuals/slug/${slug}`);
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
                        <img className="img-large p-5" src={training_mannual.image} alt={training_mannual.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{training_mannual.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={training_mannual.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({training_mannual.tramanreviews.length})</p>
                            </li>
                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we provide professional training manual printing services designed to support your educational and organizational needs. Whether for employee onboarding, skill development, or instructional purposes, our training manuals are crafted to be both informative and visually engaging.<br />
                                    <b>Our Types:</b> <br />
                                    Standard Training Manuals: Traditional formats with clear layouts, ideal for general training and educational use.<br />
                                    Custom Training Manuals: Tailored designs with unique sizes, layouts, and features to fit your specific training requirements and branding.<br />
                                    Premium Training Manuals: High-quality materials and finishes, such as laminated covers, spiral binding, and high-grade paper, for a durable and professional look.<br />
                                    <b>Sizes:</b>
                                    We offer a range of standard sizes and custom dimensions, including popular options such as 8.5” x 11” and A4. Custom sizes are available to suit your specific needs.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on manual type, size, number of pages, and customization options. For a detailed quote tailored to your project, please contact us directly.
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or collaborate with our team to create a custom layout that effectively communicates your training material.</li>
                                        <li> **Content:** Personalize with your own text, images, and diagrams to enhance clarity and engagement.</li>
                                        <li> **Colors and Finishes:** Select from a variety of colors and finishes, including matte, gloss, or satin for covers and interior pages.</li>
                                        <li> **Paper Quality:** Choose from premium paper stocks such as glossy, matte, or uncoated for a professional and high-quality feel.</li>
                                        <li> **Binding Options:** Opt for binding methods such as spiral binding, perfect binding, or comb binding to suit your manual’s usage and durability needs.</li>
                                        <li> **Special Features:** Add features like tabbed sections, pockets for inserts, or laminated covers for additional functionality and longevity.</li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#training_mannualreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="training_mannualreviews">
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
                <TrainingMannual />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {training_mannual.training_mannualreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {training_mannual.training_mannualreviews.map((review) => (
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


export default TrainingMannualScreen;