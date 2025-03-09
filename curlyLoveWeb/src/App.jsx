import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/common/Login';
import Register from './pages/common/Register';  
import AddProduct from './pages/admin/AddProduct';
import AdminPrincipalPage from './pages/admin/AdminPrincipalPage.jsx';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/addProduct' element={ <AddProduct />} />
        <Route path="/" element={user ? <AdminPrincipalPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;