import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

export async function POST(request: Request) {
  const { name, email, phone, service, location, message } =
    await request.json();

  const mailjet = new Mailjet({
    apiKey: "e9a17e9fe29b424e32d8d543d85ffa40",
    apiSecret: "2e2e06b61aac436a27368fcbf38650ee",
  });

  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "no-reply@zebekov.mk",
            Name: "Dental Center Zebekov",
          },
          To: [{ Email: "contact@zebekov.mk", Name: "Contact" }],
          Subject: "New Appointment Request from Website",
          TextPart: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nService: ${service}\nMessage: ${message}`,
          HTMLPart: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Location:</strong> ${location}</p><p><strong>Service:</strong> ${service}</p><p><strong>Message:</strong><br/>${message}</p>`,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Mailjet error:", error.statusCode, error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
