"use client"
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext({
  items: [],
  cartItems: {},
  id: null,
  category: null,
  getTotalCartAmount: () => 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemCount: () => {},
  checkout: () => {}
});

const initializeCart = (products) => {
  let newCart = {};
  products.forEach((product) => {
    newCart[product.product_id] = 0;
  });
  return newCart;
};

export const ShopContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [id, setId] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null); // エラーをリセット

    // URLからidとcategoryを取得
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get('id');
    const urlCategory = urlParams.get('category');

    // idとcategoryを設定
    setId(urlId);
    setCategory(urlCategory);

    // fetchしてデータを取得
    if (urlId && urlCategory) {
      fetch(`http://127.0.0.1:8000/recommend/?id=${urlId}&category=${urlCategory}`)
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
          setItems(json);
          setCartItems(initializeCart(json));
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch products:", err);
          setError(err.message || "商品のロードに失敗しました。");
          setLoading(false);
        });
    }
  }, []);

    // ShopContextProvider 内の useEffect を修正
  useEffect(() => {
    console.log("ShopContextProvider: Loading cart items from localStorage...");
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems && Object.keys(savedCartItems).length !== 0) {
      setCartItems(savedCartItems);
      console.log("ShopContextProvider: Cart items loaded:", savedCartItems);
    } else {
      // カート情報が空の場合、初期化する
      const initializedCartItems = initializeCart(items);
      setCartItems(initializedCartItems);
      console.log("ShopContextProvider: Cart items initialized:", initializedCartItems);
    }
  }, []);

  useEffect(() => {
    console.log("ShopContextProvider: Saving cart items to localStorage...");
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("ShopContextProvider: Cart items saved:", cartItems);
  }, [cartItems]);
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = items.find((product) => product.product_id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const currentCount = prev[itemId];
      const updatedCount = currentCount > 0 ? currentCount - 1 : 0;
      return { ...prev, [itemId]: updatedCount };
    });
  };
  

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(initializeCart(items)); // 修正
  };

  const contextValue = {
    items,
    cartItems,
    id,
    category,
    setCartItems,
    getTotalCartAmount,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    checkout
  };
  
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}