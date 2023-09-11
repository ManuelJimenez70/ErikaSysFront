import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/login.css';
import userLog from '../images/perfil.png';
import showPasswordImage from '../images/show.png';
import hidePasswordImage from '../images/hide.png';
import jwt_decode from 'jwt-decode';

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        email: username,
        password: password,
      };

      const response = await axios.post(
        'http://www.ErikaSys.somee.com/api/User/login/',
        requestData
      );

      // Mueve este bloque dentro del .then
      if (response.data.state === 'SUCCESS') {

        const decoded = jwt_decode(response.data.data);

        if(decoded.roles.toLowerCase() === "administrador"){
          navigate('/homeAdmin');
        }else{
          navigate('/home');
        }
        console.log(response.data.data)
      } else {
        setLoginError(response.data.data);
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
      setLoginError('Error al intentar iniciar sesión');
    }
  };

  return (
    <div className="general">
      <div className="mycard">
        <h2>Ingresa</h2>
        <form className="formCard">
          <div className="inputs">
            <div className="userInput">
              <input
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <img src={userLog} alt="User Icon" />
            </div>
            <div className="passwordInput">
              <input
                placeholder="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? hidePasswordImage : showPasswordImage}
                onClick={toggleShowPassword}
                alt="Toggle Password Visibility"
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
            </div>
          </div>

          {loginError &&

            <div class="alert alert-danger mt-3 p-1" role="alert">{loginError}
            </div>
          }

          <div className="buttonLog">
            <button onClick={handleLogin}>Ingresar</button>
          </div>
          <div className="forgot">
            <h5>Olvidé mi contraseña</h5>
            <div className="checkB">
              <input type="checkbox" />
              <h5>Recordar datos</h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
