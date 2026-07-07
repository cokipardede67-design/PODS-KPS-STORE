import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CartItem } from "@/lib/cart-context";

export type OrderPayload = {
  tableName: string;
  items: CartItem[];
  total: number;
};

/**
 * Simpan order baru ke koleksi "orders" di Firestore.
 * Status awal selalu "pending" — nanti diubah staff jadi "processing" / "done".
 */
export async function submitOrder(payload: OrderPayload) {
  const docRef = await addDoc(collection(db, "orders"), {
    tableName: payload.tableName || "-",
    items: payload.items.map((i) => ({
      name: i.name,
      flavor: i.flavor,
      nic: i.nic ?? null,
      qty: i.qty,
      price: i.price,
    })),
    total: payload.total,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  // Kirim notifikasi ke Telegram — kalau gagal, tidak menggagalkan proses order
  try {
    await fetch("/api/notify-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Gagal mengirim notifikasi Telegram:", err);
  }

  return docRef.id;
}