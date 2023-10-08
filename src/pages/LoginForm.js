import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Components/AuthContext'; 


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

import '../styles/login.css';
import jwt_decode from 'jwt-decode';

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { setUserId } = useAuth();

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

        if (decoded.roles.toLowerCase() === "administrador") {
          setUserId(decoded.id);
          navigate('/homeAdmin');
        } else {
          navigate('/home');
        }
        console.log(decoded)
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
      <div className="pizza-slice">
        <div className='borderContent'>
          <div className='textContent'>
            <h2>Bienvenido</h2>
          </div>
        </div>
      </div>
      <div className='contentCard'>
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
                <span className="material-symbols-outlined iconDropDown">
                  <FontAwesomeIcon icon={faUser} style={{ color: 'white', marginRight:"5px"}} />
                </span>
              </div>
              <div className="passwordInput">
                <input
                  placeholder="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span className="material-symbols-outlined iconDropDown">
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    style={{ color: 'white', cursor: 'pointer', marginRight:"5px"}}
                    onClick={toggleShowPassword}
                    alt="Toggle Password Visibility"
                  />
                </span>
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
    </div>
  );
}

export default LoginForm;
