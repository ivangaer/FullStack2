import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: #f4f4f9;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 1.8em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.9em;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  margin-top: 15px;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.9em;
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 0.9em;
  margin-top: 10px;
  text-align: center;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login success:', data);

        // Mostrar notificación de éxito
        toast.success('Inicio de sesión exitoso!', { position: 'top-center' });

        // Redirigir a /admin después de un pequeño retraso
        setTimeout(() => {
          navigate('/admin'); // Usar navigate para redirigir
        }, 3000);
      } else {
        setErrorMessage('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setErrorMessage('Error en el inicio de sesión. Intente nuevamente.');
      console.error(error);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Form onSubmit={handleLogin}>
        <Title>Iniciar Sesión</Title>
        <Input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Ingresar</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default Login;
