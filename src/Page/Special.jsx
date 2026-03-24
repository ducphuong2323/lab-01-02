import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Orchids from '../Components/Orchids';
import { ListOfOrchids } from '../ListOfOrchids';
import './Special.css';

function Special() {
  const navigate = useNavigate();

  // Filter only special edition orchids (isSpecial === true)
  const specialOrchids = ListOfOrchids.filter(orchid => orchid.isSpecial === true);

  const handleViewDetail = (orchid) => {
    navigate(`/detail/${orchid.Id}`);
  };

  return (
    <div className="special-page">
      {/* Hero Section */}
      <header className="special-header">
        <Container>
          <div className="header-content text-center">
            <i className="bi bi-star-fill header-icon"></i>
            <h1 className="title">Special Edition Orchids</h1>
            <p className="subtitle">
              Exclusive rare orchids for collectors and enthusiasts - Limited availability
            </p>
            <div className="count-badge">
              <i className="bi bi-lightning-fill"></i> {specialOrchids.length} Exclusive Editions Available
            </div>
          </div>
        </Container>
      </header>

      {/* Info Section */}
      <section className="info-section">
        <Container>
          <div className="info-content">
            <div className="info-card">
              <i className="bi bi-gem info-icon"></i>
              <h3>Rare & Exclusive</h3>
              <p>These orchids are carefully selected for their unique characteristics and limited availability</p>
            </div>
            <div className="info-card">
              <i className="bi bi-award-fill info-icon"></i>
              <h3>Premium Collection</h3>
              <p>Award-winning varieties with exceptional beauty and distinctive features</p>
            </div>
            <div className="info-card">
              <i className="bi bi-trophy-fill info-icon"></i>
              <h3>Collector's Choice</h3>
              <p>Perfect for orchid enthusiasts looking to add extraordinary specimens to their collection</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Orchids Collection */}
      <section className="collection-section">
        <Container>
          <h2 className="section-title">
            <i className="bi bi-stars"></i> Exclusive Special Editions
          </h2>
          
          {specialOrchids.length > 0 ? (
            <div className="orchid-grid">
              {specialOrchids.map((item) => (
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
          ) : (
            <div className="no-orchids">
              <i className="bi bi-emoji-frown"></i>
              <h3>No Special Orchids Available</h3>
              <p>Check back soon for new exclusive additions to our special collection!</p>
            </div>
          )}
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <h2 className="section-title text-center mb-5">What Makes Them Special?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <i className="bi bi-patch-check-fill feature-icon"></i>
              <h4>Limited Quantity</h4>
              <p>Each special edition orchid is available in very limited quantities, making them highly sought after</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-palette-fill feature-icon"></i>
              <h4>Unique Colors</h4>
              <p>Featuring rare color combinations and patterns you won't find in regular varieties</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-flower3 feature-icon"></i>
              <h4>Exceptional Blooms</h4>
              <p>Larger, more vibrant blooms that last longer than standard orchids</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-gift-fill feature-icon"></i>
              <h4>Perfect Gifts</h4>
              <p>Ideal for special occasions and making unforgettable impressions</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-graph-up-arrow feature-icon"></i>
              <h4>Investment Value</h4>
              <p>Rare orchids often appreciate in value for serious collectors</p>
            </div>
            <div className="feature-item">
              <i className="bi bi-person-hearts feature-icon"></i>
              <h4>Expert Care Guide</h4>
              <p>Includes detailed care instructions from our master horticulturists</p>
            </div>
          </div>
        </Container>
      </section>

      {/* VIP Section */}
      <section className="vip-section">
        <Container>
          <div className="vip-content text-center">
            <i className="bi bi-crown-fill vip-icon"></i>
            <h2>Join Our VIP Collectors Club</h2>
            <p>
              Get exclusive early access to new special editions, special discounts, and invitations to private events
            </p>
            <button className="vip-btn">
              <i className="bi bi-envelope-heart-fill"></i> Become a VIP Member
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Special;
