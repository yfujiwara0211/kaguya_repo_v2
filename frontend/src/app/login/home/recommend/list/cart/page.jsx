"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "./cart.css";
import CartItem from "./cartItem";
import { ShopContext } from "../../../../../../context/shop-context";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../../../../theme/theme'

const Cart = () => {
  const { items, cartItems, getTotalCartAmount, checkout, setCartItems } =
    useContext(ShopContext);
  // 小数点第2位で四捨五入
  const totalAmount = Math.round(getTotalCartAmount() * 100) / 100;

  const router = useRouter();

  useEffect(() => {
    // ページがロードされるときにローカルストレージからカートのデータを取得
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  const handleBackPage = () => {
    router.push('/login/home/recommend/list');
  }

  const handleCheckout = () => {
    const cartData = { items, cartItems, totalAmount };
    // cartData内の文字列をUnicodeエスケープシーケンスに変換する
    const escapedCartData = JSON.parse(JSON.stringify(cartData), (key, value) => {
      if (typeof value === 'string') {
        return value.replace(/[^\x00-\x7F]/g, (ch) => '\\u' + ('0000' + ch.charCodeAt(0).toString(16)).slice(-4));
      }
      return value;
    });

    const cartDataString = encodeURIComponent(btoa(JSON.stringify(escapedCartData)));
    router.push(`/login/home/recommend/list/cart/checkout?cartData=${cartDataString}`);
  };

  // カートの変更があったときにローカルストレージにカートのデータを保存
  // Cart コンポーネント内の useEffect を修正
  useEffect(() => {
    console.log("Cart component: Saving cart items to localStorage...");
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Cart component: Cart items saved:", cartItems);
  }, [cartItems]);

  return (
    <>
    <ThemeProvider theme={theme}>
        <div className="cart">
          <div className="text-2xl font-bold">
            <h1>カートの商品</h1>
          </div>
          <div className="cart">
            {items.map((item) => {
              if (cartItems[item.product_id] !== 0) {
                return <CartItem data={item} key={item.product_id} />;
              }
            })}
          </div>

          {totalAmount > 0 ? (
            <div className="checkout">
              <p className="total">合計: {totalAmount}円（税込）</p>
              <div>
                <button onClick={handleCheckout}> {/* 購入するボタンに handleCheckout 関数を紐付け */}
                  購入する
                </button>
                <button
                onClick={() => {
                  checkout();
                }}
                >
                  カートを空にする
                </button>
                <button onClick={handleBackPage}>
                  商品を選び直す
                </button>
             </div>
            </div>
          ) : (
            <div className="checkout">
              <h1 className="text-xl text-center">カートは空です</h1>
              <button onClick={handleBackPage}>
                  商品を選び直す
              </button>
            </div>
          )}
        </div>
        </ThemeProvider>
      </>
  );
};

export default Cart;
