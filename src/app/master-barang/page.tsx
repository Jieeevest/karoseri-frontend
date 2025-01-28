/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { File, Loader2, MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/molecules/common"; // Import Pagination component

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface InventoryItem {
  id: number;
  name: string;
  amount: number;
  type: string;
  category: string;
  location: string;
  minimumStock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Karyawan() {
  const [dataList, setDataList] = useState<InventoryItem[]>([]);
  const [filter, setFilter] = useState({
    limit: 5,
    sort_by: "ASC",
    page: 1,
    totalPages: 1,
  });

  const {
    data: inventoryData,
    isLoading,
    error,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inventory?limit=${filter.limit}&sort_by=${filter.sort_by}&page=${filter.page}`,
    fetcher
  );

  useEffect(() => {
    if (inventoryData?.data) {
      const mappedData: InventoryItem[] = inventoryData.data.map(
        (item: any) => ({
          id: item.id,
          name: item.name || "N/A",
          amount: item.amount || 0,
          type: item.type?.name || "Unknown Type",
          category: item.category?.name || "Unknown Category",
          location: item.location?.name || "Unknown Location",
          minimumStock: item.minimumStock || 0,
          description: item.description || "No description available",
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })
      );

      setDataList(mappedData);
    }
  }, [inventoryData]);

  const handlePageSize = (value: number) => {
    setFilter((prev) => ({ ...prev, limit: value }));
  };

  const handlePageChange = (newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  // const handleSetFilter = (value: string, type: string) => {
  //   setFilter((prev) => ({ ...prev, [type]: value }));
  // };

  // const toggleFilterCard = () => {
  //   setShowFilter((prev) => !prev);
  // };

  if (error) return <div className="text-red-500">Failed to load data.</div>;

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-8">
        {/* Top Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="default"
              size="lg"
              className="h-7 gap-1 text-sm"
              // onClick={toggleFilterCard}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Barang</span>
            </Button>
            <Button size="lg" variant="default" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>

        {/* Data Table Card */}
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle>Data Barang</CardTitle>
            <CardDescription>
              Data Barang dikelola dan informasi lengkap dapat diperoleh di
              sini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[50px] sm:table-cell">
                    #
                  </TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Satuan</TableHead>
                  <TableHead>Lokasi Simpan</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>
                    <span className="sr-only">Aksi</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataList?.length > 0 && !isLoading ? (
                  dataList?.map((item: InventoryItem, index: number) => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{item?.id}</TableCell>
                      <TableCell className="font-medium">
                        {item?.name}
                      </TableCell>
                      <TableCell>{item?.amount}</TableCell>
                      <TableCell>{item?.type}</TableCell>
                      <TableCell>{item?.location}</TableCell>
                      <TableCell>{item?.description}</TableCell>
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
                  ))
                ) : isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-10 justify-center text-center text-sm py-5"
                    >
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin h-8 w-8 text-slate-800" />
                        <span className="ml-4">Loading data...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-10 justify-center font-semibold text-center text-sm py-5"
                    >
                      No data available at the moment. Please check back later
                      or adjust your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination Component - Positioned at the bottom */}
        <div className="">
          <Pagination
            currentPage={filter?.page}
            totalPages={Math.ceil(filter?.totalPages / filter?.limit)} // Ensure totalPages is an integer
            pageSize={filter?.limit}
            setPageSize={handlePageSize}
            setCurrentPage={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}
