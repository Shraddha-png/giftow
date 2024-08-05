import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import DocumentPrinting from "../Printing/Document_Printing";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, document_printing: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, document_printing: action.payload };
        default:
            return state;
    }
};

function DocumentPrintingScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, document_printing }, dispatch] = useReducer(reducer, {
        document_printing: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/document_printings/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === document_printing._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/document_printings/${document_printing._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...document_printing, quantity }
        })
        navigate('/cart')
    }
    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === document_printing._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/document_printings/${document_printing._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...document_printing, quantity }
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
                '/api/docprireviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    document_printingId: document_printing._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/document_printings/slug/${slug}`);
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
                        <img className="img-large p-5" src={document_printing.image} alt={document_printing.name} width='100%'></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{document_printing.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={document_printing.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({document_printing.docprireviews.length})</p>
                            </li>

                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions** we offer comprehensive document printing services designed to meet your business and personal needs with precision and professionalism. Whether you need to print reports, presentations, or important documents, our high-quality printing solutions ensure your materials are presented with clarity and style.<br />
                                    <b>Our Types:</b> <br />
                                    Standard Document Printing: Reliable printing for everyday documents, including text-heavy reports, memos, and administrative paperwork.<br />
                                    Custom Document Printing: Tailored options for unique formats, sizes, and designs to fit specific needs and preferences.<br />
                                    Premium Document Printing: High-end printing options with enhanced materials and finishes for professional reports, presentations, and high-impact documents.<br />
                                    <b>Sizes:</b>
                                    We offer a range of standard sizes and custom dimensions, including popular options such as A4, letter size, and legal size. Custom sizes are available to meet your specific requirements.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on document type, size, number of pages, and customization options. For a detailed quote based on your specific needs, please contact us directly.
                                    <ul>
                                        <li> **Designs:** Customize the layout of your documents with our design templates or collaborate with our team to create a professional look that suits your needs.</li>
                                        <li> **Color Printing:** Choose from full-color or black-and-white printing to match your document's requirements and budget.</li>
                                        <li> **Paper Quality:** Select from a variety of paper stocks, including standard, premium, or specialty papers, to enhance the presentation and durability of your documents.</li>
                                        <li> **Finishes:** Opt for finishes such as matte, gloss, or satin to improve the look and feel of your printed materials.</li>
                                        <li> **Binding Options:** Choose from various binding methods, including stapling, spiral binding, or perfect binding, to keep your documents organized and professional.</li>
                                        <li> **Special Features:** Add features like perforations, hole punching, or laminating for added functionality and durability.</li>
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
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#docprireviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="docprireviews">
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
                <DocumentPrinting />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {document_printing.docprireviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {document_printing.docprireviews.map((review) => (
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

export default DocumentPrintingScreen;