import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import "./Navbar.css"
import logo from "../../assets/logo.jpeg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginMethod } from '../../hook/auth';
const CustomNavbar = () => {
  const location = useLocation();
  const dispatch=useDispatch();
      const navigate=useNavigate();

    const userinfo = useSelector((state) => state.auth);
console.log(userinfo?.role=="trainer");
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#1a237e' }} variant="dark" dir="rtl"className='py-3'>
      <Container>
        {/* Brand/Logo Section */}
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<img src={logo} alt="Logo" style={{ width: '70px', height: '70px',borderRadius:"50%"}} />
          </div>
          <span className="fw-bold">شرطة عمان</span>
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-5">
            <Link className={location.pathname=="/dashboard/Dashboard"?'active  px-2 py-2':"text-white  px-2 py-2"} to="/">الرئيسية</Link>
              {userinfo?.role!=="trainer"&&    <Link  className={location.pathname=="/trainers"?'active  px-2 py-2':'text-white px-2 py-2'} to="/trainers">المتدربون</Link>}
          <Link  className={location.pathname=="/lessons"?'active  px-2 py-2':'text-white px-2 py-2'} to="/lessons">الدروس</Link>
                <Link  className={location.pathname=="/library"?'active px-2 py-2':'text-white px-2 py-2'}  to="/library">مكتبة المفاهيم</Link>
                <Link  className={'text-white px-2 py-2'} to="https://docs.google.com/forms/d/e/1FAIpQLSfw3CUpZIm63Bvyf-qsW5hwFlon69axkVS8wpDjWF8GK6ra-w/viewform?usp=dialog">بطاقة ملاحظات</Link>
                <Link  className={'text-white px-2 py-2'}to="https://forms.gle/9MJ37g3Xtd5BGeoJ9">الاختبار</Link>
                {/* <Link  className={location.pathname=="/ai"?'active px-2 py-2':'text-white px-2 py-2'} to="/ai">المساعد الذكي</Link> */}
          </Nav>

        </Navbar.Collapse>
        <div>
          <Button variant='success'onClick={()=>{
            dispatch(loginMethod({}));
                navigate("/login");
    
          }}>تسجيل الخروج</Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;