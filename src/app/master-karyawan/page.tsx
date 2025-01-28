"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/molecules/common"; // Import the Pagination component

// Define a fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Karyawan() {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    limit: 5,
    sort_by: "ASC",
    page: 1,
    totalPages: 0,
    kode_barang: "",
    nama_barang: "",
    lokasi_simpan: "",
  });

  // Use SWR to fetch data from the endpoint
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/karyawan?limit=${filter.limit}&sort_by=${filter.sort_by}&page=${filter.page}`,
    fetcher
  );
  useEffect(() => {
    if (data !== undefined) {
      setFilter({ ...filter, totalPages: data?.total });
    }
  }, [data]);

  // Handle loading and error states
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handleSetFilter = (value: any, type: string) => {
    setFilter({ ...filter, [type]: value });
  };

  const toggleFilterCard = () => {
    setShowFilter(!showFilter);
  };

  const handlePageSize = (value: number) => {
    setFilter({ ...filter, limit: value });
  };

  const handlePageChange = (newPage: number) => {
    setFilter({ ...filter, page: newPage });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex">
          <div className="flex gap-2">
            <Button
              variant="default"
              size="lg"
              className="h-7 gap-1 text-sm"
              onClick={toggleFilterCard}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Karyawan</span>
            </Button>
            <Button size="lg" variant="default" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
          <div className="ml-auto">
            {/* Pagination Component */}
            <Pagination
              currentPage={filter.page}
              totalPages={filter.totalPages / filter.limit}
              pageSize={filter.limit}
              setPageSize={handlePageSize}
              setCurrentPage={handlePageChange}
            />
          </div>
        </div>

        {/* Data Table Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Data Karyawan</CardTitle>
            <CardDescription>
              Data Karyawan dikelola dan informasi lengkap dapat diperoleh di
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
                  <TableHead>No Telp</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Alamat</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.data.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.kode_karyawan}
                    </TableCell>
                    <TableCell className="font-medium">
                      {" "}
                      {item.nama_karyawan}
                    </TableCell>
                    <TableCell>{item.telepon}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.alamat}</TableCell>
                    <TableCell>{item.jabatan}</TableCell>
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
