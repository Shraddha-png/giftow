import React, { useEffect, useReducer, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../Utiles";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, order: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function OrderScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                console.log(`Fetching order with ID: ${orderId}`);
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                console.log('Order data received:', data);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                console.error('Error fetching order:', err);
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        if (!userInfo) {
            navigate('/signin');
        } else {
            if (!order._id || (order._id && order._id !== orderId)) {
                fetchOrder();
            }
        }
    }, [order, userInfo, orderId, navigate]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <title>Order {orderId}</title>
            <h1 className="my-3">Order {orderId}</h1>
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="card-title">Shipping</div>
                            <div className="card-text">
                                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                <strong>Company:</strong> {order.shippingAddress.companyName} <br />
                                <strong>Business:</strong> {order.shippingAddress.businessName} <br />
                                <strong>Address:</strong> {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},
                                {order.shippingAddress.country},{order.shippingAddress.region}
                            </div>
                            {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {order.deliveredAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                            )}
                        </div>
                    </div>
                    {/* <div className="card mb-3">
                        <div className="card-body">
                            <div className="card-title">Payment</div>
                            <div className="card-text">
                                <strong>Method:</strong> {order.paymentMethod}
                            </div>
                            {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {order.paidAt}
                                </MessageBox>
                            ):(
                                <MessageBox variant="danger">Not Paid</MessageBox>
                            )}
                        </div>
                    </div> */}
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="card-title">Items</div>
                            <div className="list-group list-group-flush">
                                {order.orderItems.map((item) => (
                                    <div className="list-group-item" key={item._id}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded img-thumbnail"
                                                ></img>{' '}
                                                <i>{item.name}</i>

                                            </div>
                                            <div className="col-md-3">
                                                <span>{item.quantity}</span>
                                            </div>
                                            <div className="col-md-3"><i className="bi bi-currency-rupee"></i>{item.price}</div>
                                            <div className="col-md-3">
                                                <div>Code: {item.code}</div> {/* Display code */}
                                                <div> {item.variety}</div> {/* Display variety */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title text-danger"><h5>Order Summary</h5></div>
                            <div className="list-group list-group-flush">
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Items</div>
                                        <div className="col"><i className="bi bi-currency-rupee"></i>{order.itemPrice.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">Shipping</div>
                                        <div className="col"><i className="bi bi-currency-rupee"></i>{order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col">GST</div>
                                        <div className="col"><i className="bi bi-currency-rupee"></i>{order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col"><strong>Total</strong></div>
                                        <div className="col"><strong><i className="bi bi-currency-rupee"></i>{order.totalPrice.toFixed(2)}</strong></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
