"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [flavor, setFlavor] = useState<string | null>(null);
  const [nic, setNic] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const needsNic = !!product.nic && product.nic.length > 0;
  const ready = !!flavor && (!needsNic || !!nic);

  const handleAdd = () => {
    if (!ready || !flavor) return;
    addItem({
      name: product.name,
      price: product.price,
      flavor,
      nic: nic ?? null,
      qty,
    });
    setJustAdded(true);
    setQty(1);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className={`rounded-xl border border-zinc-200 p-4 ${
        product.sold ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold text-zinc-800">{product.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{product.subcat}</p>
        </div>
        <p className="font-mono font-bold text-zinc-800">
          {formatPrice(product.price)}
        </p>
      </div>

      {product.sold ? (
        <div className="bg-zinc-100 text-center py-2 rounded-lg text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Habis
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.flavors.map((f) => (
              <button
                key={f}
                onClick={() => setFlavor(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                  flavor === f
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-zinc-600 border-zinc-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {needsNic && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.nic!.map((n) => (
                <button
                  key={n}
                  onClick={() => setNic(n)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                    nic === n
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-500 border-zinc-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 bg-zinc-100 rounded-full px-1 py-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-full font-bold text-zinc-700"
              >
                −
              </button>
              <span className="w-4 text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-7 h-7 rounded-full font-bold text-zinc-700"
              >
                +
              </button>
            </div>

            <button
              disabled={!ready}
              onClick={handleAdd}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                ready
                  ? justAdded
                    ? "bg-black text-white"
                    : "bg-green-600 text-white"
                  : "bg-zinc-200 text-zinc-400"
              }`}
            >
              {justAdded ? "Ditambahkan ✓" : "Tambah"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}