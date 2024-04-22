"use client";

import React, { useContext, useEffect } from "react";
import "./shop.css";
import Link from "next/link";
import Item from "./item";
import { ShopContext } from "../../../../../context/shop-context";

function Shop() {
  const { items, id, category, cartItems, addToCart, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    console.log("Shop component: Loading cart items from localStorage...");
    // ページがロードされるときにローカルストレージからカートのデータを取得
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
      console.log("Shop component: Cart items loaded:", savedCartItems);
    }
  }, []);

  useEffect(() => {
    if (id && category) {
      fetch(`http://127.0.0.1:8000/recommend/?id=${id}&category=${category}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('ネットワークレスポンスが不正です。');
          }
          return res.json();
        })
        .then(json => {
          if (!Array.isArray(json)) {
            throw new Error('データ形式が不正です。');
          }
          console.log(json); // 取得したデータをconsole.logで表示
          // 商品一覧の取得後にカート情報を初期化
          // setCartItems(initializeCart(json)); // 追加
        })
        .catch(err => {
          console.error("Failed to fetch products:", err);
          // エラー処理
        });
    }
  }, [id, category]);

  // カートの変更があったときにローカルストレージにカートのデータを保存
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="shop">
      <div className='flex items-center justify-between font-extrabold'>
        <div className='pl-20 pt-12 text-2xl '>
          <h1>モダンオフィスコーディネート</h1>
          <div>{category}</div>
        </div>
        <div className='pr-20 pt-12 text-xl'>
        <Link href={"/login/home/recommend"} className="pr-20">戻る</Link>
        <Link href={"/login/home/recommend/list/cart"}>
          カート({Object.values(cartItems).reduce((acc, curr) => acc + curr, 0)})
        </Link>
        </div>
      </div>
      <div className="products">
        {items.map((item) => (
          <Item
            key={item.product_id} // keyプロパティを追加
            product_id={item.product_id}
            image={item.image}
            product_name={item.product_name}
            price={item.price}
            addToCart={addToCart}
            cartItemCount={cartItems[item.product_id] || 0}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
