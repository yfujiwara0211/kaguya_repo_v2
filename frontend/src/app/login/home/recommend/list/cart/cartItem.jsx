"use client";
import { ShopContext } from "../../../../../../context/shop-context";
import React, { useContext } from "react";

function CartItem(props) {
  const { product_id, product_name, image, price } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={image} />
      <div className="description">
        <p className="cartItemTitle">{product_name}</p>
        <p>{price}円</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(product_id)}> - </button>
          <input
            value={cartItems[product_id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), product_id)}
          />
          <button onClick={() => addToCart(product_id)}> + </button>
        </div>
        <p className="subtotal">小計: {price * cartItems[product_id]}円（税込）</p>
      </div>
    </div>
  );
}

export default CartItem;
