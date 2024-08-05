import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import Magzine from "../Printing/Magzine";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, magzine: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, magzine: action.payload };
        default:
            return state;
    }
};

function MagzineScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, magzine }, dispatch] = useReducer(reducer, {
        magzine: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/magzines/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === magzine._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/magzines/${magzine._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...magzine, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === magzine._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/magzines/${magzine._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...magzine, quantity }
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
                '/api/magzinreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    magzineId: magzine._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/magzines/slug/${slug}`);
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
                        <img className="img-large p-5" src={magzine.image} alt={magzine.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{magzine.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={magzine.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({magzine.magzinreviews.length})</p>
                            </li>

                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we offer professional magazine printing services designed to bring your publication to life with high-quality materials and stunning visuals. Whether you’re producing a business magazine, a lifestyle publication, or an event program, our custom solutions are tailored to meet your needs and exceed your expectations.<br />
                                    <b>Our Types:</b> <br />
                                    Standard Magazines: Traditional formats and sizes for general publishing needs, including monthly, quarterly, or annual issues.<br />
                                    Custom Magazines: Fully personalized magazines with unique sizes, binding options, and layouts to fit your specific requirements.<br />
                                    Premium Magazines: High-end printing options, including glossy finishes, high-quality paper stocks, and deluxe binding for a luxurious feel.<br />
                                    <b>Sizes:</b>
                                    We offer a range of standard sizes and custom dimensions, including popular options such as 8.5” x 11” and 6” x 9”. Custom sizes are available to suit your publication’s design and needs.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on magazine type, size, number of pages, and customization options. For a detailed quote based on your project requirements, please contact us directly.
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or work with our team to create a unique layout that aligns with your brand and content.</li>
                                        <li> **Cover and Interior:** Customize the cover with images, logos, and text, and design the interior pages to enhance readability and visual appeal.</li>
                                        <li> **Colors and Finishes:** Select from a variety of colors and finishes, including matte, gloss, or satin for both covers and interior pages.</li>
                                        <li> **Paper Quality:** Choose from premium paper stocks such as glossy, matte, or uncoated options for a professional and high-quality feel.</li>
                                        <li> **Binding Options:** Select from various binding methods, including perfect binding, saddle stitching, or spiral binding, to suit your magazine’s needs.</li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#magzinreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="magzinreviews">
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
                <Magzine />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {magzine.magzinreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {magzine.magzinreviews.map((review) => (
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

export default MagzineScreen;