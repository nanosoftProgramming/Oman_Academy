import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <section style={{  color: 'white', padding: '60px 0' }} dir="rtl">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Logo placeholder */}
            <div className="mb-4" style={{ fontSize: '3rem' }}>🛡️</div>
            
            {/* Titles */}
            <h1 className="fw-bold mb-3" style={{ color: '#60a5fa' }}>
              برنامج التدريب الإلكتروني للمواطنة الرقمية
            </h1>
            <h3 className="mb-4"style={{color:"#22d3ee"}}>لتنمية مفاهيم ومهارات المواطنة الرقمية</h3>
            
            {/* Sub-text */}
            <h5 className="mb-2"style={{color:"#5eead4"}}>OM شرطة عمان السلطانية</h5>
            <p className="lead" style={{color:"#cbd5e1"}}>أهلاً بك في برنامج تدريبي شامل</p>
            
            {/* Designer note */}
            <div className="mt-4" style={{ fontSize: '0.9rem',color:"#94a3b8" }}>
              تصميم وتطوير: فاطمة الكلبانية 👩‍💻
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;