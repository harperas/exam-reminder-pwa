"use client";

import { useSession } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    exam_name: "",
    application_date: "",
    expected_admit_card_date: "",
    for_whom: "self",
  });

  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    const res = await fetch(`/api/exams?user_email=${session.user.email}`);
    const data = await res.json();
    if (data.success) {
      setEntries(data.data);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: session.user.email,
        ...form,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Exam Saved!");
      setForm({
        exam_name: "",
        application_date: "",
        expected_admit_card_date: "",
        for_whom: "self",
      });
      loadEntries(); // refresh list
    } else {
      alert("Failed to save exam: " + data.error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadEntries();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Add Exam Reminder</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          name="exam_name"
          placeholder="Exam Name"
          value={form.exam_name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="application_date"
          value={form.application_date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="expected_admit_card_date"
          value={form.expected_admit_card_date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="for_whom"
          placeholder="For (self/family name)"
          value={form.for_whom}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded">
          Save Exam
        </button>
      </form>

      <h2 className="text-lg font-bold mb-2">Your Exams</h2>
      {entries.length === 0 ? (
        <p>No exams added yet.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="border rounded p-3 bg-white shadow-sm"
            >
              <strong>{entry.exam_name}</strong> — {entry.for_whom}
              <br />
              Applied: {entry.application_date} | Admit Card:{" "}
              {entry.expected_admit_card_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
