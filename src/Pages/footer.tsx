import { Link } from "react-router-dom"

export function FooterSection() {
  return (
    <footer className="mb-96 flex justify-between">
      <div className="col" id="contact-follow">
        <img className="logo" src="https://i.ibb.co/WVVJYqV/Malhaja-Logo.png" alt="Malhaja Logo" />
        <p className="h4-font">Contact</p>
        <p>
          <strong>Address:</strong> Saudi Arabia
        </p>
        <p>
          <strong>Phone:</strong> +966 505 666 855
        </p>
        <p>
          <strong>Hours:</strong> 9:00 - 18:00, Mon - Fri / 11:00 - 18:00, Sat - Sun
        </p>

        <div className="follow">
          <p className="h4-font">Follow us</p>
          <div
            className="icon"
            style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </Link>

            <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </Link>

            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </Link>

            <Link to="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest-p"></i>
            </Link>

            <Link to="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="col justify-between">
        <p className="h4-font">About</p>
        <Link to="/abouUs">About Us</Link>
        <Link to="/cart">Delivery Information</Link>
        <Link to="/cart">Privacy Policy</Link>
        <Link to="/cart">Terms & Conditions</Link>
        <Link to="/contactus">Contact Us</Link>
      </div>

      <div className="col">
        <p className="h4-font">My Account</p>
        <Link to="/cart">View Cart</Link>
        <Link to="/cart">My Wish List</Link>
        <Link to="/cart">Track My Order</Link>
        <Link to="/cart">Help</Link>
      </div>

      <div className="col install">
        <p className="h4-font">Install App</p>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src="/img/badge2.jpg" alt="App store and Google play badges" className="badges" />
        </div>
        <p>Secured Payments Gateways</p>
        <div>
          <img
            src="/img/securedPayments.jpg"
            alt="Logo of famous payments companies"
            className="secured-payments"
          />
        </div>
      </div>

      <div className="copy-right">
        <p>&copy; 2024 @MZA - Ecommerce Template</p>
      </div>
    </footer>
  )
}
