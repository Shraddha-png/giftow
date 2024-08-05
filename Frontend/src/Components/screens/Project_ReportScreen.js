import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRatingScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { getError } from "../Utiles";
import { Store } from "../Store";
import ProjectReport from "../Printing/Project_Report";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, project_report: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'REVIEW_SUBMITTED':
            return { ...state, project_report: action.payload };
        default:
            return state;
    }
};

function ProjectReportScreen() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [{ loading, error, project_report }, dispatch] = useReducer(reducer, {
        project_report: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/project_reports/slug/${slug}`);
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
        const existItem = cart.cartItems.find((x) => x._id === project_report._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/project_reports/${project_report._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...project_report, quantity }
        })
        navigate('/cart')
    }


    const buyNowHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === project_report._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/project_reports/${project_report._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...project_report, quantity }
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
                '/api/prorepreviews',
                {
                    rating: Number(rating),
                    title,
                    comment,
                    project_reportId: project_report._id,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log('Review submitted:', data);
            const result = await axios.get(`/api/project_reports/slug/${slug}`);
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
                        <img className="img-large" src={project_report.image} alt={project_report.name}></img>
                    </div>
                    <div className="col-md-7 box">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h3>{project_report.name}</h3>
                            </li>
                            <li className="list-group-item inlineclass">
                                <StarRating rating={project_report.rating || 0} onRatingChange={onRatingChange} />
                                <p>Review({project_report.prorepreviews.length})</p>
                            </li>

                            <li className="list-group-item">
                                <b> Description:</b>
                                <p>At **Fine Print Solutions**, we offer comprehensive project report printing services designed to present your work with clarity and professionalism. Whether for academic, business, or organizational projects, our high-quality printing solutions ensure that your reports are both visually appealing and functionally effective.<br />
                                    <b>Our Types:</b> <br />
                                    Standard Project Reports: Traditional formats with clear, professional layouts, suitable for general reporting needs.<br />
                                    Custom Project Reports: Tailored designs with unique sizes, layouts, and features to meet your specific project requirements and branding.<br />
                                    Premium Project Reports: High-end printing options including hardcover binding, foil stamping, and high-quality paper stocks for a polished and prestigious presentation.<br />

                                    <b>Sizes:</b>
                                    We offer a variety of standard sizes and custom dimensions, including popular options such as A4, letter size, and custom formats to fit your specific needs.<br />
                                    <b>Pricing:</b>
                                    Pricing varies based on report type, size, number of pages, and customization options. For a detailed quote tailored to your project, please contact us directly.
                                    <ul>
                                        <li> **Designs:** Choose from our design templates or work with our team to create a custom layout that effectively presents your project’s content.</li>
                                        <li> **Cover and Interior Pages:** Customize the cover with your project title, logo, and other details, and design the interior pages to enhance readability and presentation.</li>
                                        <li> **Color Printing:** Opt for full-color or black-and-white printing to suit your report’s needs and budget.</li>
                                        <li> **Paper Quality:** Select from a variety of paper stocks, including standard, premium, or specialty papers, for a high-quality and professional finish.</li>
                                        <li> **Finishes:** Choose from finishes such as matte, gloss, or satin to enhance the look and feel of your printed materials.</li>
                                        <li> **Binding Options:** Choose from binding methods such as spiral binding, comb binding, perfect binding, or hardcover binding to keep your report organized and durable.</li>
                                        <li> **Special Features:** Add features like tabbed dividers, laminated covers, or custom inserts for added functionality and impact.</li>
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

                {/* Created Review */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mt-5">
                            <nav className="nav">
                                <a className="btn btn-primary mt-3" aria-current="page" data-bs-toggle="collapse" href="#prorepreviews" >Write a Review</a>
                            </nav>
                            <div className="collapse" id="prorepreviews">
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
                <ProjectReport />
                <hr className="mt-1" />
                <div className="container-fluid mt-4">
                    <h4>Customer Reviews</h4>
                    {project_report.prorepreviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="list-group">
                        {project_report.prorepreviews.map((review) => (
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

export default ProjectReportScreen;