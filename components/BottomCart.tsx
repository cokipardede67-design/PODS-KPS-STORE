"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function BottomCart() {
  const { totalItems, totalPrice } = useCart();
  const pathname = usePathname();

  // Jangan tampil di halaman /cart, karena di sana sudah ada bar checkout sendiri
  if (totalItems === 0 || pathname === "/cart") return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 bg-green-600 text-white rounded-xl px-5 py-4 flex items-center justify-between shadow-lg shadow-black/20 active:scale-[0.98] transition"
    >
      <span className="font-semibold text-sm">
        🛒 {totalItems} item
      </span>
      <span className="font-mono font-bold text-sm">
        {formatPrice(totalPrice)}
      </span>
    </Link>
  );
}
