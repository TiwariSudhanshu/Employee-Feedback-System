"use client";

import { useEffect, useState } from "react";
import AdminSection from "../components/AdminSection";
import EmployeeSection from "../components/EmployeeSection";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);

  if (role === null) {
    return <div>Loading or not authorized 🫥</div>;
  }

  return (
    <div >
      <h1>Dashboard</h1>
      {role === "Admin" ? <AdminSection /> : <EmployeeSection />}
    </div>
  );
}
