import CustomNavbar from '../components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Badge, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTrainer, deleteTrainer, fetchTrainers, updateTrainer } from '../hook/trainers'; // تأكد من استيراد دالة التعديل
import CustomModel from '../components/CustomModel/CustomModel';

function Trainers() {
  const dispatch = useDispatch();
  const { list: trainees } = useSelector((state) => state.trainers);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false); // حالة لإظهار/إخفاء مودال التعديل
  const [itemID, setItemID] = useState(null);
const [loading, setLoading] = useState(false)
const [updateLoading, setUpadateLoading] = useState(false)
const [deleteLoading, setDeleteLoading] = useState(false)
  // حالة لتخزين بيانات المتدرب الجاري تعديله
  const [editingTrainer, setEditingTrainer] = useState({
    id: null,
    name: '',
    email: '',
    rank: '',
    totaldegree: '',
    gpa: '',
    percentage: '',
    status: 1
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleEditClose = () => setEditShow(false);
  
  // فتح مودال التعديل وتعبئة بيانات المتدرب المحدد
  const handleEditShow = (trainer) => {
    setEditingTrainer(trainer);
    setEditShow(true);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rank: '',
    totaldegree: '',
    password:"",
    gpa: '',
    percentage: ''
  });

  // تحديث القيم عند الكتابة أو الاختيار لنموذج الإضافة
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // تحديث القيم داخل نموذج التعديل
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTrainer((prev) => ({ ...prev, [name]: value }));
  };

  // دالة إرسال البيانات عند الضغط على تسجيل (إضافة)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(addTrainer(formData))
      .unwrap()
      .then(() => {
        dispatch(fetchTrainers());
    setLoading(false)

        alert("تم إضافة المتدرب بنجاح");
        setFormData({ name: '', email: '', rank: '',password:'',gpa:"",totaldegree:"",percentage:"" });
      })
      .catch((err) => {
        alert(err);
        console.error("Failed to save:", err);
      });
  };

  // دالة إرسال بيانات التعديل
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
        setUpadateLoading(true)

