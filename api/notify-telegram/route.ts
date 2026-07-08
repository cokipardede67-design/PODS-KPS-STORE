import { NextRequest, NextResponse } from 'next/server';

interface OrderData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  currency: string;
  orderTime: string;
  notes?: string;
}

// Format harga ke Riel Cambodia
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Buat message Telegram
function createTelegramMessage(order: OrderData): string {
  const itemsList = order.items
    .map(
      (item) =>
        `• ${item.name}\n  Qty: ${item.quantity} | ${formatPrice(item.price)} ${order.currency}`
    )
    .join('\n');

  const message = `
📦 *ORDER BARU - PODS KPS*

👤 *Pelanggan:* ${order.customerName}
📞 *Nomor:* ${order.customerPhone}
🕐 *Waktu:* ${order.orderTime}

📝 *Items:*
${itemsList}

💰 *Total:* ${formatPrice(order.totalPrice)} ${order.currency}
${order.notes ? `\n📌 *Catatan:* ${order.notes}` : ''}

---
Order ID: \`${order.orderId}\`
  `.trim();

  return message;
}

// Handler untuk POST request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as OrderData;

    // Validasi required fields
    if (
      !body.orderId ||
      !body.customerName ||
      !body.customerPhone ||
      !body.items ||
      !body.totalPrice
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Telegram bot token dan chat ID dari environment variables
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing Telegram configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Buat pesan
    const message = createTelegramMessage(body);

    // Kirim ke Telegram API
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const telegramResponse = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', telegramResponse);
      return NextResponse.json(
        { error: 'Failed to send notification', details: telegramResponse },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Notification sent to Telegram',
        messageId: telegramResponse.result.message_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in notify-telegram:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handler untuk GET request (health check)
export async function GET() {
  return NextResponse.json({ status: 'Telegram notification API is active' });
}
