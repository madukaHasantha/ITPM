import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewTecahers from "./components/Teacher/ViewTecahers";

//components

import AddTeacher from "./components/Teacher/AddTeacher";
import ViewAnnouncements from "./components/Announcement/ViewAnnouncements";
import ViewClasses from "./components/Class/ViewClasses";
import Sidebar from "./components/NavBar/Sidebar";
import AddStudent from "./components/Student/AddStudent";
import UpdateStudent from "./components/Student/UpdateStudent";
import StudentIndex from "./components/Student";
import Login from "./pages/Login/Login";
import ViewStudents from "./components/Student/ViewStudents";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div>
        <Routes>
          <Route path="/add" element={<AddTeacher />} />

          {/* ViewAnnouncements */}
          <Route path="/anouncements" element={<ViewAnnouncements />} />

          {/* ViewClasses */}

          <Route path="/classes" element={<ViewClasses />} />

          {/* login */}
          <Route path="/login" element={<Login />} />

          {/* Admin login */}
          <Route path="/admin-login" element={<Login isAdmin={true}/>} />

          {/* index-student */}
          <Route path="/students" element={<StudentIndex />} />

          {/* ViewStudents */}
          <Route path="/view-students" element={<ViewStudents />} />
          
          {/* AddStudent */}
          <Route path="/add-student" element={<AddStudent isAdmin={true}/>} />
          
          
          {/* AddStudent */}
          <Route path="/register" element={<AddStudent isAdmin={false}/>} />
          
          {/* UpdateStudent */}
          <Route path="/update-student/:id" element={<UpdateStudent />} />

          {/* ViewTecahers */}
          <Route path="/tecahers" element={<ViewTecahers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
