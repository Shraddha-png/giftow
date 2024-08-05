
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "./Store";
import { ToastContainer } from 'react-toastify'


function Navbar() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    //###### Search product #######
    const logoUrl = "/images/LOGO/Giftoworld Final Logo 3.png"

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod')
        window.location.href = "./signin"
    }

    //    Search Project
    const searchHandle = (event) => {
        console.warn(event.target.value)
    }


    // search bar

    return (
        <>

            <div className="text-white  border-bottom ">

                <h6 className=" p-5 text-dark">call: +91 9920033112</h6>

            </div>


            <div className="text-center  bg-white border-bottom">
                <div className="container-fluid navfirst p-3">
                    <div className="row">
                        {/* <!-- Left elements --> */}
                        <div className="col-md-3 d-flex justify-content-center justify-content-md-start  mb-md-0">
                            <Link to="/" className="ms-md-2">
                                <img src={logoUrl} width="250" height="46" className="rounded" />
                            </Link>
                        </div>
                        {/* <!-- Left elements --> */}

                        {/* <!-- Center elements --> */}
                        <div className="col-md-4">
                            <form className="d-flex input-group w-auto my-auto mb-3 mb-md-0" >
                                <input
                                    type="search"
                                    className="form-control rounded searchnav mt-3"
                                    placeholder="Search Product"
                                    onChange={searchHandle}
                                />
                                {/* <div className="input-group-append">
                                    <button className="btn navserch mt-3" type="submit">
                                        <i className="bi bi-search mt-3"></i>
                                    </button>
                                </div> */}
                            </form>
                        </div>
                        {/* <div className="col-md-4 search-product-box">
                            <input type="text" placeholder="Search Product" className=""></input>

                        </div> */}
                        {/* <!-- Right elements --> */}
                        <div className="col-md-3 d-flex justify-content-center justify-content-md-end align-items-center float-right">
                            <div className="d-flex">
                                {/* <!--cart/ Person Fill --> */}



                                <Link to='/cart'><button className=" btn  text-white btnclass  m-2"><i className="bi bi-cart text-dark carticon"></i>
                                    {cart.cartItems.length > 0 && (
                                        <div className='badge text-dark'>
                                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                        </div>
                                    )}
                                </button></Link>

                                {/* ####### Sign In #######  */}
                                {userInfo ? (
                                    <div className="dropdown ">
                                        <button
                                            className="btn btnclass dropdown-toggle  m-2"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {userInfo.fname}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <Link className="dropdown-item" to="profile">User Profile</Link>
                                            <Link className="dropdown-item" to="orderhistory">Order History</Link>

                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item btnclass" to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <Link className="nav-link btnclass m-2" to="/signin"><button className="btn navbtn ">Sign In</button></Link>
                                )}
                                <ToastContainer position="button-center" limit={1} />
                            </div>
                            {/* <!-- Right elements --> */}
                        </div>
                    </div>
                </div>
            </div>


            <nav className="navbar navbar navbar-expand-xxl bg-body-tertiary">
                <div className="container-fluid ">



                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse justify-content-start " id="navbarNavDropdown">
                        <ul className="navbar-nav ">
                            <li className="nav-item ">
                                <Link className="nav-link navcolor1 " aria-current="page" to="">Home</Link>
                            </li>

                            <li className="nav-item dropdown ">
                                <Link className="nav-link dropdown-toggle navcolor1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Product Category
                                </Link>
                                <ul className="dropdown-menu ">
                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Best Seller &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="pen">Pen</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">T Shirts &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Promotional T-shirts</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="poloTshirts">Polo T-shirt(Cotton)</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="coupleTshirts">Couple T-shirts</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="dryFitTshirts">Dry Fit T-shirts (Round <br></br>Nech )</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="sportsTshirts">Sports T-shirt</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="sportsTshirts">Girls T-shirt</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="fullSleevesTshirts">Full Sleeves T-shirt</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="familyTshirts">Family T-shirts</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Custom Name Plates &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor navcolor" to="pinplate">Pin Name Plate</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="magnetplate">Magnate Name Plate</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="domplate">Dom Name Plate</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="Acrylicplate">Acrylic Name Plate</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="metalicplat">Metallic Name Plate</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Mugs &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor navcolor" to="frosted">Frosted Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="travel">Travel Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="magic">Magic Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="couple">Couple Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="coffee">Tea & Coffee Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="beer">Beer Mugs</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Sippers &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor navcolor" to="hotcold">Hot & Cold Flask Sipper</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="singlewall">Single Wall Sipper</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="plasticwall">Plastic Sipper</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="copper">Copper Bottle</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="antiskit">Anti Skit Bottle</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="borosillicate">Borosillicate Glass Bottle</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="bomboo">Bomboo Bottle</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="shaker">Shaker Bottle</Link></li>
                                                </ul>
                                            </li>
                                            <ul className="dropdown-menu dropdown-submenu">
                                                <li><Link className="dropdown-item navcolor navcolor" to="#">Badges &raquo;</Link>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="pocketbadge">Pocket Magnetic Badges</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="roundpinbadge">Round Magnetic Badges</Link></li>
                                                </li>
                                            </ul>

                                            <li><Link className="dropdown-item navcolor navcolor" to="diaries">Diaries</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="bags">Bags</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="notebook">Notebooks</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="holder">Pop Mobile <br /> Holders</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="PD">Pen Drives</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="LS">Laptop Sleeve</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="MS">Mouse Pads</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Sippers and <br></br> Tumblers &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="beer">Beer Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="coffee">Tea & Coffee Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="couple">Couple Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="magic">Magic Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="travel">Travel Mug</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="shotGlasses">Shot Glasses</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="sipper">Sippers</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Homes & kitchen &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="photoframe">Photo Frames</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="cushion_covers">Cushion Covers</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="cushion">Cushions</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="Calender">Calenders</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="magphotoframe">Magnetic Photo Frames <br /></Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="acryphotoprint">Acrylic Photo Print</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="coaster">Coasters</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="sublimation">Sublimation Items </Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="container">Container</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="lunchbox">Lunch Boxes</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="kettls">Kettles</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Awards &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="certificate">Certificates</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="awards">Trophy</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Stationary &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="pen">Pen</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="FD">Folder</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Examination <br />Boards</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Planners / <br /> Organizers</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="deskStand">Desk Stand</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Badges &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor navcolor" to="roundpinbadge">Round Pin Badge</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="roundbadge">Round Magnetic <br /> Badges</Link></li>
                                                    <li><Link className="dropdown-item navcolor navcolor" to="pocketbadge">Pocket Magnetic <br /> Badges</Link></li>

                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="diaries">Diaries</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="notepad">Notepads</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="notebook">Notebooks</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="cardHolder">Card Holders</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="keyChains">Key Chains</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="pencil">Pencils</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="id_landyard">IDs and Landyards</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="desktopItem">Desktop Items</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="Clothing">Clothings &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="familyTshirts">Family T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="fullSleevesTshirts">Full Sleeve T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="girlsTshirts">Girls T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Promotional T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="coupleTshirts">Couple T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="sportsTshirts">Sports T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="poloTshirts">Polo T-shirts(Cotton) </Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="dryFitTshirts">Dry Fit T-shirts(Round <br /> Neck)</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="hoodie">Hoodies</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="cap">Caps</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Bags and Wallets &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="checkbook_cover">Cheque Book Covers</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="clutches">Clutches</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="wallets">Wallets</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="LS">Laptop Bag</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="slingbag">Sling Bags</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="toteBag">Tote Bags</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="travelbag">Travel Bags</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="schoolbag">School Bags</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="nonwoven_bag">Non Woven Bgas</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="juteBag">Jute Bag</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="wildcraft_bag">Wildcraft Bags</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="backpack">Backpack</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="#">Teach Accessories &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor navcolor" to="cardPenDrive">Card Pen Drive</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="PD">Pen Drive</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="powerbank">Power Bank</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="headphone">Headphones</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="laptop_skin">Laptop Skin</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="mobile_acc">Mobile Accessories</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">Mobile Pads</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="magnifire">Magnifires</Link></li>
                                            <li><Link className="dropdown-item navcolor navcolor" to="#">LifeStyles Products</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Personalized Products &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="#">Sippers and Tumblers &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor" to="frosted">Frosted Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="travel">Travel Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="magic">Magic Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="couple">Couple Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="coffee"> Tea & Coffee Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="beer">Beer Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="sipper">Sippers &raquo;</Link>
                                                        <ul className="dropdown-menu dropdown-submenu">
                                                            <li><Link className="dropdown-item navcolor" to="hotcold">Hot & Cold Flask Sipper</Link></li>
                                                        </ul>

                                                    </li>
                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor" to="#">Homes & Kitchen &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor" to="#">Cuastom Name Plates &raquo;</Link>
                                                        <ul className="dropdown-menu dropdown-submenu">
                                                            <li><Link className="dropdown-item navcolor" to="pinplate">Pin Name Plate</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="magnetplate">Magnate Name Plate</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="domplate">Dom Name Plate</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="Acrylicplate">Acrylic Name Plate</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="metalicplat">Metallic Name Plate</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link className="dropdown-item navcolor" to="photoframe">Photo Frames</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="cushion_covers">Cushion Covers</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="cushion">Cushions</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="Calender">Calenders</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="magphotoframe">Magnetic Photo Frames <br /></Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="acryphotoprint">Acrylic Photo Print</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="sublimation">Sublimation Items</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="container">Container</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="lunchbox">Lunch Boxes</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor" to="#">Stationary &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor navcolor" to="pen">Pen</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="desktopItem">Desktop Items</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="id_landyard">IDs and Landyards</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="pencil">Pencils</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="keyChains">Key Chains</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="cardHolder">Card Holders<br /></Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="diaries">Diaries</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="badges">Badges</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="#">Badges &raquo;</Link>
                                                        <ul className="dropdown-menu dropdown-submenu">
                                                            <li><Link className="dropdown-item navcolor" to="dombadge">Dom Magnetic Badge</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="ovelbadge">Ovel Magnetic Badge</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="roundbadge">Round Magnetic Badge</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="pocketbadge">Pocket Magnetic Badge</Link></li>
                                                            <li><Link className="dropdown-item navcolor" to="LS">Laptop Bag</Link></li>
                                                        </ul>
                                                    </li>

                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor" to="Clothing">Clothings</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="bag_wallet">Bags & Wallets</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="#">Tech Accessories</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Promotional Product &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="#">Mugs &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor" to="coffee">Tea & Coffee Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="frosted">Frosted Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="travel">Travel Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="magic">Magic Mugs</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="couple">Couple Mug</Link></li>
                                                    <li><Link className="dropdown-item navcolor" to="beer">Beer Mugs</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor" to="lunchbox">Flask &raquo;</Link>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li><Link className="dropdown-item navcolor" to="hotcold">Hot and Cold Flask sipper</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link className="dropdown-item navcolor" to="coaster">Coasters</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="photoframe">Photo Frames</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="sublimation">Sublimation Items</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="container">Container</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="kettls">Kettles</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="lunchbox">Lunch Boxes</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="pen">Pens</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="desktopItem">Desktop items</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="keyChains">Key Chains</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="cardHolder">Card Holders</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="diaries">Diaries</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="deskStand">Desk Stand</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="t-shirts">T shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="wallets">Wallets</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="bags">To Bags</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="juteBag">Jute Bag</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="backpack">Backpack</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="cardPenDrive">Card Pen Drive</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="PD">Pen Drive</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="powerbank">Power bank</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="MS">Mouse Pads</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="fridgeMagnet">Fridge Magnets</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Printing &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="notebook">Notebooks</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="diaries">Diaries</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="Calender">Calenders</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="Brochures">Brochures</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="FlyerPamplate">Flyer/Pamplets</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="Bookmark">Bookmarks</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="FD">Folder/Dockets</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="magzine">Magzine</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="TM">Training Mannual</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="AR">Annual Report</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="DP">Document Printing</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="PR">Project Report</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="Sticker">Sticker</Link></li>

                                        </ul>
                                    </li>

                                    <li><Link className="dropdown-item navcolor" to="#">Everday Occasion &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="#">Anniversary</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="#">Baby Shower</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="#">Birthday</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="#">Wedding</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="#">For Him</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="#">For Her</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="#">For Kids</Link></li>
                                        </ul>
                                    </li>


                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle navcolor1" to="#" role="button" data-bs-toggle="dropdown" >
                                    Best Seller
                                </Link>
                                <ul className="dropdown-menu dropdown">
                                    <li><Link className="dropdown-item navcolor navcolor" to="pen">Pen</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="t-shirts">T-Shirts</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="#">Custom Name Plates &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="pinplate">Pin Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="magnetplate">Magnate Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="domplate">Dom Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="Acrylicplate">Acrylic Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="metalicplat">Metallic Name Plate</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Mugs &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="frosted">Frosted Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="travel">Travel Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="magic">Magic Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="couple">Couple Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="coffee">Tea & Coffee Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="beer">Beer Mugs</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Sippers &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="hotcold">Hot & Cold Flask Sipper</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="singlewall">Single Wall Sipper</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="plasticwall">Plastic Sipper</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="copper">Copper Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="antiskit">Anti Skit Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="borosillicate">Borosillicate Glass Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="bomboo">Bomboo Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="shaker">Shaker Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="glasstumbler">Glass Tumbler</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Badges &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="roundbadge">Round & ovel Magnetic Badges</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="pocketbadge">Pocket Magnetic Badges</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="metalbadge">Metal Name Badge (Magnetic)</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="roundpinbadge">Round Pin Badge</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="acrylicbadge">Acrylic Name Badge <br></br>(Metallic Badge)</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="clipplasticbadge">Clip on Plastic Badge</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="dombadge">Dom Magnetic Badge</Link></li>
                                            {/* <li><Link className="dropdown-item navcolor" to="#">Oval Magnetic Badge</Link></li> */}
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="bags">Bags</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="diaries">Diaries</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="notebook">Notebooks</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="holder">Pop Mobile Holders</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="PD">Pen Drives</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="LS">Laptop Sleeve</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="MS">Mouse Pads</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="coaster">Coasters</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="photoframe">Photo Frames</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="sublimation">Sublimation Items</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="container">Container</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="kettls">Kettles</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="lunchbox">Lunch Boxes</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="desktopItem">Desktop items</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="keyChains">Key Chains</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="cardHolder">Card Holders</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="deskStand">Desk Stand</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="wallets">Wallets</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="cardPenDrive">Card Pen Drive</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="powerbank">Power bank</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="fridgeMagnet">Fridge Magnets</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="band">Bands</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="rubikcube">Rubik Cube</Link></li>
                                </ul>

                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle navcolor1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Drinkware
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item navcolor" to="beer">Beer Mugs</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="coffee">Tea & Coffee Mugs</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="couple">Couple Mugs</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="magic">Magic Mugs</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="travel">Travel Mugs</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="shotGlasses">Shot Glasses</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="paper_mug">Paper Cup</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="bamboo_mug">Bomboo Mugs</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="bottle_sipper">Bottle & Sippers</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="glasstumbler">GlassTumbler</Link></li>

                                </ul>
                            </li>
                            {/* <li className="nav-item "><Link className="nav-link navcolor1 " aria-current="page" to="">Apparels</Link></li> */}
                            <li className="nav-item "><Link className="nav-link navcolor1 " aria-current="page" to="notedir">Notebooks And Diaries</Link></li>
                            <li className="nav-item "><Link className="nav-link navcolor1 " aria-current="page" to="giftset">Gift set</Link></li>
                            <li className="nav-item "><Link className="nav-link navcolor1 " aria-current="page" to="photoframe">Photo Frame</Link></li>
                            <li className="nav-item "><Link className="nav-link navcolor1 " aria-current="page" to="SustainableItem">Sustainable Products</Link></li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle navcolor1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Electronics
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item navcolor" to="PD">USB Pendrive</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="speaker">Speakers</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="MouKeybord">wireless mouse and keyboard</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="powerbank">Power Bank</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="tablelamp">Table Lambs</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="digital_clock">Digital Clock</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="digital_ph_frame">Digital Photo Frame</Link></li>
                                    {/* <li><Link className="dropdown-item navcolor" to="#">Arome Diffuser</Link></li> */}
                                </ul>
                            </li>
                            <li className="nav-item dropdown ">
                                <Link className="nav-link dropdown-toggle navcolor1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Promotional Product
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item navcolor" to="#">Mugs &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="frosted">Frosted Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="travel">Travel Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="magic">Magic Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="couple">Couple Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="coffee">Tea & Coffee Mugs</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="beer">Beer Mugs</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Custom Name Plates &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="pinplate">Pin Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="magnetplate">Magnate Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="domplate">Dom Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="Acrylicplate">Acrylic Name Plate</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="metalicplat">Metallic Name Plate</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Sippers &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="hotcold">Hot & Cold Flask Sipper</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="singlewall">Single Wall Sipper</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="plasticwall">Plastic Sipper</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="copper">Copper Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="antiskit">Anti Skit Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="borosillicate">Borosillicate Glass Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="bomboo">Bomboo Bottle</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="shaker">Shaker Bottle</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="#">Badges &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="roundbadge">Round & ovel Magnetic Badges</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="pocketbadge">Pocket Magnetic Badges</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="metalbadge">Metal Name Badge (Magnetic)</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="roundpinbadge">Round Pin Badge</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="acrylicbadge">Acrylic Name Badge <br></br>(Metallic Badge)</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="clipplasticbadge">Clip on Plastic Badge</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="dombadge">Dom Magnetic Badge</Link></li>
                                            {/* <li><Link className="dropdown-item navcolor" to="#">Oval Magnetic Badge</Link></li> */}
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="notebook">Notebooks</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="holder">Pop Mobile Holders</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="PD">Pen Drives</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="LS">Laptop Sleeve</Link></li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="pen">Pen</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="coaster">Coasters</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="photoframe">Photo Frames</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="sublimation">Sublimation items</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="container">Container</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="kettls">Kettles</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="lunchbox">Lunch Boxes</Link></li>
                                    <li><Link className="dropdown-item navcolor navcolor" to="pen">Pen</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="desktopItem">Desktop Items</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="keyChains">Keychains</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="cardHolder">Card Holders</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="diaries">Diaries</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="deskStand">Desk Stand</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="#">T-Shirts &raquo;</Link>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li><Link className="dropdown-item navcolor" to="promotionalTshirts">Promotional T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="poloTshirts">Polo T-shirt(Cotton)</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="coupleTshirts">Couple T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="dryFitTshirts">Dry Fit T-shirts</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="sportsTshirts">Sports T-shirt</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="girlsTshirts">Girls T-shirt</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="fullSleevesTshirts">Full Sleeves T-shirt</Link></li>
                                            <li><Link className="dropdown-item navcolor" to="familyTshirts">Family T-shirts</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="dropdown-item navcolor" to="wallets">Wallets</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="toteBag">Tote Bags</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="juteBag">Jute bags</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="backpack">Backpack</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="cardPenDrive">Card Pen Drive</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="PD">Pen Drive</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="powerbank">Power Bank</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="MS">Mouse Pads</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="fridgeMagnet">Fridge Magnets</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="band">bands</Link></li>
                                </ul>

                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle navcolor1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Printing
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item navcolor" to="notebook">Notebooks</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="notepad">Notepads</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="diaries">Diaries</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="Calender">Calenders</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="Brochures">Brochures</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="standee">Roll Up Standee</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="FlyerPamplate">Flyer/Pamplets</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="Bookmark">Bookmarks</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="FD">Folders/Dockets</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="magzine">Magzine</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="TM">Training Manual</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="AR">Annual Report</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="DP">Document Printing</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="PR">Project Report</Link></li>
                                    <li><Link className="dropdown-item navcolor" to="Sticker">Sticker</Link></li>

                                </ul>
                            </li>

                            <li className="nav-item "><Link className="nav-link navcolor1" aria-current="page" to="about">About</Link></li>
                            


                        </ul>


                        <ToastContainer position="button-center" limit={1} />
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;