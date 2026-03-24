import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Orchids from '../Components/Orchids';
import { ListOfOrchids } from '../ListOfOrchids';
import './Natural.css';

function Natural() {
  const navigate = useNavigate();

  // Filter only natural orchids (isNatural === true)
  const naturalOrchids = ListOfOrchids.filter(orchid => orchid.isNatural === true);

  const handleViewDetail = (orchid) => {
    navigate(`/detail/${orchid.Id}`);
  };

  return (
    <div className="natural-page">
      {/* Hero Section */}
      <header className="natural-header">
        <Container>
          <div className="header-content text-center">
            <i className="bi bi-leaf header-icon"></i>
            <h1 className="title">Natural Orchids Collection</h1>
            <p className="subtitle">
              Discover our premium selection of 100% natural orchids, cultivated with care and authenticity
            </p>
            <div className="count-badge">
              <i className="bi bi-check-circle-fill"></i> {naturalOrchids.length} Natural Varieties Available
            </div>
          </div>
        </Container>
      </header>

      {/* Info Section */}
      <section className="info-section">
        <Container>
          <div className="info-content">
            <div className="info-card">
              <i className="bi bi-shield-check info-icon"></i>
              <h3>100% Authentic</h3>
              <p>All our natural orchids are sourced from certified growers and are completely organic</p>
            </div>
            <div className="info-card">
              <i className="bi bi-flower2 info-icon"></i>
              <h3>Pure Beauty</h3>
              <p>Experience the true colors and fragrances of nature without any artificial modifications</p>
            </div>
            <div className="info-card">
              <i className="bi bi-hand-thumbs-up info-icon"></i>
              <h3>Premium Quality</h3>
              <p>Each orchid is carefully selected to ensure the highest quality standards</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Orchids Collection */}
      <section className="collection-section">
        <Container>
          <h2 className="section-title">
            <i className="bi bi-collection"></i> Our Natural Collection
          </h2>
          
          {naturalOrchids.length > 0 ? (
            <div className="orchid-grid">
              {naturalOrchids.map((item) => (
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
              <h3>No Natural Orchids Available</h3>
              <p>Check back soon for new additions to our natural collection!</p>
            </div>
          )}
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <Container>
          <h2 className="section-title text-center mb-5">Why Choose Natural Orchids?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <i className="bi bi-heart-pulse-fill benefit-icon"></i>
              <h4>Healthier Plants</h4>
              <p>Natural orchids are more resilient and have stronger immune systems</p>
            </div>
            <div className="benefit-item">
              <i className="bi bi-infinity benefit-icon"></i>
              <h4>Long-lasting</h4>
              <p>Enjoy longer bloom periods and greater longevity with proper care</p>
            </div>
            <div className="benefit-item">
              <i className="bi bi-globe-americas benefit-icon"></i>
              <h4>Eco-friendly</h4>
              <p>Support sustainable cultivation and protect our environment</p>
            </div>
            <div className="benefit-item">
              <i className="bi bi-palette-fill benefit-icon"></i>
              <h4>True Colors</h4>
              <p>Experience authentic colors that nature intended without artificial dyes</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Natural;
