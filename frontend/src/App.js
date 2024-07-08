import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import CourseManagement from './pages/CourseManagement';
import ContentManagement from './pages/ContentManagement';
import StudentCourses from './pages/StudentCourses';
import CourseDetail from './pages/CourseDetail';
import './styles/App.css';
import { UserContext, UserProvider } from './context/UserContext';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <UserContext.Consumer>
          {({ user }) => (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {user && user.role === 'student' && (
                  <>
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/courses" element={<StudentCourses />} />
                  </>
                )}
                {user && user.role === 'admin' && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="/admin/courses" element={<CourseManagement />} />
                    <Route path="/admin/content" element={<ContentManagement />} />
                  </>
                )}
                <Route path="/course/:courseId" element={<CourseDetail />} />
              </Routes>
            </>
          )}
        </UserContext.Consumer>
      </UserProvider>
    </Router>
  );
};

export default App;
