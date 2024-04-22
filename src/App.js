import Login from "./components/auth/login";
import Register from "./components/auth/register";

import SideBar from "./components/SideBar";
import Home from "./components/Home";

import AdminLogin from "./Admin/AdminLogin"

import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route, Outlet , Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext'

function UserPrivateRoutes() {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? (
    <>
      <SideBar/>
      <Outlet/>
    </>
  ) : (<Navigate to="/login" replace={true}/>)
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Public Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* User Private Routes */}
          <Route path="/dashboard" element={<UserPrivateRoutes />} >
            <Route path="*" index element={<h1>Statics</h1>}/>
            <Route path="calendar" index element={<h1>Calendar</h1>}/>
          </Route>

          {/* User Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Define a default route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
