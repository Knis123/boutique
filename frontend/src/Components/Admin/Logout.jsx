import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout(); 
          navigate("/login"); 
        } catch (err) {
          console.error("Logout error:", err); 
        }
      };
    



  return (
    <div className="logout">
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout