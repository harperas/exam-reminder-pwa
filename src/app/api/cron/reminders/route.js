import pool from "../../../lib/db";
import { sendReminderEmail } from "../../../lib/mailer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + 3); // Reminder 3 days before

    const dateString = targetDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    const res = await pool.query(
      `SELECT * FROM exam_entries WHERE expected_admit_card_date = $1 AND reminder_sent = false`,
      [dateString]
    );

    const examsToRemind = res.rows;

    for (const exam of examsToRemind) {
      await sendReminderEmail(
        exam.user_email,
        exam.exam_name,
        exam.expected_admit_card_date,
        exam.for_whom
      );

      // Mark as reminder_sent
      await pool.query(
        `UPDATE exam_entries SET reminder_sent = true WHERE id = $1`,
        [exam.id]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Reminders sent: ${examsToRemind.length}`,
    });
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
