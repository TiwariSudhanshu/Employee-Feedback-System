"use client";

import AdminSection from "../components/AdminSection";
import EmployeeSection from "../components/EmployeeSection";

export default function DashboardPage() {

  const user = localStorage.getItem("user");
  const role = user ? JSON.parse(user).role : null;
  if (!role) {
    return <div>Loading or not authorized 🫥</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      {role === "Admin" ? (
        <AdminSection />
      ) : (
        <EmployeeSection />
      )}
    </div>
  );
}
