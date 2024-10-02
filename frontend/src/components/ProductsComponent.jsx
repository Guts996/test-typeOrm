import React from "react";
import styled from "styled-components";

// Main container for the products section
const Section = styled.section`
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 1.5rem;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProductsList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  margin-bottom: 1rem;
  width: 100%;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProductsComponent = ({ products, cart, setCart }) => {
  const addProductToCart = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3007/carts/add-product/${cart.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity: 1 }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Handle empty or unavailable products list
  if (!products || products.length === 0) {
    return <p>No products available at the moment.</p>;
  }

  return (
    <Section>
      <h2>Available Products</h2>
      <ProductsList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <div>
              <strong>
                {product.name} / {product.category}
              </strong>{" "}
              - {product.price} DZD
            </div>
            <AddButton onClick={() => addProductToCart(product.id)}>
              Add to Cart
            </AddButton>
          </ProductItem>
        ))}
      </ProductsList>
    </Section>
  );
};

export default ProductsComponent;
