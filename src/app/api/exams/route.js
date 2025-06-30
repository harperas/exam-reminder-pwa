import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      user_email,
      exam_name,
      application_date,
      expected_admit_card_date,
      for_whom,
    } = body;

    const query = `
      INSERT INTO exam_entries 
        (user_email, exam_name, application_date, expected_admit_card_date, for_whom) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [
      user_email,
      exam_name,
      application_date,
      expected_admit_card_date,
      for_whom,
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_email = searchParams.get("user_email");

    const result = await pool.query(
      "SELECT * FROM exam_entries WHERE user_email = $1 ORDER BY expected_admit_card_date",
      [user_email]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
