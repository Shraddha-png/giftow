import React, { useContext } from "react";
import { Store } from "../Store";
import MessageBox from "../MessageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function CartScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems }, isLoggedIn
    } = state;

    const updateCartHandler = async (item, quantity, endpoint) => {
        try {
            const { data } = await axios.get(`/api/${endpoint}/${item._id}`);
            if (data.countInStock < quantity) {
                window.alert('Sorry. Product is out of stock');
                return;
            }
            ctxDispatch({
                type: 'CART_ADD_ITEM',
                payload: { ...item, quantity }
            });
        } catch (error) {
            // console.error('Error updating cart:', error);
        }
    };

    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };


    // const checkoutHandler = () => {
    //     navigate('/loginModal?redirect=/shipping');
    // };

    const totalQuantity = cartItems.reduce((a, c) => a + c.quantity, 0);
    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

    return (
        <div>
            <div className="container-fluid">
            <title>Shopping Cart</title>
            <h2 className="mt-3 text-danger text-center"><i className="bi bi-bag-heart px-3" />Shopping Cart</h2>
            <div className="row mt-5">
                <div className="col-md-8 ">
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to='/'>Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <div className="list-group">
                            {cartItems.map((item) => (
                                <div className="list-group-item" key={`${item._id}-${item.variety}`}>
                                    <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />
                                            <i className="text-primary">{item.name}</i>{''}
                                            <div> {item.code}</div>
                                            <div> {item.variety}</div>

                                        </div>
                                        <div className="col-md-3">

                                            {/* <span>{item.quantity}</span> */}
                                            <input type="number" className="form-control text-center addinput" value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value) || 0;
                                                    updateCartHandler(item, newQuantity, 'products'); updateCartHandler(item, newQuantity, 'bags'); updateCartHandler(item, newQuantity, 'mugs'); updateCartHandler(item, newQuantity, 'frostedMugs'); updateCartHandler(item, newQuantity, 'awards'); updateCartHandler(item, newQuantity, 'teamugs'); updateCartHandler(item, newQuantity, 'couplemugs'); updateCartHandler(item, newQuantity, 'hotcoldsippers'); updateCartHandler(item, newQuantity, 'diaries'); updateCartHandler(item, newQuantity, 'badges'); updateCartHandler(item, newQuantity, 'tshirts'); updateCartHandler(item, newQuantity, 'travelmugs'); updateCartHandler(item, newQuantity, 'mgnameplates'); updateCartHandler(item, newQuantity, 'mousepads'); updateCartHandler(item, newQuantity, 'mobileholds'); updateCartHandler(item, newQuantity, 'clothings'); updateCartHandler(item, newQuantity, 'pendrives'); updateCartHandler(item, newQuantity, 'bearmugs'); updateCartHandler(item, newQuantity, 'magicmugs'); updateCartHandler(item, newQuantity, 'shotglasses'); updateCartHandler(item, newQuantity, 'giftsets'); updateCartHandler(item, newQuantity, 'singlwallsippers'); updateCartHandler(item, newQuantity, 'notebooks'); updateCartHandler(item, newQuantity, 'notedirs'); updateCartHandler(item, newQuantity, 'plasticsippers'); updateCartHandler(item, newQuantity, 'copperbottles'); updateCartHandler(item, newQuantity, 'antiskitbottles'); updateCartHandler(item, newQuantity, 'borosilicategalssbottles'); updateCartHandler(item, newQuantity, 'bomboobottles'); updateCartHandler(item, newQuantity, 'shakerbottles'); updateCartHandler(item, newQuantity, 'roundmgbadges'); updateCartHandler(item, newQuantity, 'pocmagbadges'); updateCartHandler(item, newQuantity, 'metnamebadges'); updateCartHandler(item, newQuantity, 'roundpinbadges'); updateCartHandler(item, newQuantity, 'acrynamebadges'); updateCartHandler(item, newQuantity, 'clipplabadges'); updateCartHandler(item, newQuantity, 'dommagbadges'); updateCartHandler(item, newQuantity, 'ovlmgbadges'); updateCartHandler(item, newQuantity, 'laptopsleeves'); updateCartHandler(item, newQuantity, 'pinnmplates'); updateCartHandler(item, newQuantity, 'domnmplates'); updateCartHandler(item, newQuantity, 'acrnmplates'); updateCartHandler(item, newQuantity, 'metlnmplates'); updateCartHandler(item, newQuantity, 'flasks'); updateCartHandler(item, newQuantity, 'power_banks'); updateCartHandler(item, newQuantity, 'tablelamps'); updateCartHandler(item, newQuantity, 'digitalclocks'); updateCartHandler(item, newQuantity, 'digitalphframes'); updateCartHandler(item, newQuantity, 'photoframes'); updateCartHandler(item, newQuantity, 'keychains'); updateCartHandler(item, newQuantity, 'lunchBoxes'); updateCartHandler(item, newQuantity, 'kettles'); updateCartHandler(item, newQuantity, 'card_holders'); updateCartHandler(item, newQuantity, 'best_sellers'); updateCartHandler(item, newQuantity, 'fridgeMagnets'); updateCartHandler(item, newQuantity, 'paper_mugs'); updateCartHandler(item, newQuantity, 'coasters'); updateCartHandler(item, newQuantity, 'bands'); updateCartHandler(item, newQuantity, 'bomboomugs'); updateCartHandler(item, newQuantity, 'brochures'); updateCartHandler(item, newQuantity, 'standees'); updateCartHandler(item, newQuantity, 'occasions'); updateCartHandler(item, newQuantity, 'home_keychains'); updateCartHandler(item, newQuantity, 'printings'); updateCartHandler(item, newQuantity, 'teachaccesories'); updateCartHandler(item, newQuantity, 'sublimation_items'); updateCartHandler(item, newQuantity, 'containers'); updateCartHandler(item, newQuantity, 'desk_stands'); updateCartHandler(item, newQuantity, 'totebags'); updateCartHandler(item, newQuantity, 'jutebags'); updateCartHandler(item, newQuantity, 'bagpacks'); updateCartHandler(item, newQuantity, 'cardpendrives'); updateCartHandler(item, newQuantity, 'bookmarks'); updateCartHandler(item, newQuantity, 'folders'); updateCartHandler(item, newQuantity, 'magzines'); updateCartHandler(item, newQuantity, 'training_mannuals'); updateCartHandler(item, newQuantity, 'annual_Reports'); updateCartHandler(item, newQuantity, 'document_printings'); updateCartHandler(item, newQuantity, 'project_reports'); updateCartHandler(item, newQuantity, 'stickers'); updateCartHandler(item, newQuantity, 'notepads'); updateCartHandler(item, newQuantity, 'sippers'); updateCartHandler(item, newQuantity, 'family_tshirts'); updateCartHandler(item, newQuantity, 'fullsleave_tshirts'); updateCartHandler(item, newQuantity, 'girls_tshirts'); updateCartHandler(item, newQuantity, 'couple_tshirts'); updateCartHandler(item, newQuantity, 'sports_tshirts'); updateCartHandler(item, newQuantity, 'polo_tshirts'); updateCartHandler(item, newQuantity, 'dry_fit_tshirts'); updateCartHandler(item, newQuantity, 'hoodies'); updateCartHandler(item, newQuantity, 'caps'); updateCartHandler(item, newQuantity, 'wallets'); updateCartHandler(item, newQuantity, 'certificates'); updateCartHandler(item, newQuantity, 'cushion_covers'); updateCartHandler(item, newQuantity, 'magnetic_photoframes'); updateCartHandler(item, newQuantity, 'acrylic_photoprints'); updateCartHandler(item, newQuantity, 'schoolbags'); updateCartHandler(item, newQuantity, 'slingbags'); updateCartHandler(item, newQuantity, 'travelbags'); updateCartHandler(item, newQuantity, 'id_landyards'); updateCartHandler(item, newQuantity, 'non_wovenbags'); updateCartHandler(item, newQuantity, 'wildcraftbags'); updateCartHandler(item, newQuantity, 'headphones'); updateCartHandler(item, newQuantity, 'laptop_skins'); updateCartHandler(item, newQuantity, 'mobile_accessories'); updateCartHandler(item, newQuantity, 'magnifires'); updateCartHandler(item, newQuantity, 'cushions'); updateCartHandler(item, newQuantity, 'bags_wallets'); updateCartHandler(item, newQuantity, 'bottle_sippers'); updateCartHandler(item, newQuantity, 'giftcards'); updateCartHandler(item, newQuantity, 'posters'); updateCartHandler(item, newQuantity, 'stamps'); updateCartHandler(item, newQuantity, 'tags'); updateCartHandler(item, newQuantity, 'woodentblitems'); updateCartHandler(item, newQuantity, 'pramotionalproducts'); updateCartHandler(item, newQuantity, 'speakers'); updateCartHandler(item, newQuantity, 'pens');updateCartHandler(item, newQuantity, 'mouse_keyboards');updateCartHandler(item, newQuantity, 'glasstumblers');updateCartHandler(item, newQuantity, 'desktopitems');
                                                }}
                                                min="1" max={item.countInStock} />


                                        </div>
                                        <div className="col-md-3">
                                            {isLoggedIn ? (
                                                <><i className="bi bi-currency-rupee"></i>{item.price}</>
                                            ) : (
                                                'Login/Register to see Price'
                                            )}
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-light" onClick={() => removeItemHandler(item)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="list-group list-group-flush">
                                <div className="list-group-item">

                                    <h3>
                                        Subtotal ({totalQuantity} items): {' '}
                                        {isLoggedIn ? (
                                            <><i className="bi bi-currency-rupee"></i>{totalPrice}</>
                                        ) : (
                                            'Login/Register to see Price'
                                        )}
                                    </h3>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary" type="button" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-3">

                <Link to='/'><button className="btn btn-primary bg-secondary">CONTINUE SHOPPING</button></Link>
            </div>
            </div>
        </div>
    );
}

