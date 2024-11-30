//Hom
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Home</h1>
      <button
        onClick={handleLogout}
        className="w-60 bg-primary text-white py-2 rounded hover:bg-[#29B6AB] mt-6"
      >
        Volver al Login
      </button>
    </div>
  );
};

export default Home;