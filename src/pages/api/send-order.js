import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  const today = new Date().toLocaleDateString("en-GB");

  try {
    await resend.emails.send({
      from: "sales@femtotrade.com",
      to: "sales@femtotrade.com",
      reply_to: email,
      subject: `New Order: ${today}`,
      html: `
        <h2>New Order</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending email" });
  }
}
