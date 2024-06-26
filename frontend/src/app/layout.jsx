
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KAGUYA",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div>
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}