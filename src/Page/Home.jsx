import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Orchids from "../Components/Orchids";
import OrchidModal from "../Components/OrchidModal";
import { ListOfOrchids } from "../ListOfOrchids";
import { useModal } from "../hooks/useModal";
import { useNavigate } from "react-router";

function Home() {
  const [selectedTheme, setSelectedTheme] = useState("all");
  const { isOpen, selectedItem, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const data = ListOfOrchids;

  const filteredData =
    selectedTheme === "all"
      ? data
      : data.filter((item) => item.theme === selectedTheme);

  const handleViewDetail = (orchid) => {
    navigate(`/detail/${orchid.Id}`);
  };

  return (
    <>
      {/* Hero Section */}
      <header className="App-header" id="home">
        <h1 className="title">Orchid Paradise</h1>
        <p>Discover the most beautiful and exotic orchids from around the world</p>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="bi bi-shield-check feature-icon"></i>
              <h3>Premium Quality</h3>
              <p>Handpicked orchids with guaranteed quality and authenticity</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-truck feature-icon"></i>
              <h3>Fast Delivery</h3>
              <p>Safe packaging and quick delivery to your doorstep</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-headset feature-icon"></i>
              <h3>Expert Support</h3>
              <p>24/7 care guidance from orchid specialists</p>
            </div>
            <div className="feature-card">
              <i className="bi bi-gift feature-icon"></i>
              <h3>Special Offers</h3>
              <p>Exclusive deals and seasonal promotions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="collection">
        <div className="container">
          <h2 className="section-title">Our Collection</h2>
          <p className="section-subtitle">
            Explore our curated selection of premium orchids
          </p>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button
              className={`filter-btn ${selectedTheme === "all" ? "active" : ""}`}
              onClick={() => setSelectedTheme("all")}
            >
              <i className="bi bi-stars"></i> Tất cả
            </button>
            <button
              className={`filter-btn ${selectedTheme === "tet" ? "active" : ""}`}
              onClick={() => setSelectedTheme("tet")}
            >
              <i className="bi bi-flower2"></i> Hoa Tết
            </button>
            <button
              className={`filter-btn ${selectedTheme === "women" ? "active" : ""}`}
              onClick={() => setSelectedTheme("women")}
            >
              <i className="bi bi-heart"></i> Hoa 8-3
            </button>
            <button
              className={`filter-btn ${selectedTheme === "teacher" ? "active" : ""}`}
              onClick={() => setSelectedTheme("teacher")}
            >
              <i className="bi bi-book"></i> Hoa 20-10
            </button>
          </div>

          <div className="orchid-grid">
            {filteredData.map((item) => (
              <Orchids
                key={item.Id}
                orchidId={item.Id}
                name={item.name}
                rating={item.rating}
                isSpecial={item.isSpecial}
                isNatural={item.isNatural}
                image={item.image}
                color={item.color}
                numberOfLike={item.numberOfLike}
                origin={item.origin}
                category={item.category}
                onViewDetail={() => handleViewDetail(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About Orchid Paradise</h2>
              <p>
                Founded in 2020, Orchid Paradise has become a leading destination for orchid enthusiasts
                and collectors worldwide.
              </p>
              <p>
                With over 500+ varieties and a team of dedicated horticulturists, we ensure each orchid
                receives the care it deserves.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Orchid Varieties</p>
                </div>
                <div className="stat-item">
                  <h3>10K+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat-item">
                  <h3>15+</h3>
                  <p>Countries</p>
                </div>
                <div className="stat-item">
                  <h3>98%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </div>

            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800"
                alt="About Us"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <i className="bi bi-envelope-heart newsletter-icon"></i>
            <h2>Stay Connected</h2>
            <p>Subscribe to get exclusive deals and care tips for your orchids</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>
                <i className="bi bi-flower1"></i> Orchid Paradise
              </h3>
              <p>Your trusted source for premium orchids since 2020</p>
              <div className="social-links">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="#"><i className="bi bi-pinterest"></i></a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#collection">Collection</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Categories</h4>
              <ul>
                <li><a href="#cattleya">Cattleya</a></li>
                <li><a href="#dendrobium">Dendrobium</a></li>
                <li><a href="#phalaenopsis">Phalaenopsis</a></li>
                <li><a href="#vanda">Vanda</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact Us</h4>
              <ul>
                <li><i className="bi bi-geo-alt"></i> Ho Chi Minh City, Vietnam</li>
                <li><i className="bi bi-telephone"></i> +84 123 456 789</li>
                <li><i className="bi bi-envelope"></i> info@orchidparadise.com</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2026 Orchid Paradise. All rights reserved. Made with{" "}
              <i className="bi bi-heart-fill"></i> for orchid lovers
            </p>
          </div>
        </div>
      </footer>

      {/* Orchid Detail Modal */}
      <OrchidModal show={isOpen} onHide={closeModal} orchid={selectedItem} />
    </>
  );
}

export default Home;
