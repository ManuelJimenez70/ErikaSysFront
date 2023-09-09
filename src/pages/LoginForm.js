import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import userLog from "../images/perfil.png";
import passLog from "../images/candado.png";
import showPasswordImage from '../images/show.png';
import hidePasswordImage from '../images/hide.png';

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      // Realiza una solicitud de autenticación a tu servidor o base de datos
      // Si la autenticación es exitosa, redirige a HomeAdmin
      // Si la autenticación falla, muestra un mensaje de error
      // Ejemplo simplificado:
      if (username === "" && password === "") {
        navigate('/homeAdmin');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <div className='general'>
      <div className='mycard'>

        <h2>Ingresa</h2>
        <form className='formCard'>
          <div className='inputs'>
            <div className='userInput'>
              <input placeholder='Usuario' value={username} onChange={(e) => setUsername(e.target.value)}></input>
              <img src={userLog}></img>
            </div>
            <div className='passwordInput'>
              <input placeholder='Contraseña' type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <img
              src={showPassword ? hidePasswordImage : showPasswordImage}
              onClick={toggleShowPassword}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            </div>
          </div>

          <div className='showOrHide'>
          
          </div>
          <div className='buttonLog'>
            <button onClick={handleLogin}>Ingresar</button>
          </div>
          <div className='forgot'>
            <h5>Olvidé mi contraseña</h5>
            <div className='checkB'>
              <input type='checkbox'></input>
              <h5>Recordar datos</h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
