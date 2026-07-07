import { NextRequest, NextResponse } from "next/server";

type NotifyPayload = {
  tableName: string;
  items: { name: string; flavor: string; nic?: string | null; qty: number; price: number }[];
  total: number;
};

function formatPrice(value: number) {
  return `${value.toLocaleString("id-ID")} ៛`;
}

export async function POST(req: NextRequest) {
  try {
    const body: NotifyPayload = await req.json();
    const { tableName, items, total } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { ok: false, error: "Telegram env belum di-set" },
        { status: 500 }
      );
    }

    // Susun pesan dari data pesanan
    const itemLines = items
      .map(
        (item) =>
          `• ${item.name} (${item.flavor}${item.nic ? `, ${item.nic}` : ""}) x${item.qty} — ${formatPrice(item.price * item.qty)}`
      )
      .join("\n");

    const message = `*Pesanan Baru*\nMeja: ${tableName}\n\n${itemLines}\n\n*Total: ${formatPrice(total)}*`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      return NextResponse.json({ ok: false, error: errText }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}