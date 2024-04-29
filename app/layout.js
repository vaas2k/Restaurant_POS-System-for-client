import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kazim K-POS",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          <Navbar />
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
