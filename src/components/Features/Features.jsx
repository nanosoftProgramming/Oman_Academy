import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const featuresData = [
  { title: "5 دروس", desc: "محتوى تفاعلي متكامل", icon: "📚",link:"/lessons" },
    { title: "مكتبة المفاهيم", desc: "12 مفهوم أساسي", icon: "🎯",link:"/library" },

    // { title: "مساعد ذكي", desc: "للإجابة على أسئلتك", icon: "🤖",link:"/AI" },

];

const Features = () => {
  const navigate=useNavigate();
  return (
    <section style={{  padding: '40px 0' ,cursor:"pointer"}} dir="rtl">
      <Container>
        <Row className="justify-content-center g-4">
          {featuresData.map((feature, index) => (
            <Col key={index} xs={12} md={4} lg={3}>
              <Card className="h-100 text-center border-0"
              onClick={()=>navigate(feature.link)} 
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