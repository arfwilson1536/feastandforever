import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, eventDate, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await sgMail.send({
      to: "hello@feastandforever.co.uk",
      from: "enquiries@feastandforever.co.uk",
      replyTo: email,
      subject: `New Feast & Forever Enquiry — ${name}`,
      text: `
Name: ${name}
Email: ${email}
Event Date: ${eventDate || "Not provided"}

Message:
${message}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Email failed to send" });
  }
}
