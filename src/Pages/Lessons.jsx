import React from 'react';
import { Container, Card } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import lessons from '../Lessons.json'
console.log(lessons);

// const lessons = [
//   { id: 1, title: "الدرس 1: الأمن الرقمي", desc: "تأمين حسابات البريد الإلكتروني والمنصات التعليمية", icon: "🔒" },
//   { id: 2, title: "الدرس 2: التواصل الرقمي", desc: "إدارة لقاءات افتراضية عبر Teams", icon: "💬" },
//   { id: 3, title: "الدرس 3: السلوك الرقمي (المواطنة الأخلاقية)", desc: "ضبط سلوك الطلاب عبر المنصات", icon: "⚖️" },
//   { id: 4, title: "الدرس 4: الحقوق والمسؤوليات الرقمية", desc: "تطبيق سياسات استخدام المحتوى الرقمي", icon: "📜" },
//   { id: 5, title: "الدرس 5: الوصول الرقمي", desc: "استخدام أدوات تكنولوجيا مساعدة", icon: "🌐" },
// ];

const Lessons = () => {
  const navigate=useNavigate()
  return (
    <>
    <CustomNavbar/>
        <div style={{ backgroundColor:"#0f172a", minHeight: '100vh', padding: '40px 0' }} dir="rtl">
      <Container>
        <h3 className="my-4 d-flex align-items-center gap-2"style={{color:"#60a5fa",fontFamily:"Noto Kufi Arabic"}}>📚 الدروس التعليمية</h3>
        
        <div className="d-flex flex-column gap-3">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="border-0 shadow-sm" 
                  style={{ backgroundColor: '#1e293b', color: 'white', cursor: 'pointer',border:"1px solid #334155" }}
                  onClick={()=>navigate(`/lesson/${lesson?.id}`)}
                  >
              <Card.Body className="d-flex align-items-center  p-4">
                                <div className="fs-2 mx-3">{lesson.icon}</div>

                <div>
                  <Card.Title className="fw-bold fs-4">{lesson.title}</Card.Title>
                  <Card.Text style={{color:"#94a3b8"}}>{lesson.subTitle}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
    </>

  );
};

export default Lessons;