import React from 'react';
import { Container, Card } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar/Navbar';

const concepts = [
  { term: "الأمان الرقمي", definition: "مجموعة الإجراءات والممارسات التي تهدف لحماية المعلومات والأجهزة من التهديدات الإلكترونية" },
  { term: "التحقق بخطوتين", definition: "طبقة حماية إضافية تتطلب رمزًا ثانيًا بجانب كلمة المرور" },
  { term: "التصيد الاحتيالي", definition: "محاولة خداع المستخدم للحصول على معلوماته الشخصية" },
  { term: "التواصل الرقمي المسؤول", definition: "الاستخدام الواعي والمهذب لأدوات الاتصال الإلكترونية" },
  { term: "المسؤولية الرقمية", definition: "الالتزام بالقيم الأخلاقية والقوانين أثناء استخدام التكنولوجيا" },
  { term: "الملكية الفكرية", definition: "حقوق المؤلف والمبدع في حماية أعماله" },
  { term: "الوصول الرقمي", definition: "قدرة جميع الأفراد على الاستفادة من التكنولوجيا بشكل متساوي" },
  { term: "الفجوة الرقمية", definition: "التفاوت في إمكانية الوصول إلى التكنولوجيا" },
  { term: "التفكير الناقد الرقمي", definition: "القدرة على تحليل وتقييم المعلومات الرقمية" },
  { term: "الأمن السيبراني", definition: "حماية الأنظمة والشبكات من الهجمات الرقمية" },
  { term: "النسخ الاحتياطي", definition: "إنشاء نسخة إضافية من البيانات لحمايتها" },
  { term: "جدار الحماية", definition: "نظام أمني يراقب حركة البيانات الواردة والصادرة" }
];

const LibraryPage = () => {
  return (
<>
<CustomNavbar/>
    <div style={{ backgroundColor:"#0f172a", minHeight: '100vh', padding: '40px 0' }} dir="rtl">
      <Container>
        <h3 className=" my-4 d-flex align-items-center gap-2"style={{color:"#60a5fa",fontFamily:"Noto Kufi Arabic"}}>📖 مكتبة المفاهيم</h3>
        
        <div className="d-flex flex-column gap-3">
          {concepts.map((item, index) => (
            <Card key={index}  style={{ backgroundColor: '#1e293b', color: 'white' ,border:"1px solid #334155"}}>
              <Card.Body className="p-3">
                <Card.Title style={{ color: '#4dd0e1', marginBottom: '8px' }}>{item.term}</Card.Title>
                <Card.Text style={{ opacity: 0.8,color:"#cbd5e1" }}>{item.definition}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
</>
  );
};

export default LibraryPage;