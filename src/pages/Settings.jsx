import { useNavigate } from 'react-router-dom';

function Settings({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
        Logout
      </button>
    </div>
  );
}

export default Settings;
