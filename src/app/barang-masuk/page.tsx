"use client";
import useSWR from "swr";
import { MoreHorizontal, ListFilter, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useState } from "react";

// Define a fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BarangMasuk() {
  const [filter, setFilter] = useState({
    limit: 5,
    sort_by: "asc",
  });
  // Use SWR to fetch data from the endpoint
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/barang-masuk?limit=${filter?.limit}&sort_by=${filter?.sort_by}`,
    fetcher
  );

  // Handle loading and error states
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handleSetFilter = (value: any) => {
    setFilter({ ...filter, limit: value });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex">
          <div>
            <Button variant="outline" size="lg" className="h-7 gap-1 text-sm">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Filter</span>
            </Button>
          </div>
          <div className="flex ml-auto items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Limit</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Show data as</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={Boolean(filter?.limit === 5)}
                  onCheckedChange={() => handleSetFilter(5)}
                >
                  5
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={Boolean(filter?.limit === 10)}
                  onCheckedChange={() => handleSetFilter(10)}
                >
                  10
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={Boolean(filter?.limit === 25)}
                  onCheckedChange={() => handleSetFilter(25)}
                >
                  25
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Ascending (ASC)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Descending (DESC)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="lg" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[50px] sm:table-cell">
                    #
                  </TableHead>
                  <TableHead className="w-[150px]">Tanggal Masuk</TableHead>
                  <TableHead className="w-[100px]">No Slip</TableHead>
                  <TableHead className="w-[200px]">Nama Barang</TableHead>
                  <TableHead className="w-[100px]">Jumlah</TableHead>
                  <TableHead className="w-[80px]">Satuan</TableHead>
                  <TableHead className="w-[150px]">Kategori</TableHead>
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
                      {item.tanggal_masuk}
                    </TableCell>
                    <TableCell>{item.no_slip}</TableCell>
                    <TableCell>
                      <b>{item.kode_barang}:</b> {item.nama_barang}
                    </TableCell>
                    <TableCell>{item.jumlah}</TableCell>
                    <TableCell>{item.satuan}</TableCell>
                    <TableCell>{item.kategori}</TableCell>
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
