import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

const resend = apiKey ? new Resend(apiKey) : null;

/** Turn the plain-text body (with line breaks) into safe minimal HTML. */
function toHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, "<br/>")}</p>`)
    .join("");
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.6;color:#18181B">${paragraphs}</div>`;
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  body: string;
}): Promise<{ id: string }> {
  if (!resend) throw new Error("email_unconfigured");

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [input.to],
    subject: input.subject,
    html: toHtml(input.body),
  });

  if (error || !data) throw new Error("email_failed");
  return { id: data.id };
}
