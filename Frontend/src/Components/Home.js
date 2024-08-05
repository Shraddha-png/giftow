import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="/images/Sliding/slide-1.jpg" alt="Mug slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-2.jpg" alt="Tote slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-3.jpg" alt="Red mug slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-4.jpg" alt="Bottle slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-5.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-6.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-7.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-8.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/slide-9.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/ID CARD SLIDE.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/name tag slide.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/glass tumbler slide.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/pen slide.jpg" alt="Website slide banner" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/Sliding/mug slide.jpg" alt="Website slide banner" />
          </div>
        </div>
        <Link className="carousel-control-prev" to="#carouselExampleControls" role="button" data-bs-slide="prev">
          <span className="sr-only"></span>
        </Link>
        <Link className="carousel-control-next" to="#carouselExampleControls" role="button" data-bs-slide="next">
          <span className="sr-only"></span>
        </Link>
      </div>

      {/* ##### Category ##### */}
      <div className="container-fluid">
        <div>
          <h2 className="category mt-5 display-6">CATEGORY</h2>
        </div>
        <div className="container-fluid p-0">
          <div className="row mt-4 ">
            <div className="col-sm-4 ">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/awards">
                  <img className="card-img-top catimg" src="images/category/Award.png" alt="Awards" />
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/badges">
                  <img className="card-img-top catimg" src="images/category/Badges.png" alt="Badges" />
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/bags">
                  <img className="card-img-top catimg" src="images/category/Bags.png" alt="Bags" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-sm-4">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/CustomisedMug">
                  <img className="card-img-top catimg" src="images/category/Customised-Mug.png" alt="Customised Mug" />
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/Clothing">
                  <img className="card-img-top catimg" src="images/category/Clothings.png" alt="Clothings" />
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/stationary">
                  <img className="card-img-top catimg" src="images/category/Stationary.png" alt="Stationary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-5 ">
          <div className="row">
            <div className="col-sm-4 ">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/bestseller">
                  <img className="card-img-top catimg" src="images/category/Best-Seller.png" alt="Best Seller" />
                </Link>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/HomeKitchen">
                  <img className="card-img-top catimg" src="images/category/Home-Kitchen.png" alt="Home Kitchen" />
                </Link>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/proItem">
                  <img className="card-img-top catimg" src="images/category/Promotional-Item-1.png" alt="Promotional Item" />
                </Link>
              </div>
            </div>

          </div>
        </div>
        <div className="container-fluid mt-5 homecategory ">
          <div className="row">
            <div className="col-sm-4 ">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/Printing">
                  <img className="card-img-top catimg" src="images/Printing.PNG" alt="Printing" height='560rem' />
                </Link>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/occassion">
                  <img className="card-img-top catimg" src="images/Occasion.PNG" alt="Occasion" height='560rem' />
                </Link>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="card p-5" style={{ width: '18 rem' }}>
                <Link to="/teachAcc">
                  <img className="card-img-top catimg" src="images/Teach Accessories.PNG" alt="Accessories" height='560rem' />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid p-0 mt-4">
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <div className="container-fluid p-3 bg-warning mt-3">
              <div className="container">
                <img src="images/category/banner-ad.png" alt="Banner ad" height="180px" width="100%" />
              </div>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>

        <div className="container-fluid ">
          <div>
            <h2 className="category  mt-5 display-6">PRODUCTS</h2>
          </div>
          <div className="container p-0">
            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/rubikcube">
                    <img className="card-img-top" src="/images/Best Seller Products/Rubik Cube.jpeg" alt="Rubik Cube" />
                  </Link>
                  <div className="card-body">
                    <Link to="/rubikcube" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>RUBIC CUBE</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/travel">
                    <img className="card-img-top" src="/images/Products/Travel mug.jpeg" alt="Travel Mugs" />
                  </Link>
                  <div className="card-body">
                    <Link to="/travel" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>TRAVEL MUGS</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/sipper">
                    <img className="card-img-top" src="/images/Sippers/Glass-Bottles/Glass-Water-Bottle.jpeg" alt="Bottles" />
                  </Link>
                  <div className="card-body">
                    <Link to="/sipper" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>BOTTLES</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/keyChains">
                    <img className="card-img-top" src="/images/Keychain/Wooden Keychai07.webp" alt="Key Chains" />
                  </Link>
                  <div className="card-body">
                    <Link to="/keyChains" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>KEY CHAINS</h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/toteBag">
                    <img className="card-img-top" src="/images/Products/tote bags.jpeg" alt="Tote Bags" />
                  </Link>
                  <div className="card-body">
                    <Link to="/toteBag" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>TOTE BAGS</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/Sticker">
                    <img className="card-img-top" src="/images/Printing/sticker/sticker.webp" alt="Stickers" />
                  </Link>
                  <div className="card-body">
                    <Link to="/Sticker" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>STICKERS</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/calender">
                    <img className="card-img-top" src="/images/Printing/calenders/Calendar.jpeg" alt="Calendars" height="" />
                  </Link>
                  <div className="card-body">
                    <Link to="/calender" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>Calendars</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/poster">
                    <img className="card-img-top" src="/images/Products/poster.jpeg" alt="Posters" />
                  </Link>
                  <div className="card-body">
                    <Link to="/poster" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>POSTER</h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/tag">
                    <img className="card-img-top" src="/images/Products/tags.jpeg" alt="Tags" />
                  </Link>
                  <div className="card-body">
                    <Link to="/tag" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>TAGS</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/certificate">
                    <img className="card-img-top" src="/images/Products/certificates.jpeg" alt="Certificates" />
                  </Link>
                  <div className="card-body">
                    <Link to="/certificate" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>CERTIFICATES</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/giftcard">
                    <img className="card-img-top" src="/images/Products/gift card.jpeg" alt="Gift Cards" />
                  </Link>
                  <div className="card-body">
                    <Link to="/giftcard" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>GIFT CARDS</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/photoframe">
                    <img className="card-img-top" src="/images/Products/photo frame.jpeg" alt="Photo Frame" />
                  </Link>
                  <div className="card-body">
                    <Link to="/photoframe" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>PHOTO FRAME</h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/SustainableItem">
                    <img className="card-img-top" src="/images/Products/wooden item.jpeg" alt="Wooden Item" />
                  </Link>
                  <div className="card-body">
                    <Link to="/SustainableItem" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>ECO-FRIENDLY ITEM</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/holder">
                    <img className="card-img-top" src="/images/Products/mobile holder.jpeg" alt="Mobile Holder" />
                  </Link>
                  <div className="card-body">
                    <Link to="/holder" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>MOBILE HOLDER</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card proimg mt-3" style={{ width: '18 rem' }}>
                  <Link to="/badges">
                    <img className="card-img-top" src="/images/Name Badges/Suboard Name Badge/Sunboard name badge .jpeg" alt="Badges" />
                  </Link>
                  <div className="card-body">
                    <Link to="/badges" className="proname">
                      <h3 className="text-white text-center" style={{ fontSize: '20px' }}>BADGES</h3>
                    </Link>
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

export default Home;