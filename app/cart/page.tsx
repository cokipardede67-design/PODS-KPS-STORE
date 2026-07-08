"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { submitOrder } from "@/lib/orders";

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const [tableName, setTableName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitOrder({ tableName, items, total: totalPrice });

      // Kirim notifikasi Telegram — kalau gagal, tidak menggagalkan pesanan
      try {
        await fetch("/api/notify-telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tableName, items, total: totalPrice }),
        });
      } catch (notifyErr) {
        console.error("Gagal kirim notifikasi Telegram:", notifyErr);
      }

      setSent(true);
      setTimeout(() => {
        clearCart();
        setSent(false);
        setTableName("");
      }, 2000);
    } catch (err) {
      setError("Gagal mengirim pesanan. Coba lagi ya.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl mb-4">
          ✓
        </div>
        <p className="text-xl font-bold text-zinc-800">Pesanan Terkirim</p>
        <p className="text-gray-400 mt-1">Staff sedang memproses pesananmu.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 pb-32">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Keranjang</h1>

      {items.length === 0 && (
        <p className="text-gray-400">Keranjang masih kosong.</p>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-zinc-100 rounded-xl p-4"
          >
            <div className="min-w-0">
              <p className="font-semibold text-zinc-800 truncate">{item.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {item.flavor}
                {item.nic ? ` · ${item.nic}` : ""}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-7 h-7 rounded-full bg-white font-bold text-zinc-700"
                >
                  −
                </button>
                <span className="w-4 text-center text-sm font-semibold">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-7 h-7 rounded-full bg-white font-bold text-zinc-700"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="font-mono font-semibold text-zinc-800">
                {formatPrice(item.price * item.qty)}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-xs font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-6 py-4 space-y-3">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex justify-between items-center font-bold">
            <span className="text-gray-400 text-sm uppercase tracking-wide">Total</span>
            <span className="font-mono text-lg text-zinc-800">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Nomor meja / nama"
            className="w-full bg-zinc-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white rounded-xl py-3 font-bold uppercase tracking-wide disabled:opacity-60"
          >
            {loading ? "Mengirim..." : "Kirim Pesanan"}
          </button>
        </div>
      )}
    </main>
  );
}