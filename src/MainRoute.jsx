import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Trainers from './Pages/Trainers';
import Lesson from './Pages/LessonDetail';
import Lessons from './Pages/Lessons';
import Library from './Pages/Library';
import AI from './Pages/AI';
import ContentSearch from './Pages/ContentSearch';

function RoutesPage() {
    // const userinfo = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* <Route path="/" element={userinfo.access_token?<Home/>:<Login />} /> */}
      {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/" element={<Home/>} />
            <Route path="/trainers" element={<Trainers/>} />
            <Route path="/lessons" element={<Lessons/>} />
            <Route path="/lesson/:id" element={<Lesson/>} />
            <Route path="/library" element={<Library/>} />
            <Route path="/ai" element={<AI/>} />
            <Route path="/ContentSearch" element={<ContentSearch/>} />

      


    </Routes>
  );
}

export default RoutesPage;
