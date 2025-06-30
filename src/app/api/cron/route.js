import pool from "../../lib/db";
import { sendReminderEmail } from "../../lib/mailer";
import { NextResponse } from "next/server";

export async function GET(req) {
  // ✅ Secure it using CRON_SECRET
  const authHeader = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + 3); // 3 days before admit card date

    const dateString = targetDate.toISOString().split("T")[0]; // format: YYYY-MM-DD

    const res = await pool.query(
      `SELECT * FROM exam_entries WHERE expected_admit_card_date = $1 AND reminder_sent IS NOT TRUE`,
      [dateString]
    );

    const exams = res.rows;

    for (const exam of exams) {
      await sendReminderEmail(
        exam.user_email,
        exam.exam_name,
        exam.expected_admit_card_date,
        exam.for_whom
      );

      await pool.query(
        `UPDATE exam_entries SET reminder_sent = true WHERE id = $1`,
        [exam.id]
      );
    }

    return NextResponse.json({ success: true, sent: exams.length });
  } catch (err) {
    console.error("CRON ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
