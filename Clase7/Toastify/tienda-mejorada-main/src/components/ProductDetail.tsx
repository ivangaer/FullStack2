import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contenedor principal con fondo claro
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 60px;
  background-color: #f9f9f9; // Fondo claro
  min-height: 100vh;
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px; // Bordes redondeados para la imagen
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // Sombra suave
`;

const ProductTitle = styled.h2`
  font-size: 1.5em;
  margin: 10px 0;
  color: #333; // Color de texto oscuro
  text-align: center; // Centrar el texto
`;

const ProductPrice = styled.p`
  font-size: 1.2em;
  color: #4caf50; // Color verde para el precio
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 1em;
  margin: 10px 0;
  max-width: 600px;
  text-align: center; // Centrar el texto
  color: #555; // Color gris para la descripción
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  background-color: #ddd;
  color: #333;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  &:hover {
    background-color: #ccc; // Color al pasar el mouse
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  font-size: 1em;
  text-align: center;
  border: 1px solid #ddd; // Borde gris claro
  margin: 0 10px;
  border-radius: 5px;
`;

const BuyButton = styled.button`
  background-color: #ff9900; // Color de fondo del botón de compra
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: #e68a00; // Color al pasar el mouse
  }
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ id: product.id, title: product.title, price: product.price, quantity });
      toast.success('¡Producto agregado al carrito!', { position: 'top-center' });
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <ToastContainer />
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>${product.price}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
      <QuantityContainer>
        <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
        <QuantityInput
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
      </QuantityContainer>
      <BuyButton onClick={handleAddToCart}>Agregar al Carrito</BuyButton>
    </Container>
  );
};

export default ProductDetail;
