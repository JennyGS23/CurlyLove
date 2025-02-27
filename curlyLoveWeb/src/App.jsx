import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/common/Login';
import Register from './pages/common/Register'; 
import ClientPrincipalPage from './pages/client/ClientPrincipalPage';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ClientPrincipalPage />} />
      </Routes>
    </Router>
  );
};

export default App;