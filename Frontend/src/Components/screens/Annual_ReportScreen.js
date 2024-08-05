import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import AnnualReport from "../Printing/Annual_Report";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, annual_Report: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
            case 'REVIEW_SUBMITTED':
            return { ...state, annual_report: action.payload };
        default:
            return state;
    }
};

function AnnualReportScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, annual_Report }, dispatch] = useReducer(reducer, {
        annual_Report: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/annual_Reports/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === annual_Report._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/annual_Reports/${annual_Report._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...annual_Report, quantity }
        })
        navigate('/cart')
    }

    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === annual_Report._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/annual_Reports/${annual_Report._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...annual_Report, quantity }
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
                '/api/annualrepreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    annual_ReportId: annual_Report._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/annual_Reports/slug/${slug}`);
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
                <div className="col-md-4">
                    <img className="img-large p-5" src={annual_Report.image} alt={annual_Report.name} width='100%'></img>
                </div>
                <div className="col-md-5 box">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h4>{annual_Report.name}</h4>
                        </li>
                        <li className="list-group-item inlineclass">
                            <StarRating rating={annual_Report.rating || 0} onRatingChange={onRatingChange} />
                            <p>Review({annual_Report.annualrepreviews.length})</p>
                        </li>

                        <li className="list-group-item">
                            <b> Description:</b>
                            <p>At **Fine Print Solutions** we specialize in producing high-quality annual reports that effectively showcase your organization's achievements, financial performance, and future goals. Our custom printing solutions ensure your report is both informative and visually compelling, reflecting your brand’s professionalism and commitment.<br />
                                <b>Our Types:</b> <br />
                                Standard Annual Reports: Traditional formats with comprehensive content and clear layouts, ideal for general reporting needs.<br />
                                Custom Annual Reports: Tailored designs with unique sizes, layouts, and features to match your organization’s branding and specific reporting requirements.<br />
                                Premium Annual Reports: High-end materials and finishes, such as hardcover binding, foil stamping, and high-quality paper stocks, for a prestigious look and feel.<br />
                                <b>Sizes:</b>
                                We offer a variety of standard sizes and custom dimensions, including popular options such as 8.5” x 11” and A4. Custom sizes are available to fit your specific design and content needs.<br />
                                <b>Pricing:</b>
                                Pricing varies based on report type, size, number of pages, and customization options. For a detailed quote tailored to your project, please contact us directly.
                                <ul>
                                    <li> **Designs:** Choose from our design templates or work with our team to create a custom layout that aligns with your brand and effectively communicates your annual report’s content.</li>
                                    <li> **Content:** Incorporate your own text, images, charts, and graphs to present data and achievements clearly and professionally.</li>
                                    <li> **Colors and Finishes:** Select from a range of colors and finishes, including matte, gloss, or metallic options for both covers and interior pages.</li>
                                    <li> **Paper Quality:** Opt for premium paper stocks such as glossy, matte, or textured to enhance the look and feel of your report.</li>
                                    <li> **Binding Options:** Choose from binding methods such as perfect binding, saddle stitching, or hardcover binding for a polished and professional finish.</li>
                                    <li> **Special Features:** Add features like embossed logos, foil stamping, or custom tabbed sections for added impact and functionality.</li>
                                </ul>
                                How to Contact Us:
                                For more information or to place an order, please reach out to us at:<br />

                                <b> Phone: 9920033112</b><br />
                                <b> Email: fmprintsolutions@gmail.com</b><br />

                                Let us help you create envelopes that make a great first impression. Contact us today to discuss your customization options!
                            </p></li>
                    </ul>
                </div>
                <div className="col-md-3 p-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="list-group">


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
                <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 mt-5">
                                <nav className="nav">
                                    <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#annualrepreviews" >Write a Review</a>
                                </nav>
                                <div className="collapse" id="annualrepreviews">
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
                <AnnualReport />
                <hr className="mt-1" />
                    <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {annual_Report.annualrepreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {annual_Report.annualrepreviews.map((review) => (
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
            </div>
        );
}

export default AnnualReportScreen;