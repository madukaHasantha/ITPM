import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewTecahers from "./components/Teacher/ViewTecahers";

//components

import AddTeacher from "./components/Teacher/AddTeacher";
import ViewAnnouncements from "./components/Announcement/ViewAnnouncements";
import ViewClasses from "./components/Class/ViewClasses";
import ViewStudents from "./components/Student/ViewStudents";
import Sidebar from "./components/NavBar/Sidebar";
import AddClass from "./components/Class/AddClass";
import { AlertProvider } from "./providers/alertProvoder";
import UpdateClass from "./components/Class/UpdateClass";

function App() {
	return (
		<BrowserRouter>
			<AlertProvider>
				<Sidebar />

				<div>
					<Routes>
						<Route path="/add" element={<AddTeacher />} />

						{/* ------------------------------------------------ */}
						{/* ViewAnnouncements */}
						<Route path="/anouncements" element={<ViewAnnouncements />} />

						{/* ------------------------------------------------ */}

						{/* ViewClasses */}
						<Route path="/classes" element={<ViewClasses />} />
						{/* AddClass */}
						<Route path="/classes/add-class" element={<AddClass />} />
						<Route path="/classes/update-class/:classID" element={<UpdateClass />} />

						{/* ------------------------------------------------ */}

						{/* ViewStudents */}
						<Route path="/students" element={<ViewStudents />} />

						{/* ------------------------------------------------ */}

						{/* ViewTecahers */}
						<Route path="/tecahers" element={<ViewTecahers />} />
					</Routes>
				</div>
			</AlertProvider>
		</BrowserRouter>
	);
}

export default App;
