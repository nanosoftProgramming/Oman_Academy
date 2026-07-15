import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./Navbar.css"
import logo from "../../assets/logo.jpeg"
import { Link, useLocation } from 'react-router-dom';
const CustomNavbar = () => {
  const location = useLocation();
  console.log("Current path is:", location.pathname);
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
            <Link className={location.pathname=="/"?'active  px-3 py-2':"text-white  px-3 py-2"} to="/">الرئيسية</Link>
            <Link  className={location.pathname=="/trainers"?'active  px-3 py-2':'text-white px-3 py-2'} to="/trainers">المتدربون</Link>
                <Link  className={location.pathname=="/lessons"?'active  px-3 py-2':'text-white px-3 py-2'} to="/lessons">الدروس</Link>
                <Link  className={'text-white px-3 py-2'} to="https://forms.gle/9MJ37g3Xtd5BGeoJ9">مكتبة المفاهيم</Link>
                <Link  className={'text-white px-3 py-2'} to="https://docs.google.com/forms/d/e/1FAIpQLSfw3CUpZIm63Bvyf-qsW5hwFlon69axkVS8wpDjWF8GK6ra-w/viewform?usp=dialog">بطاقة ملاحظات</Link>
                <Link  className={location.pathname=="/library"?'active px-3 py-2':'text-white px-3 py-2'} to="/library">الاختبار</Link>
                <Link  className={location.pathname=="/ai"?'active px-3 py-2':'text-white px-3 py-2'} to="/ai">المساعد الذكي</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;