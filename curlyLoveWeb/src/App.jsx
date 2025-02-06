import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/common/Login';
import Register from './pages/common/Register'; 
//import Home from './pages/common/Home'; 
import AddProduct from './pages/admin/AddProduct';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <AddProduct /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;