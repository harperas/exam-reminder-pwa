import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReminderEmail(to, examName, admitDate, forWhom) {
  try {
    const subject = `⏰ Admit Card Reminder: ${examName}`;
    const text = `Hi, this is a reminder to check the admit card for ${examName} (${forWhom}).
Expected admit card date: ${admitDate}.
Log in to Exam Reminder to manage your exams.`;

    const data = await resend.emails.send({
      from: "Exam Reminder <onboarding@resend.dev>",
      to,
      subject,
      text,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
}
