import React from "react";
import styled from "styled-components";


const Section = styled.section`
  max-width: 100%;

  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 1rem;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;


const PromotionList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;


const PromotionItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 100%;
  align-items: center;
`;


const ApplyButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const PromotionsComponent = ({ promotions, cart, setCart }) => {

  const applyPromotionToCart = async (promotionId) => {
    if (!cart || !cart.user || !cart.user.id) {
      console.error("Cart or User data is missing.");
      return;
    }

    const userId = cart.user.id; 

    try {
      const response = await fetch(
        `http://localhost:3007/carts/apply-promotion/${userId}/${promotionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ promotionId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to apply promotion");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error applying promotion to cart:", error);
    }
  };


  if (!promotions || promotions.length === 0) {
    return <p>No available promotions at the moment.</p>;
  }

  return (
    <Section>
      <h2>Available Promotions</h2>
      <PromotionList>
        {promotions.map((promotion) => (
          <PromotionItem key={promotion.id}>
            <div>
              <strong>{promotion.name}</strong> - {promotion.description}
            </div>
            <ApplyButton onClick={() => applyPromotionToCart(promotion.id)}>
              Apply Promotion
            </ApplyButton>
          </PromotionItem>
        ))}
      </PromotionList>
    </Section>
  );
};

export default PromotionsComponent;
