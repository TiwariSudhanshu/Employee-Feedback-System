"use client";

import { useEffect, useState } from "react";

interface Feedback {
  _id: string;
  feedbackText: string;
  employeeId: {
    username: string;
    email: string;
  };
}

export default function AdminSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/feedbacks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch");

      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/feedbacks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <p className="mb-6 text-gray-600">Manage employee feedbacks here.</p>

        {loading ? (
          <p className="text-gray-500">Loading feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedbacks found.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <p className="text-gray-800 font-medium">
                  {fb.employeeId.username} ({fb.employeeId.email})
                </p>
                <p className="text-gray-700 mt-1">{fb.feedbackText}</p>
                <button
                  onClick={() => deleteFeedback(fb._id)}
                  className="mt-3 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
