import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bypass = false
  ) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            bypass ? { bypass: true } : { email: username, password }
          ),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { token } = data.data;

      // Store the token in local storage
      localStorage.setItem("jwt", token);

      // Handle successful login
      router.push("/dashboard");
    } catch (err) {
      setError(bypass ? "Bypass login failed" : "Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-sm bg-white shadow-lg shadow-slate-400 rounded-lg p-6 border-[1px]">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Login</h1>
            <p className="text-sm text-gray-600">
              Masukkan Username dan Password di bawah untuk masuk ke dalam akun
            </p>
          </div>
          {/* <form onSubmit={(e) => handleSubmit(e, true)}> */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="off"
              required
              className="mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Lupa password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="****"
              className="mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e, true)}
            className="w-full"
          >
            Masuk
          </Button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
