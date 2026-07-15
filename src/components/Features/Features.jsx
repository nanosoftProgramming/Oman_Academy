import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const featuresData = [
  { title: "5 دروس", desc: "محتوى تفاعلي متكامل", icon: "📚" },
    { title: "مكتبة المفاهيم", desc: "12 مفهوم أساسي", icon: "🎯" },

    { title: "مساعد ذكي", desc: "للإجابة على أسئلتك", icon: "🤖" },

];

const Features = () => {
  return (
    <section style={{  padding: '40px 0' }} dir="rtl">
      <Container>
        <Row className="justify-content-center g-4">
          {featuresData.map((feature, index) => (
            <Col key={index} xs={12} md={4} lg={3}>
              <Card className="h-100 text-center border-0" 
                    style={{ backgroundColor: '#1a237e', color: 'white', borderRadius: '15px' }}>
                <Card.Body className="d-flex flex-column align-items-center p-4">
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{feature.icon}</div>
                  <Card.Title className="fw-bold"style={{color:"#5eead4"}}>{feature.title}</Card.Title>
                  <Card.Text style={{ color: '#94a3b8' }}>{feature.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;