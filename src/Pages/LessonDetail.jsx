// import React, { useState } from 'react';
// import { Container, Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
// import CustomNavbar from '../components/Navbar/Navbar';
// import { useParams } from 'react-router-dom';
// import lessons from '../Lessons.json';
// import CustomModel from '../components/CustomModel/CustomModel';

// const LessonDetail = () => {
//   const { id } = useParams();
//   const lesson = lessons.find((lessonInfo) => lessonInfo?.id == id);
  
//   const [show, setShow] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
  
//   // تم التصحيح: القيمة الابتدائية أصبحت 'idle' بدلاً من نص الإجابة
//   const [quizStatus, setQuizStatus] = useState('idle');

//   const handleClose = () => {
//     setShow(false);
//     setQuizStatus('idle'); 
//     setSelectedAnswer(''); // تم الحل: تفريغ الإجابة المحفوظة عند الإغلاق أو العودة للدرس
//   };
  
//   const handleShow = () => setShow(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedAnswer) {
//       alert("");
//       return;
//     }
    
//     console.log("تم إرسال الإجابة:", selectedAnswer);
    
//     // التحقق من الإجابة الصحيحة
//     if (selectedAnswer === 'نظام أمني يراقب البيانات') {
//       setQuizStatus('correct');
//     } else {
//       setQuizStatus('incorrect');
//     }
//   };

//   const questionData = {
//     question: "ما هو جدار الحماية؟",
//     options: [
//       { id: 'نظام أمني يراقب البيانات', text: "نظام أمني يراقب البيانات" },
//       { id: 'برنامج لتنظيف الجهاز', text: "برنامج لتنظيف الجهاز" },
//       { id: 'متصفح إنترنت', text: "متصفح إنترنت" }
//     ]
//   };

//   // محتوى النافذة بناءً على حالة الإجابة
//   const getModalBodyContent = () => {
//     if (quizStatus === 'correct') {
//       return (
//         <Modal.Body style={{ backgroundColor: "#1e293b", textAlign: "center", padding: "2rem" }}>
//           <div className="mb-3">
//             <span style={{ fontSize: "3rem", background: "#20c997", color: "#fff", padding: "10px 25px", borderRadius: "50%" }}>✓</span>
//           </div>
//           <h4 className="text-white mb-3" style={{ fontFamily: "Noto Kufi Arabic" }}>إجابة ممتازة!</h4>
//           <p className="text-light" style={{ fontFamily: "Noto Kufi Arabic" }}>
//             ممتاز! جدار الحماية يراقب حركة البيانات الواردة والصادرة ويحمي من الهجمات الخارجية.
//           </p>
//           <div className="mt-4 p-2 rounded fw-bold text-dark" style={{ backgroundColor: "#ffc107", fontFamily: "Noto Kufi Arabic" }}>
//             🎉 +10 نقطة
//           </div>
//         </Modal.Body>
//       );
//     }

//     if (quizStatus === 'incorrect') {
//       return (
//         <Modal.Body style={{ backgroundColor: "#1e293b", textAlign: "center", padding: "2rem" }}>
//           <div className="mb-3">
//             <span style={{ fontSize: "3rem", color: "#dc3545" }}>⚠️</span>
//           </div>
//           <h4 className="text-warning mb-3" style={{ fontFamily: "Noto Kufi Arabic" }}>حاول مجدداً</h4>
//           <p className="text-light" style={{ fontFamily: "Noto Kufi Arabic" }}>
//             رائع! يجب عدم النقر على روابط من مصادر غير موثوقة وعدم مشاركة بيانات شخصية.
//           </p>
//         </Modal.Body>
//       );
//     }

