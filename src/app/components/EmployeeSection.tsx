"use client";

import { useState } from "react";

export default function EmployeeSection() {
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addFeedback = async (feedbackText: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const employeeId = userData ? JSON.parse(userData)._id : null;
    setMessage("");

    try {
      const response = await fetch("/api/addFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedbackText, employeeId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add feedback");

      setMessage("✅ Feedback submitted successfully!");
      setFeedbackText("");
    } catch (error) {
      console.error("Error adding feedback:", error);
      setMessage("❌ Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-600">Employee Panel</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="mb-6 text-gray-700">
        Submit your thoughts, suggestions or concerns below 👇
      </p>

      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Write your feedback..."
        rows={5}
        className="w-full border rounded-md p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={() => addFeedback(feedbackText)}
        disabled={loading || feedbackText.trim() === ""}
        className={`px-4 py-2 text-white rounded ${
          loading || feedbackText.trim() === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
