import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await currentUser();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {user?.firstName || user?.username || "Guest"}</h1>
      <p className="text-gray-600">This is your account. Booking & order history will appear here.</p>
    </div>
  );
}