//     // النموذج الافتراضي للاختبار
//     return (
//       <Modal.Body style={{ backgroundColor: "#1e293b" }}>
//         <h4 className="mb-4" style={{ color: '#20c997', fontFamily: "Noto Kufi Arabic" }}>اختبر معلوماتك</h4>
//         <Form id="quizForm" onSubmit={handleSubmit}>
//           <div className="p-3 mb-4 rounded-3" style={{ backgroundColor: '#161b22', border: '1px solid rgba(32, 201, 151, 0.3)' }}>
//             <h5 className="mb-4" style={{ fontFamily: "Noto Kufi Arabic", color: "#fff" }}>{questionData.question}</h5>
//             <Form.Group>
//               {questionData.options.map((option, index) => (
//                 <Form.Check 
//                   key={index}
//                   type="radio"
//                   id={`option-${index}`}
//                   name="quizOptions"
//                   label={option.text}
//                   value={option.id}
//                   // إضافة checked للتحكم في حالة الزر ليتفرغ تماماً عند إعادة الفتح
//                   checked={selectedAnswer === option.id}
//                   onChange={(e) => setSelectedAnswer(e.target.value)}
//                   className="mb-3 fs-5 px-4"
//                   style={{ cursor: 'pointer', color: "#fff", fontFamily: "Noto Kufi Arabic" }}
//                 />
//               ))}
//             </Form.Group>
//           </div>
//         </Form>
//       </Modal.Body>
//     );
//   };

//   const getModalFooterContent = () => {
//     // إذا ظهرت نتيجة الاختبار (سواء صح أو خطأ)، سيظهر زر "العودة للدرس" لإغلاق النافذة
//     if (quizStatus === 'correct' || quizStatus === 'incorrect') {
//       return (
//         <Modal.Footer style={{ backgroundColor: "#1e293b", justifyContent: "center" }}>
//           <Button 
//             onClick={handleClose}
//             className="w-100 border-0 py-2 fw-bold"
//             style={{ 
//               backgroundColor: '#11998e', 
//               borderRadius: '0.75rem',
//               fontFamily: "Noto Kufi Arabic"
//             }}
//           >
//             العودة للدرس
//           </Button>
//         </Modal.Footer>
//       );
//     }

//     // الزر الافتراضي لإرسال الإجابة (مرتبط بالنموذج عبر form="quizForm")
//     return (
//       <Modal.Footer style={{ backgroundColor: "#1e293b", justifyContent: "center" }}>
//         <Button 
//           type="submit" 
//           form="quizForm"
//           className="w-100 border-0 py-2 fw-bold"
//           style={{ 
//             backgroundColor: '#11998e', 
//             borderRadius: '0.75rem',
//             fontFamily: "Noto Kufi Arabic"
//           }}
//         >
//           إرسال الإجابة
//         </Button>
//       </Modal.Footer>
//     );
//   };

//   return (
//     <>
//       <CustomNavbar />
//       <div style={{ backgroundColor:"#0f172a", color: 'white', padding: '40px 0' }} dir="rtl" className='lesson_details_container'>
//         <Container>
//           <a href="/lessons" className="text-info text-decoration-none mb-3 d-block">← العودة للدروس</a>

//           <CustomModel
//             show={show}
//             handleClose={handleClose}
//             ModalBody={getModalBodyContent()}
//             ModalFooter={getModalFooterContent()}
//           />
          
//           <Card className="p-4 mb-4" style={{ backgroundColor: '#1e293b', color: 'white' }}>
//             <h2 className="mb-4">🔒 الدرس {lesson?.id}: {lesson?.title}</h2>

//             <div style={{backgroundColor:"#0f172a80"}} className='p-4 rounded'>
//               <h5 className="text-info">أهداف الدرس:</h5>
//               <ul>
//                 {lesson?.objectives.map((item, idx) => (
//                   <li key={idx}>{item}</li>
//                 ))}
//               </ul>
//             </div>
            
//             <h5 className="text-info mt-4">وصف الدرس:</h5>
//             <p>{lesson?.description}</p>

//             <h5 className="text-info mt-4">المهارات التطبيقية:</h5>
//             <ListGroup variant="flush" className="bg-transparent">
//               {lesson?.practicalSkills.map((skill, idx) => (
//                 <ListGroup.Item key={idx} className="bg-transparent text-white border-0">✔️ {skill}</ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Card>

