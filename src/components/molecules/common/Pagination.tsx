"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  setPageSize,
  setCurrentPage,
}: PaginationProps) => {
  const goToFirstPage = async () => {
    setCurrentPage(1);
  };
  const goToLastPage = async () => {
    setCurrentPage(totalPages);
  };
  const goToNextPage = async () => {
    setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = async () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className="flex flex-col items-center justify-end gap-2 space-x-2 sm:flex-row">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">
              Rows per page
            </p>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="bottom">
                {[5, 10, 25, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden h-8 w-12 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          >
            <div className="text-sm font-semibold px-5">First</div>
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="hidden h-8 w-12 p-0 lg:flex"
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          >
            {/* <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> */}
            <div className="text-sm font-semibold px-5">Last</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
