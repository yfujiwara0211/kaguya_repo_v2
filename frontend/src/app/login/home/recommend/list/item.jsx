
import { ShopContext } from "../../../../../context/shop-context";
import React, { useContext } from "react";

function Item(props) {
  const { product_id, product_name, image, price } = props;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemCount = cartItems[product_id];

  return (
    <div key={product_id} className="product">
      <div className="content">
        <img src={image} alt={product_name} className="image" />
        <p className="title">
          {product_id}. {product_name}
        </p>
        <p className="price">{price}円（税込）</p>
      </div>
      <button className="addToCartBtn" onClick={() => addToCart(product_id)}>
        カートに追加する {cartItemCount > 0 && <span>({cartItemCount}個)</span>}
      </button>
    </div>
  );
}

export default Item;
