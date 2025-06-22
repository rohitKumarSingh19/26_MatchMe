import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Chat from './pages/Chat';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
      </Routes>
      <Footer/>
    </>
  );
}
