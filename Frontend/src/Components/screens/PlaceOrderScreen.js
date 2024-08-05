import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import LoadingBox from "../LoadingBox";

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default function PlaceOrderScreen() {
    const navigate = useNavigate();
    const [{ loading }] = useReducer(reducer, { loading: false });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    // Ensure userInfo is not null
    // Ensure userInfo is not null
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [userInfo, navigate, cart.paymentMethod]);

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.18 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        const orderData = {
            orderItems: cart.cartItems.map(item => ({
                slug: item.slug,
                name: item.name,
                code: item.code,
                variety: item.variety, // Include variety
                quantity: item.quantity,
                image: item.image,
                price: item.price,
            })),
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemPrice: cart.itemsPrice, // Corrected field name
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        };

        console.log('Order Data:', orderData); // Log order data

        try {
            const { data } = await Axios.post(
                '/api/orders',
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
        } catch (err) {
            console.error('Error placing order:', err);
            // Handle error (toast or notification)
            toast.error("Failed to place order");
        }
    };



    return (
        <>
            <div>
                <div className="container-fluid">
                    <h3 className="my-3">Preview Order</h3>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="card-title">Shipping</div>
                                    <div className="card-text">
                                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                        <strong>Company:</strong> {cart.shippingAddress.companyName} <br />
                                        <strong>Business:</strong> {cart.shippingAddress.businessName} <br />
                                        <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country},{cart.shippingAddress.region}
                                    </div>
                                    <Link to="/shipping">Edit</Link>
                                </div>
                            </div>

                            {/* <div className="card mb-3">
                        <div className="card-body">
                            <div className="card-title">Payment</div>
                            <div className="card-text">
                                <strong>Method:</strong> {cart.paymentMethod}
                            </div>
                            <Link to="/payment">Edit</Link>
                        </div>
                    </div> */}

                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="card-title">Items</div>
                                    <div className="list-group list-group-flush">
                                        {cart.cartItems.map((item) => (
                                            <div className="list-group-item" key={item._id}>
                                                <div className="row text-center">
                                                    <div className="col-md-6">
                                                        <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>
                                                        {/* <Link to={`/products/${item.slug}`}>{item.name}</Link> */}
                                                        <p>{item.name}</p>
                                                        <div> {item.code}</div>
                                                        <div> {item.variety}</div> {/* Display variety */}
                                                    </div>
                                                    <div className="col-md-3"><span>{item.quantity}</span></div>
                                                    <div className="col-md-3"><i className="bi bi-currency-rupee"></i>{item.price}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link to="/cart">Edit</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">Order Summary</div>
                                    <div className="list-group list-group-flush">
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col">Items</div>
                                                <div className="col"><i className="bi bi-currency-rupee"></i>{cart.itemsPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col">Shipping</div>
                                                <div className="col"><i className="bi bi-currency-rupee"></i>{cart.shippingPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col">GST</div>
                                                <div className="col"><i className="bi bi-currency-rupee"></i>{cart.taxPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row">
                                                <div className="col">Order Total</div>
                                                <div className="col"><i className="bi bi-currency-rupee"></i>{cart.totalPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="d-grid">
                                                <button type="button" className="btn btn-success"
                                                    onClick={placeOrderHandler}
                                                // disabled={cart.cartItems.length === 0}
                                                > Confirm Order</button>
                                            </div>
                                            {loading && <LoadingBox></LoadingBox>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}