//           <Card className="border-0 p-4" style={{ backgroundColor: '#1e293b', color: 'white' }}>
//             <h5 className="text-info mb-3">الأنشطة التفاعلية</h5>
//             <div className="d-grid gap-3">
//               {['اختبر معلوماتك', 'فيديو للنقاش التفاعلي'].map((activity, idx) => (
//                 <Button 
//                   key={idx} 
//                   variant="outline-light" 
//                   className="text-start d-flex justify-content-between p-4 mb-4" 
//                   style={{ backgroundColor: '#1e293b', borderColor:"#334155" }}
//                   onClick={() => {
//                     if(activity === "اختبر معلوماتك") {
//                       handleShow();
//                     }
//                   }}
//                 >
//                   {activity} <span>➔</span>
//                 </Button>
//               ))}
//             </div>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default LessonDetail;

import React, { useState } from 'react';
import { Container, Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import lessons from '../Lessons.json';
import activitiesData from '../activity.json'; // تأكد من المسار الصحيح لملف activity.json
import CustomModel from '../components/CustomModel/CustomModel';

const LessonDetail = () => {
  const { id } = useParams();
  const lesson = lessons.find((lessonInfo) => lessonInfo?.id == id);
  
  // جلب النشاط الخاص بالدرس الحالي من ملف activity.json
  const lessonActivityData = activitiesData.activities.find(
    (item) => item.lessonId == id
  );

  const [show, setShow] = useState(false);
  const [videoShow, setVideoShow] = useState(false);
  // لتتبع معرف السؤال الحالي ضمن نفس النشاط (يبدأ من السؤال الأول index 0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizStatus, setQuizStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect' | 'finished'

  const handleClose = () => {
    setShow(false);
    setQuizStatus('idle'); 
    setSelectedAnswer('');
    setCurrentQuestionIndex(0);
  };
  
  const handleVideoClose = () => {
    setVideoShow(false);
  };
  
  const handleShow = () => setShow(true);
  const handleshowVideo = () => setVideoShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      alert("");
      return;
    }

    if (!lessonActivityData) return;

    const questions = lessonActivityData.activity.questions;
    const currentQuestion = questions[currentQuestionIndex];
    
    // التحقق من الإجابة (مقارنة النص المختار بالنص الموجود في الخيارات بناءً على الـ Index المخزن في correctAnswer)
    const isCorrect = selectedAnswer === currentQuestion.options[currentQuestion.correctAnswer];

    if (isCorrect) {
      setQuizStatus('correct');
    } else {
      setQuizStatus('incorrect');
    }
  };

  // الانتقال للسؤال التالي أو إنهاء النشاط
  const handleNextQuestion = () => {
    if (!lessonActivityData) return;
    const questions = lessonActivityData.activity.questions;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuizStatus('idle');
      setSelectedAnswer('');
    } else {
      // عند انتهاء جميع الأسئلة
      setQuizStatus('finished');
    }
  };

  // محتوى النافذة بناءً على حالة الاختبار
  const getModalBodyContent = () => {
    if (!lessonActivityData) {
      return (
        <Modal.Body style={{ backgroundColor: "#1e293b", textAlign: "center", padding: "2rem" }}>
          <h4 className="text-white" style={{ fontFamily: "Noto Kufi Arabic" }}>لا توجد أنشطة لهذا الدرس</h4>
        </Modal.Body>
      );
    }

    const questions = lessonActivityData.activity.questions;
    const currentQuestion = questions[currentQuestionIndex];

    if (quizStatus === 'correct') {
      return (
        <Modal.Body style={{ backgroundColor: "#1e293b", textAlign: "center", padding: "2rem" }}>
          <div className="mb-3">
            <span style={{ fontSize: "3rem", background: "#20c997", color: "#fff", padding: "10px 25px", borderRadius: "50%" }}>✓</span>
          </div>
          <h4 className="text-white mb-3" style={{ fontFamily: "Noto Kufi Arabic" }}>إجابة ممتازة!</h4>
          <p className="text-light" style={{ fontFamily: "Noto Kufi Arabic" }}>{currentQuestion.feedback}</p>
          <div className="mt-4 p-2 rounded fw-bold text-dark" style={{ backgroundColor: "#ffc107", fontFamily: "Noto Kufi Arabic" }}>
            🎉 تم اكتساب النقاط
          </div>
        </Modal.Body>
      );
    }

    if (quizStatus === 'incorrect') {
      return (
        <Modal.Body style={{ backgroundColor: "#1e293b", textAlign: "center", padding: "2rem" }}>
          <div className="mb-3">
            <span style={{ fontSize: "3rem", color: "#dc3545" }}>⚠️</span>
          </div>
          <h4 className="text-warning mb-3" style={{ fontFamily: "Noto Kufi Arabic" }}>إجابة غير صحيحة</h4>
          <p className="text-light" style={{ fontFamily: "Noto Kufi Arabic" }}>{currentQuestion.feedback}</p>
        </Modal.Body>
      );
    }

    if (quizStatus === 'finished') {
      return (
        <Modal.Body style={{ backgroundColor: "#1e293b", textAlign: "center", padding: "2rem" }}>
          <div className="mb-3">
            <span style={{ fontSize: "3rem", color: "#20c997" }}>🏆</span>
          </div>
          <h4 className="text-white mb-3" style={{ fontFamily: "Noto Kufi Arabic" }}>أحسنت! لقد أنهيت النشاط</h4>
          <p className="text-light" style={{ fontFamily: "Noto Kufi Arabic" }}>لقد أجبت على جميع أسئلة هذا النشاط بنجاح.</p>
        </Modal.Body>
      );
    }

    // النموذج الافتراضي للأسئلة
    return (
      <Modal.Body style={{ backgroundColor: "#1e293b" }}>
        <h4 className="mb-2" style={{ color: '#20c997', fontFamily: "Noto Kufi Arabic" }}>
          {lessonActivityData.activity.title}
        </h4>
        <p className="text-secondary mb-4" style={{ fontFamily: "Noto Kufi Arabic" }}>
          {lessonActivityData.activity.description}
        </p>
        
        <Form id="quizForm" onSubmit={handleSubmit}>
          <div className="p-3 mb-4 rounded-3" style={{ backgroundColor: '#161b22', border: '1px solid rgba(32, 201, 151, 0.3)' }}>
            <span className="text-info d-block mb-2">السؤال {currentQuestionIndex + 1} من {questions.length}</span>
            <h5 className="mb-4" style={{ fontFamily: "Noto Kufi Arabic", color: "#fff" }}>
              {currentQuestion.question}
            </h5>
            
            <Form.Group>
              {currentQuestion.options.map((optionText, idx) => (
                <Form.Check 
                  key={idx}
                  type="radio"
                  id={`option-${idx}`}
                  name="quizOptions"
                  label={optionText}
                  value={optionText} // القيمة هي النص مباشرة للمقارنة
                  checked={selectedAnswer === optionText} 
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="mb-3 fs-5 px-4"
                  style={{ cursor: 'pointer', color: "#fff", fontFamily: "Noto Kufi Arabic" }}
                />
              ))}
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
    );
  };

  const getModalFooterContent = () => {
    if (!lessonActivityData) {
      return (
        <Modal.Footer style={{ backgroundColor: "#1e293b", justifyContent: "center" }}>
          <Button onClick={handleClose} className="w-100 border-0 py-2 fw-bold" style={{ backgroundColor: '#11998e', borderRadius: '0.75rem', fontFamily: "Noto Kufi Arabic" }}>إغلاق</Button>
        </Modal.Footer>
      );
    }

    // إذا انتهت الأسئلة بالكامل
    if (quizStatus === 'finished') {
      return (
        <Modal.Footer style={{ backgroundColor: "#1e293b", justifyContent: "center" }}>
          <Button onClick={handleClose} className="w-100 border-0 py-2 fw-bold" style={{ backgroundColor: '#11998e', borderRadius: '0.75rem', fontFamily: "Noto Kufi Arabic" }}>العودة للدرس</Button>
        </Modal.Footer>
      );
    }

    // بعد ظهور صح أو خطأ، يظهر زر "السؤال التالي" أو "إنهاء" للانتقال للخطوة اللي بعدها
    if (quizStatus === 'correct' || quizStatus === 'incorrect') {
      return (
        <Modal.Footer style={{ backgroundColor: "#1e293b", justifyContent: "center" }}>
          <Button 
            onClick={handleNextQuestion}
            className="w-100 border-0 py-2 fw-bold"
            style={{ 
              backgroundColor: '#20c997', 
              borderRadius: '0.75rem',
              fontFamily: "Noto Kufi Arabic",
              color: "#000"
            }}
          >
            {currentQuestionIndex < lessonActivityData.activity.questions.length - 1 ? "السؤال التالي" : "إنهاء النشاط"}
          </Button>
        </Modal.Footer>
      );
    }

    // الزر الافتراضي لإرسال الإجابة
    return (
      <Modal.Footer style={{ backgroundColor: "#1e293b", justifyContent: "center" }}>
        <Button 
          type="submit" 
          form="quizForm"
          className="w-100 border-0 py-2 fw-bold"
          style={{ 
            backgroundColor: '#11998e', 
            borderRadius: '0.75rem',
            fontFamily: "Noto Kufi Arabic"
          }}
        >
          إرسال الإجابة
        </Button>
      </Modal.Footer>
    );
  };
  const getModalVideoBodyContent = () => {
const videoSrc = lessonActivityData?.activity?.videoUrl;
    return (
<Modal.Body style={{ padding: "0" }}>
      <video 
        controls 
        width="100%" 
        height="auto"
        // لا حاجة لعمل import، المتصفح سيبحث في مجلد public مباشرة
        src={videoSrc} 
      >
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
    </Modal.Body>
    );
  };

  return (
    <>
      <CustomNavbar />
      <div style={{ backgroundColor:"#0f172a", color: 'white', padding: '40px 0' }} dir="rtl" className='lesson_details_container'>
        <Container>
          <a href="/lessons" className="text-info text-decoration-none mb-3 d-block">← العودة للدروس</a>

          <CustomModel
            show={show}
            handleClose={handleClose}
            ModalBody={getModalBodyContent()}
            ModalFooter={getModalFooterContent()}
          />
          
          <CustomModel
            show={videoShow}
            handleClose={handleVideoClose}
            ModalBody={getModalVideoBodyContent()}
          />
          
          <Card className="p-4 mb-4" style={{ backgroundColor: '#1e293b', color: 'white' }}>
            <h2 className="mb-4">🔒 الدرس {lesson?.id}: {lesson?.title}</h2>

            <div style={{backgroundColor:"#0f172a80"}} className='p-4 rounded'>
              <h5 className="text-info">أهداف الدرس:</h5>
              <ul>
                {lesson?.objectives.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <h5 className="text-info mt-4">وصف الدرس:</h5>
            <p>{lesson?.description}</p>

            <h5 className="text-info mt-4">المهارات التطبيقية:</h5>
            <ListGroup variant="flush" className="bg-transparent">
              {lesson?.practicalSkills.map((skill, idx) => (
                <ListGroup.Item key={idx} className="bg-transparent text-white border-0">✔️ {skill}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <Card className="border-0 p-4" style={{ backgroundColor: '#1e293b', color: 'white' }}>
            <h5 className="text-info mb-3">الأنشطة التفاعلية</h5>
            <div className="d-grid gap-3">
              {['اختبر معلوماتك', 'فيديو للنقاش التفاعلي'].map((activity, idx) => (
                <Button 
                  key={idx} 
                  variant="outline-light" 
                  className="text-start d-flex justify-content-between p-4 mb-4" 
                  style={{ backgroundColor: '#1e293b', borderColor:"#334155" }}
                  onClick={() => {
                    if(activity === "اختبر معلوماتك") {
                      // التحقق مما إذا كان هناك نشاط مسجل لهذا الدرس في الـ json
                      if (lessonActivityData) {
                        handleShow();
                      } else {
                        alert("لا يوجد نشاط تفاعلي لهذا الدرس حالياً");
                      }
                    }else{
handleshowVideo();                    }
                  }}
                >
                  {activity} <span>➔</span>
                </Button>
              ))}
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default LessonDetail;