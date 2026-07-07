"use client";

import { useState, useMemo } from "react";
import { cartridgeProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function CartridgePage() {
  const subcats = useMemo(
    () => Array.from(new Set(cartridgeProducts.map((p) => p.subcat))),
    []
  );
  const [active, setActive] = useState<string>("Semua");

  const filtered =
    active === "Semua"
      ? cartridgeProducts
      : cartridgeProducts.filter((p) => p.subcat === active);

  return (
    <main className="min-h-screen bg-white px-6 py-10 pb-28">
      <h1 className="text-2xl font-bold text-black mb-1">CARTRIDGE</h1>
      <p className="text-gray-400 mb-6">Pilih cartridge sesuai device kamu</p>

      <div className="flex gap-2 overflow-x-auto mb-6 no-scrollbar">
        <button
          onClick={() => setActive("Semua")}
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${
            active === "Semua"
              ? "bg-black text-white border-black"
              : "bg-white text-zinc-600 border-zinc-300"
          }`}
        >
          Semua
        </button>
        {subcats.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${
              active === s
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-600 border-zinc-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
