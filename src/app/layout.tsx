"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import DashboardLayout from "@/components/molecules/layout";
import { useUser } from "@/data/useUser";
import { Loader2 } from "lucide-react"; // Assuming you use ShadCN's spinner or similar UI component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: user, isLoading, error: userError } = useUser();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (isLoading) {
      setLoading(true); // While fetching user data
    } else {
      setLoading(false); // Once the loading is done
    }

    // Redirect if there is no user or there is an error
    if (!isLoading && (user === undefined || userError === true)) {
      router.push("/");
    }
  }, [user, userError, isLoading, router]);

  if (loading) {
    // Show loading spinner while data is being fetched
    return (
      <html lang="en">
        <body className={inter.className}>
          <main className="flex min-h-screen items-center justify-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
            <span className="ml-4">Loading...</span>
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {user === undefined ? (
          <div>{children}</div> // Show children directly if no user found
        ) : (
          <DashboardLayout
            title="Dashboard"
            description="Manage your subscriptions here"
            userDetails={user}
          >
            {children}
          </DashboardLayout> // Show dashboard layout if user is authenticated
        )}
      </body>
    </html>
  );
}
