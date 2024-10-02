import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 49%;
  border-radius: 8px;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 95%;
  padding: 1rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
`;

const Button = styled.button`
  background-color: #ff4b4b;
  color: white;
  padding: 0.5rem;
  border: none;

  cursor: pointer;
  &:hover {
    background-color: #ff1c1c;
  }
`;

const TotalSection = styled.div`
  margin-top: 1rem;
  width: 100%;
  text-align: left;
  font-weight: bold;
  background-color: #f1f1f1;
  padding: 1rem;
`;

const UserInfo = styled.div`
  width: 100%;
  background-color: #e6e6e6;
  padding: 0.5rem;
  width: 100%;
`;

const PromotionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 95%;
  padding: 1rem;
  background-color: #e3f6f5;
`;

const PromotionItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #e3f6f5;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
  font-weight: bold;
  color: #009688;
`;

const CartComponent = ({ cart, setCart }) => {
  // Function to remove an item from the cart
  const removeItemFromCart = async (itemId) => {
    const userId = cart.user.id;
    try {
      const response = await fetch(
        `http://localhost:3007/carts/remove-product/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: itemId, quantity: 1 }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Function to remove an applied promotion from the cart
  const removePromotionFromCart = async (promotionId) => {
    const userId = cart.user.id;
    try {
      const response = await fetch(
        `http://localhost:3007/carts/remove-promotion/${userId}/${promotionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove promotion");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing promotion from cart:", error);
    }
  };

  return (
    <Section>
      <UserInfo>
        <h2>Current Cart</h2>
        <p>
          <strong>User:</strong> {cart.user?.name || "No User"} (
          {cart.user?.email || "No Email"})
        </p>
      </UserInfo>
      {cart.items.length > 0 ? (
        <>
          <ItemsList>
            <h1>Products</h1>
            {cart.items.map((item) => (
              <Item key={item.id}>
                <div>
                  <strong>{item.product?.name || "Unnamed Product"}</strong> -{" "}
                  {item.quantity} x {item.product?.price || "0.00"} DZD
                </div>
                <div>
                  <span>
                    Discounted Price:{" "}
                    {item.discountedPrice || item.product?.price || "0.00"} DZD
                  </span>
                  <Button onClick={() => removeItemFromCart(item.product.id)}>
                    Remove Item
                  </Button>
                </div>
              </Item>
            ))}
          </ItemsList>
          <TotalSection>
            <p>Total Before Discount: {cart.totalBeforeDiscount} DZD</p>
            <p>Total After Discount: {cart.totalAfterDiscount} DZD</p>
          </TotalSection>

          {cart.appliedPromotions.length > 0 && (
            <>
              <PromotionsList>
                <h3>Applied Promotions</h3>
                {cart.appliedPromotions.map((promotion) => (
                  <PromotionItem key={promotion.id}>
                    <span>
                      {promotion.name} - {promotion.description}
                    </span>
                    <Button
                      onClick={() => removePromotionFromCart(promotion.id)}
                    >
                      Remove Promotion
                    </Button>
                  </PromotionItem>
                ))}
              </PromotionsList>
            </>
          )}
        </>
      ) : (
        <p>The cart is currently empty.</p>
      )}
    </Section>
  );
};

export default CartComponent;
