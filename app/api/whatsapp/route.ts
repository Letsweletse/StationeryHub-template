import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();
    
    const ultramsgData = {
      token: process.env.ULTRAMSG_TOKEN,
      to: process.env.WHATSAPP_NUMBER,
      body: `📧 New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nTime: ${new Date().toLocaleString()}`
    };

    // Send to UltraMSG API
    const response = await fetch(`https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ultramsgData)
    });

    const result = await response.json();
    
    if (result.sent === 'true') {
      return NextResponse.json({ success: true, message: 'Message sent via WhatsApp!' });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to send via WhatsApp' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
