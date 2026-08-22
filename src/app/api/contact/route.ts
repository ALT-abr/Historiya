import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

function cleanText(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const contactEmail = process.env.CONTACT_EMAIL;
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!contactEmail || !appPassword) {
    return Response.json({ error: "Configuration e-mail absente." }, { status: 500 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Données invalides." }, { status: 400 });
  }

  const name = cleanText(payload.name, 80);
  const email = cleanText(payload.email, 254);
  const subject = cleanText(payload.subject, 150);
  const message = cleanText(payload.message, 3000);

  if (!name || !isValidEmail(email) || !subject || !message) {
    return Response.json({ error: "Champs invalides." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: contactEmail,
      pass: appPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `Historiya <${contactEmail}>`,
      to: contactEmail,
      replyTo: email,
      subject: `[Historiya] ${subject}`,
      text: `Nouveau message reçu depuis Historiya\n\nNom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\nMessage :\n${message}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Échec de l’envoi du message de contact :", error);
    return Response.json({ error: "Échec de l’envoi de l’e-mail." }, { status: 500 });
  }
}
