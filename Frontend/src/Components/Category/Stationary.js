import React from "react";
import { Link } from "react-router-dom";


function Stationary() {


    return (
        <>

            <div className="container-fluid">

                <div className="container-fluid p-0">
                    <div className="row mt-3">
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/diaries">
                                    <img className="card-img-top catimg" src="/images/Stationery/diaries.jpeg" alt="Diary" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/diaries'><h4 className="text-center categorybag">Diaries</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/notebook">
                                    <img className="card-img-top catimg" src="/images/Notebooks/download.jpeg" alt="Badges" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/notebook'><h4 className="text-center categorybag">Notebooks</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/plastic">
                                    <img className="card-img-top catimg" src="/images/Stationery/Ballpoint-Pen.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/plastic'><h4 className="text-center categorybag">Plastic Pen</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/metal">
                                    <img className="card-img-top catimg" src="/images/Stationery/Ballpoint-Pen-(2).jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/metal'><h4 className="text-center categorybag">Metal Pens</h4></Link>
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
                                <Link to="/FD">
                                    <img className="card-img-top catimg" src="/images/Printing/folder/177.png" alt="Awards" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/FD'><h4 className="text-center categorybag">Folders</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/badges">
                                    <img className="card-img-top catimg" src="/images/Name Badges/Cover Page of badges/Untitled-2.jpg" alt="Badges" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/badges'><h4 className="text-center categorybag">Badges</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/notepad">
                                    <img className="card-img-top catimg" src="/images/Printing/Notepad/A5 Notepads Printing in UK.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/notepad'><h4 className="text-center categorybag">Notepads</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/cardHolder">
                                    <img className="card-img-top catimg" src="/images/card-holder/Card.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/cardHolder'><h4 className="text-center categorybag">Card Holders</h4></Link>
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
                                <Link to="/keyChains">
                                    <img className="card-img-top catimg" src="/images/Keychain/Wooden Keychai07.webp" alt="Keychain" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/keyChains'><h4 className="text-center categorybag">Keychains</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/pencil">
                                    <img className="card-img-top catimg" src="/images/Wodden_Sustainable_items/wooden-pencil (2).jpeg" alt="Pencil" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/pencil'><h4 className="text-center categorybag">Pencils</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/id_landyard">
                                    <img className="card-img-top catimg" src="/images/IDs/id-1.jpg" alt="Id Card" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/id_landyard'><h4 className="text-center categorybag">Id's and Landyards</h4></Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-sm-3">
                            <div className="card p-4" style={{ width: '15 rem' }}>
                                <Link to="/travelbag">
                                    <img className="card-img-top catimg" src="/images/bags and wallets/travel bag/Bolsa De Viagem Modelo Expansiva.jpeg" alt="Bags" height='390px' />
                                </Link>
                                <hr />
                                <div className="card-title">
                                    <Link to='/travelbag'><h4 className="text-center categorybag">Travel Bags</h4></Link>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Stationary;

