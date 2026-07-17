import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi';
import { IoFastFoodSharp } from 'react-icons/io5';
import "./LoginForm.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from "../../assets/logo.jpeg"

import { loginMethod } from '../../hook/auth';
import axios from 'axios';
import API_URL from '../../config/api';
function LoginForm() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const handlesubmit = async (e) => {
  e.preventDefault();
      // navigate("/dashboard/Dashboard");

  try {
    setLoading(true);

    const response = await axios.post(`${API_URL}/login`,
    {
  "email": email,
  "password": password
});
console.log(response.data);

    const data = response.data;
        dispatch(loginMethod(data));

    // // navigation حسب role
    if (data.data.role === "admin") {
      navigate("/dashboard/Dashboard");
    } else if (data.data.role === "Academy") {
      navigate("/dashboard/Academy-dashbord");
    } else if (data.data.role === "Student") {
      navigate("/dashboard/Student-dashbord");
    }else{
            navigate("/");

    }

  } catch (error) {
    console.log(error);

    // if (error.response) {
    //   alert(error.response.data.message || "Login failed");
    // } else {
    //   alert("Network error");
    // }

  } finally {
    setLoading(false);
  }
};

//   const handlesubmit=(e)=>{
//         e.preventDefault();

//     if(email=="admin"){
//     navigate("/dashboard/Dashboard");
//         dispatch(loginMethod({
// userArray:{
//   token:"123456789",
//   user:{
//     role:"Super Admin"
//   }
// }
//         }));
//     }else if(email=="student"){
//     navigate("/dashboard/student-dashbord");
//         dispatch(loginMethod({
// userArray:{
//   token:"123456789",
//   user:{
//     role:"student"
//   }
// }
//         }));
//     }
//   }
  return (
    <div className="login-page-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={12}>

            {/* Header Section */}
            <div className="text-center mb-4">
              <div className="brand-icon-box">
<img src={logo} alt="Logo" style={{ width: '70px', height: '70px',borderRadius:"50%"}} />
              </div>
              <p className="text-muted mt-4">البرنامج التدريبي الإلكتروني لتنمية مهارات المواطنة الرقمية  .</p>
            </div>

            {/* Login Card */}
            <Card className="border-0  p-4" style={{ borderRadius: '16px' }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-uppercase text-muted">
                       اسم المستخدم
                  </Form.Label>
                  <div className="input-group custom-input-group">

                    <Form.Control type="text" placeholder="e.g. chef.remy@academy.edu" value={email}onChange={(e)=>setEmail(e.target.value)}/>
                    <span className="input-group-text">
                      <HiOutlineUser size={18} />
                    </span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="small fw-bold text-uppercase text-muted">
                      كلمة المرور
                    </Form.Label>
                    {/* <a href="#" className="small academy-link">نسيت كلمة المرور؟</a> */}
                  </div>
                  <div className="input-group custom-input-group">

                    <Form.Control type="password" placeholder="••••••••"
                      value={password}
  onChange={(e) => setPassword(e.target.value)}

                    />
                    <span className="input-group-text">
                      <HiOutlineLockClosed size={18} />
                    </span>
                  </div>
                </Form.Group>



                <Button className="w-100 btn-secure-signup" 
  onClick={handlesubmit}
  disabled={loading}
>
  {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول الآمن →"}
</Button>         

                <div className="text-center my-4">
                  <hr className="text-muted opacity-25" />
          
                </div>


              </Form>
            </Card>

            {/* Footer */}

          </Col>
        </Row>
      </Container>
    </div>)
}

export default LoginForm