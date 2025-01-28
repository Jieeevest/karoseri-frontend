"use client";
import { useEffect, useState } from "react";
import { Login } from "@/components/molecules";
import { useUser } from "@/data/useUser";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Assuming you have a loader icon (or similar from ShadCN)

export default function Home() {
  const router = useRouter();
  const { data: user, isLoading } = useUser(); // Assuming `isLoading` is part of the `useUser` hook
  const [loading, setLoading] = useState(true);

  // Handle redirect if user is authenticated
  useEffect(() => {
    if (user !== undefined) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Handle loading state
  useEffect(() => {
    if (!isLoading && user === undefined) {
      setLoading(false); // Once loading is finished and no user, show login
    }
  }, [isLoading, user]);

  // If the user is logged in, redirect immediately and don't render the page
  if (user !== undefined) {
    return null;
  }

  // If still loading, show a loading screen with ShadCN's UI spinner
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
          <span className="ml-4">Loading...</span>
        </div>
      </main>
    );
  }

  // Once loading is finished and no user found, render Login
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <Login />
    </main>
  );
}
