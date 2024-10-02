import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartComponent from "./components/CartComponent";
import ProductsComponent from "./components/ProductsComponent";
import PromotionsComponent from "./components/PromotionsComponent";

const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

const ColumnWrapper = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const App = () => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch("http://localhost:3007/carts");
        const cartsData = await response.json();
        if (cartsData.length > 0) {
          setCart(cartsData[0]);
        } else {
          const response = await fetch("http://localhost:3007/users");
          const useData = await response.json();
          if (useData.length > 0) {
            const userCart = await fetch(
              `http://localhost:3007/carts/currentCart/${useData[0].id}`
            );
            const cartData = await userCart.json();
            if (cartData) {
              setCart(cartData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
    };
    fetchCarts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3007/products");
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:3007/promotions");
        const promotionsData = await response.json();
        setPromotions(promotionsData);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <Section>
      {cart ? (
        <>
          <ColumnWrapper>
            <ProductsComponent
              products={products}
              cart={cart}
              setCart={setCart}
            />
            <PromotionsComponent
              promotions={promotions}
              cart={cart}
              setCart={setCart}
            />
          </ColumnWrapper>
          <CartComponent cart={cart} setCart={setCart} />
        </>
      ) : (
        <div>
          No cart available. Please create a user or add items to the cart.
        </div>
      )}
    </Section>
  );
};

export default App;
