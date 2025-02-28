import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/common/Login';
import Register from './pages/common/Register'; 
import ClientPrincipalPage from './pages/client/ClientPrincipalPage';
import DescriptionProduct from './pages/client/DescriptionProduct';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ClientPrincipalPage />} />
        <Route path="/description" element={<DescriptionProduct />} />
      </Routes>
    </Router>
  );
};

export default App;