dispatch(updateTrainer(editingTrainer))
      .unwrap()
      .then(() => {
        dispatch(fetchTrainers());
            setUpadateLoading(false)

        alert("تم تعديل بيانات المتدرب بنجاح");
        setEditShow(false);
      })
      .catch((err) => {
        alert("فشل في التعديل: " + err);
        console.error("Failed to update:", err);
      });
  };

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const ModalBody = (
    <Modal.Body style={{ backgroundColor: "#1e293b" }}>
      <p className='text-white text-center' style={{ fontFamily: "Noto Kufi Arabic" }}>
        هل تريد حذف هذا المتدرب ؟
      </p>
    </Modal.Body>
  );

  const ModalFooter = (
    <Modal.Footer style={{ backgroundColor: "#1e293b", justifyContent: "center" }}>
      <Button variant="secondary" onClick={handleClose} style={{ fontFamily: "Noto Kufi Arabic" }}>
        الغاء
      </Button>
{deleteLoading?
      <Button 
        variant="dark" 
        style={{ fontFamily: "Noto Kufi Arabic" }}
  disabled
  className='text-light'
      >
جاري الحذف .......
      </Button>
:
      <Button 
        variant="primary" 
        style={{ fontFamily: "Noto Kufi Arabic" }}
        onClick={() => {
              setDeleteLoading(true)

          dispatch(deleteTrainer(itemID))
            .unwrap()
            .then(() => {
              alert(`تم مسح المتدرب بنجاح`);
              dispatch(fetchTrainers());
                  setDeleteLoading(false)

              setShow(false);
            })
            .catch((err) => {
              console.error("Failed to save:", err);
            });
        }}
      >
        حذف
      </Button>
}
    </Modal.Footer>
  );

  return (
    <>
      <CustomNavbar />
      <CustomModel
        show={show}
        handleClose={handleClose}
        ModalBody={ModalBody}
        ModalFooter={ModalFooter}
      />

      {/* مودال التعديل (Edit Trainer Modal) */}
      <Modal show={editShow} onHide={handleEditClose} dir="rtl" centered>
        <Modal.Header closeButton style={{ backgroundColor: "#1e293b", color: "#67e8f9" }}>
          <Modal.Title style={{ fontFamily: "Noto Kufi Arabic" }}>تعديل بيانات المتدرب</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateSubmit}>
          <Modal.Body style={{ backgroundColor: "#1e293b" }}>
            <Row className="g-3">
              <Col md={12} className="mb-2">
                <Form.Label className="text-info" style={{ fontFamily: "Noto Kufi Arabic" }}>الاسم الكامل</Form.Label>
                <Form.Control
                  name="name"
                  value={editingTrainer.name || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                />
              </Col>
              <Col md={12} className="mb-2">
                <Form.Label className="text-info" style={{ fontFamily: "Noto Kufi Arabic" }}>البريد الإلكتروني</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={editingTrainer.email || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                />
              </Col>
              <Col md={12} className="mb-2">
                <Form.Label className="text-info" style={{ fontFamily: "Noto Kufi Arabic" }}>الرتبة</Form.Label>
                            <Form.Control
                  name="rank"
                  type="text"
                  value={editingTrainer.rank || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                />
                {/* <Form.Select
                  name="rank"
                  value={editingTrainer.rank || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                >
                  <option value="">اختر الرتبة</option>
                  <option value="جندي">جندي</option>
                  <option value="عريف">عريف</option>
                  <option value="رقيب">رقيب</option>
                </Form.Select> */}
              </Col>
                    <Col md={12} className="mb-2">
                <Form.Label className="text-info" style={{ fontFamily: "Noto Kufi Arabic" }}>الدرجة الكلية</Form.Label>
                            <Form.Control
                  name="totaldegree"
                  type="text"
                  value={editingTrainer.totaldegree || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                />
                {/* <Form.Select
                  name="rank"
                  value={editingTrainer.rank || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                >
                  <option value="">اختر الرتبة</option>
                  <option value="جندي">جندي</option>
                  <option value="عريف">عريف</option>
                  <option value="رقيب">رقيب</option>
                </Form.Select> */}
              </Col>
                    <Col md={12} className="mb-2">
                <Form.Label className="text-info" style={{ fontFamily: "Noto Kufi Arabic" }}>المعدل</Form.Label>
                            <Form.Control
                  name="gpa"
                  type="text"
                  value={editingTrainer.gpa || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                />
                {/* <Form.Select
                  name="rank"
                  value={editingTrainer.rank || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                >
                  <option value="">اختر الرتبة</option>
                  <option value="جندي">جندي</option>
                  <option value="عريف">عريف</option>
                  <option value="رقيب">رقيب</option>
                </Form.Select> */}
              </Col>
                    <Col md={12} className="mb-2">
                <Form.Label className="text-info" style={{ fontFamily: "Noto Kufi Arabic" }}>التقدم</Form.Label>
                            <Form.Control
                  name="percentage"
                  type="text"
                  value={editingTrainer.percentage || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                />
                {/* <Form.Select
                  name="rank"
                  value={editingTrainer.rank || ''}
                  onChange={handleEditChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                >
                  <option value="">اختر الرتبة</option>
                  <option value="جندي">جندي</option>
                  <option value="عريف">عريف</option>
                  <option value="رقيب">رقيب</option>
                </Form.Select> */}
              </Col>
              <Col md={12}>
                <Form.Label className="text-info" style={{ fontFamily: "Noto Kufi Arabic" }}>الحالة</Form.Label>
                <Form.Select
                  name="status"
                  value={editingTrainer.status}
                  onChange={(e) => setEditingTrainer(prev => ({ ...prev, status: Number(e.target.value) }))}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                >
                  <option value={1}>نشط</option>
                  <option value={0}>غير نشط</option>
                </Form.Select>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#1e293b" }}>
            <Button variant="secondary" onClick={handleEditClose} style={{ fontFamily: "Noto Kufi Arabic" }}>إلغاء</Button>
          {updateLoading?
                      <Button type="submit"  disabled variant="dark"
                      className='text-light'
                      style={{ fontFamily: "Noto Kufi Arabic" }}>جاري الحفظ ....... </Button>

        :

            <Button type="submit" variant="primary" style={{ fontFamily: "Noto Kufi Arabic" }}>حفظ التعديلات</Button>

        }
          </Modal.Footer>
        </Form>
      </Modal>

      <div style={{ backgroundColor: "#0f172a", minHeight: '100vh', color: 'white', padding: '20px 0' }} dir="rtl">
        <Container>
          {/* Header */}
          <h3 className="mb-4 d-flex align-items-center gap-2 py-4" style={{ color: "#60a5fa", fontFamily: "Noto Kufi Arabic" }}>👥 إدارة المتدربين</h3>

          {/* Stats Row */}
          <Row className="mb-4">
            {[
              { label: "إجمالي المتدربين", count: trainees.length },
              { label: "متدربون نشطون", count: trainees.filter(t => t.status).length },
            ].map((stat, idx) => (
              <Col key={idx} md={3}>
                <Card className="text-center border-0" style={{ backgroundColor: '#1e293b' }}>
                  <Card.Body>
                    <h2 className="fw-bold" style={{ color: "#22d3ee" }}>{stat.count}</h2>
                    <p style={{ color: "#94a3b8" }}>{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Registration Form */}
          <Card className="p-4 mb-4 border-0" style={{ backgroundColor: '#1e293b' }}>
            <h5 className="mb-3" style={{ color: "#67e8f9" }}>تسجيل متدرب جديد</h5>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3 align-items-end">
                <Col md={4}>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                    className='py-2 px-3 text-white'
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="البريد الإلكتروني"
                    style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                    className='py-2 px-3 text-white'
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    name="password"
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="كلمة المرور"
                    style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                    className='py-2 px-3 text-white'
                    required
                  />
                </Col>
                <Col md={4}>
                            <Form.Control
                  name="rank"
                  type="text"
                                      placeholder="الرتبة"

                  value={formData.rank || ''}
                  onChange={handleChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  required
                />
                </Col>
                        <Col md={4}>
                            <Form.Control
                  name="totaldegree"
                  type="text"
                                      placeholder="الدرجة الكلية"

                  value={formData.totaldegree || ''}
                  onChange={handleChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  
                />
                </Col>
                        <Col md={4}>
                            <Form.Control
                  name="gpa"
                  type="text"
                                      placeholder="المعدل"

                  value={formData.gpa || ''}
                  onChange={handleChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  
                />
                </Col>
                        <Col md={4}>
                            <Form.Control
                  name="percentage"
                  type="text"
                                      placeholder="التقدم"

                  value={formData.percentage || ''}
                  onChange={handleChange}
                  style={{ backgroundColor: "#334155", border: "1px solid #475569" }}
                  className='py-2 px-3 text-white'
                  
                />
                </Col>
                <Col md={4}>
                {loading?
                                <Button type="submit"disabled className="w-100 btn-dark text-light">جاري التسجيل ............</Button>
  
              :
                  <Button type="submit" className="w-100 btn-primary">تسجيل</Button>

              }
                </Col>
              </Row>
            </Form>
          </Card>

          {/* Data Table */}
          <div style={{ borderRadius: '8px', padding: '10px' }} className='table-responsive'>
            <Table border hover className="align-middle text-center mb-0" responsive>
              <thead>
                <tr style={{ color: '#aaa' }}>
                  <th style={{ color: "#67e8f9" }}>الاسم</th>
                  <th style={{ color: "#67e8f9" }}>البريد</th>
                  <th style={{ color: "#67e8f9" }}>الرتبة</th>
                  <th style={{ color: "#67e8f9" }}>الدرجة الكلية</th>
                  <th style={{ color: "#67e8f9" }}>المعدل</th>
                  <th style={{ color: "#67e8f9" }}>التقدم</th>
                  <th style={{ color: "#67e8f9" }}>الحالة</th>
                  <th style={{ color: "#67e8f9" }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map(t => (
                  <tr key={t.id}>
                    <td style={{ color: "#cbd5e1" }}>{t.name}</td>
                    <td style={{ color: "#cbd5e1" }}>{t.email}</td>
                    <td style={{ color: "#cbd5e1" }}>{t.rank}</td>
                    <td style={{ color: "#cbd5e1" }}>{t.totaldegree}</td>
                    <td style={{ color: "#cbd5e1" }}>{t.gpa}%</td>
                    <td style={{ color: "#cbd5e1" }}>{t.percentage}%</td>
                    <td>
                      <Badge bg={t.status ? "success" : "secondary"}>
                        {t.status ? "نشط" : "غير نشط"}
                      </Badge>
                    </td>
                    <td>
                      {/* زر التعديل يفتح المودال الخاص بالتعديل */}
                      <Button 
                        variant="link" 
                        className="text-decoration-none text-white"
                        onClick={() => handleEditShow(t)}
                      >
                        تعديل
                      </Button>
                      <Button 
                        variant="link" 
                        className="text-decoration-none text-danger"
                        onClick={() => {
                          setItemID(t?.id);
                          handleShow();
                        }}
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Trainers;