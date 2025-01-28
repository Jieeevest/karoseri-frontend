import useSWR from "swr";

const fetcher = async (url: string) => {
  const token = localStorage.getItem("jwt"); // Get the token from localStorage

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export const useUser = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
    fetcher
  );
  return {
    data,
    isLoading,
    error,
  };
};
