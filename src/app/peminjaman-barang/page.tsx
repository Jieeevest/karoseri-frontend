"use client";
import useSWR from "swr";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define a fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PeminjamanBarang() {
  // Use SWR to fetch data from the endpoint
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/peminjaman-barang`,
    fetcher
  );

  // Handle loading and error states
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Peminjaman Barang</CardTitle>
            <CardDescription>
              Manage your borrowed items and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[50px] sm:table-cell">
                    #
                  </TableHead>
                  <TableHead className="w-[150px]">
                    Tanggal Peminjaman
                  </TableHead>
                  <TableHead className="w-[150px]">
                    Tanggal Pengembalian
                  </TableHead>
                  <TableHead className="w-[120px]">Kode Barang</TableHead>
                  <TableHead className="w-[200px]">Nama Barang</TableHead>
                  <TableHead className="w-[100px]">Jumlah</TableHead>
                  <TableHead className="w-[150px]">Nama Peminjam</TableHead>
                  <TableHead className="w-[250px]">Keterangan</TableHead>
                  <TableHead className="w-[100px]">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.data.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.tanggal_peminjaman}
                    </TableCell>
                    <TableCell>{item.tanggal_pengembalian}</TableCell>
                    <TableCell>{item.kode_barang}</TableCell>
                    <TableCell>{item.nama_barang}</TableCell>
                    <TableCell>{item.jumlah}</TableCell>
                    <TableCell>{item.nama_peminjam}</TableCell>
                    <TableCell>{item.keterangan || "-"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
