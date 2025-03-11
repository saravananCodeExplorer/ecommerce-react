import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>E-Shop</h2>
          <p>Your one-stop shop for the best products at unbeatable prices.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
