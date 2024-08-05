import React from "react";
import { Link } from "react-router-dom";

function TeachAcc() {

 
    return (
        <>

            <div className="container-fluid">

                <div className="container-fluid p-0">
                    <div className="row mt-3">
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/cardPenDrive">
                                    <img className="card-img-top catimg" src="/images/Pen-Drive/1 (13).jpg" alt="Awards" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title catimg">
                                    <Link to='/cardPenDrive'><h4 className="text-center categorybag">Card Pen Drive</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/PD">
                                    <img className="card-img-top catimg" src="/images/Teach Accessories/pendrive.jpeg" alt="Badges" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title catimg">
                                    <Link to='/PD'><h4 className="text-center categorybag">Pen Drive</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/powerbank">
                                    <img className="card-img-top catimg" src="/images/Powerbank.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title catimg">
                                    <Link to='/powerbank'><h4 className="text-center categorybag">Power Bank</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/headphone">
                                    <img className="card-img-top catimg" src="/images/Teach Accessories/headphone/Best headphones you can find on amazon.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title catimg">
                                    <Link to='/headphone'><h4 className="text-center categorybag">Headphones</h4></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">

                <div className="container-fluid p-0">
                    <div className="row mt-3">
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/laptop_skin">
                                    <img className="card-img-top catimg" src="/images/Teach Accessories/laptop skin-1.jpeg" alt="Awards" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title catimg">
                                    <Link to='/laptop_skin'><h4 className="text-center categorybag">Laptop Skin</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/mobile_acc">
                                    <img className="card-img-top catimg" src="/images/Teach Accessories/mobile holder.jpeg" alt="Badges" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title catimg">
                                    <Link to='/mobile_acc'><h4 className="text-center categorybag">Mobile Accessories</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/magnifire">
                                    <img className="card-img-top catimg" src="/images/Teach Accessories/magnifires/HONWELL LED Magnifying Glass Only $5_41.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title catimg">
                                    <Link to='/magnifire'><h4 className="text-center categorybag">Magnifires</h4></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeachAcc;