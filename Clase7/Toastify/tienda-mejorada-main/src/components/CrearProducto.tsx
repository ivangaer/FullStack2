import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Contenedor principal que ocupa toda la altura de la ventana
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Ocupa toda la altura de la ventana
  background-color: #f1f1f1; // Color de fondo para distinguir el contenedor
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 500px;
  margin: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #4caf50;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 15px;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.p`
  color: #4caf50;
  font-size: 1em;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 1em;
  margin-top: 10px;
`;

const CrearProducto: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener categorías de la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const productData = {
      title,
      price: parseFloat(price as string),
      description,
      image,
      category,
    };

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Producto creado exitosamente!');
        console.log('Producto creado:', data);

        // Limpiar el formulario
        setTitle('');
        setPrice('');
        setDescription('');
        setImage('');
        setCategory('');
      } else {
        throw new Error('Error al crear el producto');
      }
    } catch (error) {
      setErrorMessage('Error al crear el producto. Intenta nuevamente.');
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <Container>
        <Title>Crear Producto</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Título del producto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Precio del producto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="URL de la imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Select>
          <Button type="submit">Crear Producto</Button>
        </form>
        {successMessage && <Message>{successMessage}</Message>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </PageContainer>
  );
};

export default CrearProducto;
