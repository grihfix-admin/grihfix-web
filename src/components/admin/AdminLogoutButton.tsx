"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/Button";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (!res.ok) {
        toast.error("Unable to logout. Try again.");
        return;
      }
      toast.success("Logged out");
      router.replace("/admin/login");
    } catch (error) {
      console.error("[Admin] logout failed:", error);
      toast.error("Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="ghost" className="text-sm font-semibold text-slate-900" onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out…" : "Logout"}
    </Button>
  );
}

