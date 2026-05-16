'use client';

import { AuthProviderContext } from "@/context_API/AuthProviderContext";
import { CartProvider } from "@/context_API/CartProvider";


export default function Providers({ children }) {
  return (
    <AuthProviderContext>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProviderContext>
  );
}