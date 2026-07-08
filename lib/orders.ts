import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CartItem } from "@/lib/cart-context";

export type OrderPayload = {
  tableName: string;
  items: CartItem[];
  total: number;
};

export async function submitOrder(payload: OrderPayload) {
  const tableId = `T-${Date.now()}`;

  const docRef = await addDoc(collection(db, "orders"), {
    tableName: payload.tableName || tableId,
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

  try {
    const orderTime = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const formattedItems = payload.items.map((item) => ({
      name: item.name,
      quantity: item.qty,
      price: item.price,
    }));

    const telegramPayload = {
      orderId: docRef.id,
      customerName: payload.tableName || tableId,
      customerPhone: "-",
      items: formattedItems,
      totalPrice: payload.total,
      currency: "KHR",
      orderTime: orderTime,
      notes: `Table Order - Status: pending`,
    };

    await fetch("/api/notify-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(telegramPayload),
    });
  } catch (err) {
    console.error("Gagal mengirim notifikasi Telegram:", err);
  }

  return docRef.id;
}