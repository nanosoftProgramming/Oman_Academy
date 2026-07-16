import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar/Navbar';
import knowledge from "../content.json";

const AIPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'مرحباً! أنا المساعد الذكي للأمان الرقمي. اسألني أي سؤال عن الدروس أو المفاهيم 🛡️' }
  ]);
  const [input, setInput] = useState('');
const searchKnowledge = (question) => {
  const q = question.toLowerCase().trim();
  if (!q) return "يرجى كتابة سؤال للبحث.";

  // 1. البحث في الـ title أولاً
  let found = knowledge.find((item) => 
    item.title.toLowerCase().includes(q)
  );

  // 2. إذا لم نجد في الـ title، نبحث في الـ describtion
  if (!found) {
    found = knowledge.find((item) => 
      item.describtion.toLowerCase().includes(q)
    );
  }

  // 3. إرجاع النتيجة
  return found 
    ? `${found.title}:\n\n${found.describtion}` 
    : "عذراً، لم أجد معلومة مطابقة لسؤالك.";
};
const handleSend = () => {
  if (!input.trim()) return;

  const user = {
    sender: "user",
    text: input,
  };

  const answer = {
    sender: "bot",
    text: searchKnowledge(input),
  };

  setMessages((prev) => [...prev, user, answer]);

  setInput("");
};

  return (
  <>
  <CustomNavbar/>
    <div style={{ backgroundColor:"#0f172a", minHeight: '100vh', padding: '40px 0' }} dir="rtl">
      <Container>
    <div className='d-flex justify-content-center'>
          <div className='w-75'>
        <h3 className=" my-4"style={{color:"#60a5fa",fontFamily:"Noto Kufi Arabic"}}>🤖 المساعد الذكي</h3>
        
        <Card className="p-4 mb-4" style={{ backgroundColor: '#1e293b', color: 'white', height:'75vh',border:"1px solid #334155",overflowY:"scroll" }}>
          <div className="flex-grow-1 mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-start' : 'text-end'}`}>
                <div className="p-2 rounded" style={{ display: 'inline-block', backgroundColor: msg.sender === 'user' ? '#334155' : '#134e4a80' }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

  
        </Card>
                <div className="d-flex gap-2 mt-auto mt-4">
            <Form.Control 
              placeholder="اكتب سؤالك هنا..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              style={{backgroundColor:"#1e293b",border:"1px solid #334155",color:"#fff" }}
            />
            <Button style={{backgroundColor: "#0d9488", borderColor:"#0d9488"}}onClick={handleSend}>إرسال</Button>
          </div>
        </div>
    </div>
      </Container>
    </div>
  </>
  );
};

export default AIPage;
