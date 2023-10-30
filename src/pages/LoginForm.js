import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snack from '../Components/Snack';
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
  const [messageSnack, setMessageSnack] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
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
        updateMessage("En un momento serás dirigido...", true);
        const decoded = jwt_decode(response.data.data);
        if (decoded.roles.toLowerCase() === "administrador") {
          navigate('/homeAdmin');
        } else {
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

  const updateMessage = (message, success) => {
    setMessageSnack(message);
    setIsSuccess(success);
  }

  useEffect(() => {
    if (messageSnack !== '') {
      const timer = setTimeout(() => {
        setMessageSnack('');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [messageSnack]);

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
              <div className="ad-textbox">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className={`${username ? "has-value" : ""}`}
                  id='textbox'
                  type='text'
                />
                <span className="material-symbols-outlined iconButton">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <label htmlFor='textbox'>Correo electrónico</label>
                <div className='underline'></div>
              </div>

              <div className="ad-textbox passwordContent">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={`${password ? "has-value" : ""}`}
                  id='textbox'
                  type={showPassword ? 'text' : 'password'}
                />
                <span className="material-symbols-outlined iconButton">
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={toggleShowPassword}
                    alt="Toggle Password Visibility"
                  />
                </span>
                <label htmlFor='textbox'>Contraseña</label>
                <div className='underline'></div>
              </div>
            </div>

            {loginError &&

              <div class="alert alert-danger mt-3 p-1 alertContent" role="alert">{loginError}
              </div>
            }

            <div className="buttonLog">
              <button onClick={handleLogin}>Entrar</button>
            </div>

            <div className="forgot">
              <h4>Olvidé mi contraseña</h4>
            </div>
          </form>
        </div>
      </div>

      {messageSnack &&
        <Snack success={isSuccess} message={messageSnack} show={messageSnack ? true : false}></Snack>
      }
    </div>
  );
}

export default LoginForm;
