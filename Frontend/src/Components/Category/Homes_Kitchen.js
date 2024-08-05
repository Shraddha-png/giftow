import React  from "react";
import { Link } from "react-router-dom";


function HomeKitchen() {

   
    return (
        <>
         <div className="container-fluid">

                <div className="container-fluid p-0">
                    <div className="row mt-3">
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/lunchbox">
                                    <img className="card-img-top catimg" src="/images/LunchBoxess/lunch-box-1.jpeg" alt="lunch box" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/lunchbox'><h4 className="text-center categorybag">Lunch Boxes</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/photoframe">
                                    <img className="card-img-top catimg" src="/images/photoframe/Customized-Frame.jpeg" alt="photo print" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/photoframe'><h4 className="text-center categorybag">Photo Print</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/cushion_covers">
                                    <img className="card-img-top catimg" src="/images/Cushion-Covers/cover.jpeg" alt="Cushion Covers" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/cushion_covers'><h4 className="text-center categorybag">Cushion Covers</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/cushion">
                                    <img className="card-img-top catimg" src="/images/cushion/cushion cover1.jpg" alt="Cushions" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/cushion'><h4 className="text-center categorybag">Cushions</h4></Link>
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
                                <Link to="/Calender">
                                    <img className="card-img-top catimg" src="/images/Printing/calenders/Calendar.jpeg" alt="Awards" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/Calender'><h4 className="text-center categorybag">Calenders</h4></Link>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeKitchen;