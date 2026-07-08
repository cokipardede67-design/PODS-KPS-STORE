import { NextRequest, NextResponse } from "next/server";

interface OrderData {
  orderId?: string;
  tableName: string;
  items: {
    name: string;
    flavor?: string;
    nic?: string | null;
    qty: number;
    price: number;
  }[];
  total: number;
}

function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat("id-ID").format(amount)} ៛`;
}

function createTelegramMessage(order: OrderData): string {
  const itemsList = order.items
    .map((item) => {
      const variant = [item.flavor, item.nic].filter(Boolean).join(" · ");
      return `• ${item.qty}x ${item.name}${variant ? ` (${variant})` : ""} — ${formatPrice(item.price * item.qty)}`;
    })
    .join("\n");

  return `
📦 *ORDER BARU - PODS KPS*

🪑 *Meja/Nama:* ${order.tableName || "-"}

📝 *Items:*
${itemsList}

💰 *Total:* ${formatPrice(order.total)}
${order.orderId ? `\nOrder ID: \`${order.orderId}\`` : ""}
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OrderData;

    if (!body.items || !body.items.length || typeof body.total !== "number") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing Telegram configuration");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const message = createTelegramMessage(body);

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const telegramResponse = await response.json();

    if (!response.ok) {
      console.error("Telegram API error:", telegramResponse);
      return NextResponse.json(
        { error: "Failed to send notification", details: telegramResponse },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: telegramResponse.result.message_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in notify-telegram:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Telegram notification API is active" });
}