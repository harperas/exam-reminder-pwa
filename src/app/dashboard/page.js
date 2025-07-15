"use client";

import { useSession, signOut } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DatePicker, Input, Tabs } from "rsuite";
import CanvasBackgroundEffect from "../components/CanvasBackgroundEffect";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    exam_name: "",
    application_date: "",
    expected_admit_card_date: "",
    for_whom: "",
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

  const handleDateChange = (e, type) => {
    console.log(e, type, type.target.name, type.target.value);
    setForm((prev) => ({ ...prev, [type.target.name]: type.target.value }));
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
        for_whom: "",
      });
      loadEntries(); // refresh list
    } else {
      alert("Failed to save exam: " + data.error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    const res = await fetch("/api/exams", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        user_email: session.user.email,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Exam deleted!");
      loadEntries(); // refresh list
    } else {
      alert("Failed to delete: " + data.error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadEntries();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  console.log(form);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <main className=" relative bg-black min-h-screen w-full text-white pt-20 ">
      <CanvasBackgroundEffect />
      <div className="max-w-xl mx-auto">
        <h2 className=" text-center tracking-tight font-bold text-4xl mb-11 ">
          Exam Reminder App
        </h2>
        <Tabs
          defaultActiveKey="1"
          appearance="subtle"
          className=" [&_.rs-nav-item-active]:!font-bold [&_.rs-nav-item-active]:!text-white [&_.rs-nav-item]:!text-gray-400 "
        >
          <Tabs.Tab eventKey="1" title="User">
            <div className="p-6">
              <h1 className="text-2xl mb-4">Welcome, {session?.user?.name}</h1>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer "
              >
                Logout
              </button>
            </div>
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Add Exam">
            <div className=" p-4 ">
              <h1 className="text-xl font-semibold mb-4">Add Exam Reminder</h1>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mb-6"
              >
                <label htmlFor="exam_name">Exam name:</label>
                <input
                  type="text"
                  name="exam_name"
                  placeholder="Exam Name"
                  value={form.exam_name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <label htmlFor="application_date">
                  Application Applied Date:
                </label>
                <Input
                  type="date"
                  name="application_date"
                  value={form.application_date}
                  onChange={handleDateChange}
                  className="border p-2 rounded"
                  required
                />
                <label htmlFor="expected_admit_card_date">
                  Expected Admit Card Date:
                </label>
                <Input
                  type="date"
                  name="expected_admit_card_date"
                  value={form.expected_admit_card_date}
                  onChange={handleDateChange}
                  className="border p-2 rounded"
                  required
                />
                <label htmlFor="for_whom">For Whom (self/family name):</label>
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
            </div>
          </Tabs.Tab>
          <Tabs.Tab eventKey="3" title="View Exam">
            <div className=" p-4 ">
              <h2 className="text-lg font-bold mb-2">Your Exams</h2>
              {entries.length === 0 ? (
                <p>No exams added yet.</p>
              ) : (
                <ul className="space-y-4">
                  {entries.map((entry) => (
                    <li
                      key={entry.id}
                      className="border rounded-2xl p-3 bg-white/25 shadow-md"
                    >
                      <strong className=" text-lg leading-relaxed uppercase ">
                        {entry.exam_name}
                      </strong>{" "}
                      — {entry.for_whom}
                      <p>
                        <span className=" inline-block font-semibold mr-2 ">
                          Applied:
                        </span>
                        {entry.application_date}
                      </p>
                      <p>
                        <span className=" inline-block font-semibold mr-2 ">
                          Admit Card:
                        </span>
                        {entry.expected_admit_card_date}
                      </p>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="mt-3 inline-block text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Tabs.Tab>
        </Tabs>
      </div>
    </main>
  );
}
