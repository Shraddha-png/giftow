import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <>
          <div className="container-fluid py-0 footer bg-light mt-3">
          <hr  className="line"/>
            <div className="container mt-5">
              <h2>Newsletter Subscribe</h2>
              <p>Be first to know about New Products Release, Innovative Products, Exclusive deals & more.</p>
              <hr />
            </div>
            <div className="container">
              <div className="row">
                <h2>We're Always Here To Help</h2>
                <div className="col">
                <p><i className="bi bi-question-circle"></i>  Terms & Conditions</p>
                </div>
                <div className="col">
                <p><i className="bi bi-piggy-bank-fill"></i>  Return & Refund</p>
                </div>
                <div className="col">
                <Link to='/feedback' className="feedback"><p><i className="bi bi-person-lines-fill "></i> Contact</p></Link>
                </div>
                </div>
                <hr />
            </div>
            <div className="container">
              <div className="row">
             <h3>Follow Us</h3>
             <div className="col">
              <img src="/images/icon/Facebook_icon.png" alt="icon" className="icon px-2"/>
             
            
              <img src="/images/icon/mEmWlw-logo-instagram-hd-image.png" alt="icon" className="icon px-2"/>
            
            
              <img src="/images/icon/whatsapp_icon.jpg" alt="icon" className="icon px-2"/>
              
             </div>
             </div>
            </div>
            <div className="p-0.5 text-white navfirst border-bottom text-end px-5">
            <h5 className="mx-2">Terms & Conditions</h5>
        </div>
          </div>
          
        </>
    )
}
export default Footer;