import Login from "./components/auth/login";
import Register from "./components/auth/register";

import SideBar from "./components/SideBar";
import Home from "./components/Home";

import AdminLogin from "./Admin/AdminLogin"

import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route, Outlet , Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext'
import Profile from "./components/Profile";
import ChangeProfile from "./components/ChangeProfile";
import ChnagePassword from "./components/ChnagePassword";
import Stock from "./components/Stock";
import AddToStock from "./components/AddToStock";
import ForgotPassword from "./components/ForgotPassword";
import Help from "./components/Help";
import Transactions from "./components/Transactions";
import Buy from "./components/Buy";
import Sell from "./components/Sell";
import TransHistory from "./components/TransHistory"
function UserPrivateRoutes() {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? (
    <div className="userDash">
      <SideBar />
      <Outlet/>
    </div>
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
            <Route path="*" index element={<h1>Statics Page</h1>}/>

            <Route path="profile"  element={<Profile/>}/>
            <Route path="chnage-password"  element={<ChnagePassword/>}/>
            <Route path="chnage-profile"  element={<ChangeProfile/>}/>
            
            <Route path="stock"  element={<Stock/>}/>
            <Route path="add-to-stock"  element={<AddToStock/>}/>

            <Route path="transactions" element={<Transactions/>}>
              <Route  path="buy" element={<Buy/>}/>
              <Route path="sell"  element={<Sell/>}/>
              <Route index path="*"  element={<TransHistory/>}/>
            </Route>
            <Route path="help" element={<Help/>} />
          </Route>

          {/* User Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Define a default route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
