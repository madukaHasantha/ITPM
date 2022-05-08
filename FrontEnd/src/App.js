import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewTecahers from "./components/Teacher/ViewTecahers";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//components

import AddTeacher from "./components/Teacher/AddTeacher";
import ViewAnnouncements from "./components/Announcement/ViewAnnouncements";
import AddAnnouncement from "./components/Announcement/AddAnnouncement";
import EditAnnouncement from "./components/Announcement/EditAnnouncement";
import AllAnnouncement from "./components/Announcement/AllAnnouncement";
import ReportAnnouncement from "./components/Announcement/Report";
import ViewClasses from "./components/Class/ViewClasses";
import ViewStudents from "./components/Student/ViewStudents";
import Sidebar from "./components/NavBar/Sidebar";

function App() {
  return (
    <Router>
      <Sidebar />
      <div>
        <section>
        <Routes>

          {/* ViewAnnouncements */}
          <Route path="/anouncements" element={<ViewAnnouncements />} />
          <Route path="/anouncements/add" element={<AddAnnouncement />} />
          <Route path="/anouncements/edit/:id" element={<EditAnnouncement />} />
          <Route path="/anouncements/all" element={<AllAnnouncement />} />
          <Route path="/anouncements/report" element={<ReportAnnouncement />} />

          {/* ViewClasses */}

          <Route path="/classes" element={<ViewClasses />} />

          {/* ViewStudents */}
          <Route path="/students" element={<ViewStudents />} />

          {/* ViewTecahers */}
          <Route path="/tecahers" element={<ViewTecahers />} />
          <Route path="/teachers/add" element={<AddTeacher />} />
        </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
