import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Contenedor principal con fondo claro
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
`;

const Header = styled.header`
  margin-bottom: 18px;
  font-size: 2em;
  color: #222;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const CategoryButton = styled.button`
  padding: 10px 18px;
  border: none;
  background: #222;
  color: #fff;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(34,34,34,0.08);
  transition: background 0.2s, transform 0.2s;

  &:hover, &:focus {
    background: #0078d4;
    outline: none;
    transform: scale(1.05);
  }
`;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
  padding: 0;
  justify-content: center;
`;

const ProductItem = styled.li`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 170px;
  text-align: center;
  transition: transform 0.2s;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: contain;
  background: #f3f3f3;
`;

const ProductTitle = styled.h2`
  font-size: 1em;
  color: #222;
  margin: 10px 0 4px 0;
  padding: 0 8px;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  font-weight: 500;
`;

const ProductPrice = styled.p`
  font-size: 1em;
  color: #0078d4;
  margin: 0 0 10px 0;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  font-weight: 600;
`;

const ProductDisplay: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('electronics');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Error al cargar las categorías');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Header>Lista de Productos de la Tienda GameHub</Header>
      <CategoryList>
        {categories.map(category => (
          <CategoryButton key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </CategoryButton>
        ))}
      </CategoryList>
      <ProductList>
        {products.map(product => (
          <ProductItem key={product.id}>
            <Link to={`/product/${product.id}`}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>Pecio: ${product.price} Oferta: ${product.price-(product.price/10)}</ProductPrice>
            </Link>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

export default ProductDisplay;
