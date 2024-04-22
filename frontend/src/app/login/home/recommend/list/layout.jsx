import { ShopContextProvider } from '../../../../../context/shop-context'

export default function Layout({children}) {
  return (
      <>
        <ShopContextProvider>
          {children}
        </ShopContextProvider> 
      </>
  );
}