import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import FolderDesktop from "../Printing/Folder_desktop.js"


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, folder: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, folder: action.payload };
        default:
            return state;
    }
};

function FolderScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, folder }, dispatch] = useReducer(reducer, {
        folder: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/folders/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === folder._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/folders/${folder._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...folder, quantity }
        })
        navigate('/cart')
    }
    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === folder._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/folders/${folder._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...folder, quantity }
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
                '/api/folderreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    folderId: folder._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/folders/slug/${slug}`);
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
                        <img className="img-large p-5" src={folder.image} alt={folder.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{folder.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={folder.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({folder.folderreviews.length})</p>
                            </li>

                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**,we specialize in custom folder and docket printing that combines functionality with professional elegance. Whether you need folders for business presentations, client meetings, or organizational purposes, our high-quality options are designed to enhance your brand and keep your documents organized.<br />
                                    <b>Our Types:</b> <br />
                                    Presentation Folders: Ideal for business meetings and presentations, available with pockets for documents, business cards, and more.<br />
                                    Corporate Folders: Professional folders designed for branding, including custom designs and finishes..<br />
                                    Custom Dockets: Tailored designs for organizing and storing important documents, available in various sizes and styles.<br />
                                    Premium Folders and Dockets: High-end materials and finishes, such as embossed logos, foil stamping, and deluxe paper stocks, for a sophisticated look.<br />
                                    <b>Sizes:</b>
                                    We offer a range of standard sizes and custom dimensions to fit your specific needs, including A4, letter size, and custom formats.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on folder or docket type, size, and customization options. For a detailed quote based on your project requirements, please contact us directly.
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or work with our team to create a custom layout that reflects your brand’s identity.</li>
                                        <li> **Logos:** Incorporate your company logo or event branding for a cohesive professional look.</li>
                                        <li> **Colors and Finishes:** Select from a variety of colors and finishes, including matte, gloss, and textured options to enhance visual appeal and durability.</li>
                                        <li> **Materials:** Choose from various high-quality materials such as cardstock, linen, or leatherette for a premium feel.</li>
                                        <li> **Special Features:** Add features like die-cut pockets, custom tabs, or reinforced edges for added functionality and durability.</li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#folderreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="folderreviews">
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
                <FolderDesktop />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {folder.folderreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {folder.folderreviews.map((review) => (
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

export default FolderScreen;