import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: `Bienvenido, ${userCredential.user.email}!`,
        showConfirmButton: false,
        timer: 1500
      });
      console.log('Usuario autenticado:', userCredential.user);
      navigate('/Galery'); 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Correo electrónico o contraseña incorrectos.',
      });
      console.log('Error en el inicio de sesión:', error);
    }
  };

  const handleRegister = async () => {
    console.log('auth: ', JSON.stringify(auth));
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Ahora puedes iniciar sesión con tu cuenta.',
        confirmButtonColor: '#3498db'
      });
      console.log('Usuario registrado:', userCredential.user);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'warning',
          text: 'El correo electrónico ya está en uso',
          confirmButtonColor: '#3498db'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          confirmButtonColor: '#3498db'
        });
      } 
      console.log('Error en el registro:', error);
    }
  };
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: `Bienvenido, ${userCredential.user.displayName}!`,
        confirmButtonColor: '#3498db',
      });
      console.log('Usuario autenticado con Google:', userCredential.user);
      navigate('/Galery'); 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: 'No se pudo autenticar con Google.',
        confirmButtonColor: '#3498db'
      });
      console.log('Error en el inicio de sesión con Google:', error);
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Iniciar Sesión</h2>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-buttons">
          <button type="button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          <button type="button" onClick={handleRegister}>
            Registrarse
          </button>
          <button type="button" onClick={handleGoogleLogin}>
            Iniciar Sesión con Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
