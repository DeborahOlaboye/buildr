"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTotalPages } from "@/lib/utils";
import type { RowsPerPageOption } from "@/types";

interface PaginationProps {
  currentPage: number;
  rowsPerPage: RowsPerPageOption;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: RowsPerPageOption) => void;
}

const ROWS_OPTIONS: RowsPerPageOption[] = [10, 25, 50];

export default function Pagination({
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  const totalPages = getTotalPages(totalItems, rowsPerPage);
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  function buildPageWindows(): (number | "…")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
      {/* Left: rows info */}
      <p className="text-sm text-muted-foreground order-2 sm:order-1">
        Showing{" "}
        <span className="font-medium text-foreground">{startItem}</span>–
        <span className="font-medium text-foreground">{endItem}</span> of{" "}
        <span className="font-medium text-foreground">
          {totalItems.toLocaleString()}
        </span>
      </p>

      {/* Center: page buttons */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {buildPageWindows().map((page, idx) =>
          page === "…" ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-1 text-sm text-muted-foreground select-none"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              className="h-8 w-8 text-xs"
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Right: rows per page */}
      <div className="flex items-center gap-2 order-3">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Rows
        </span>
        <Select
          value={String(rowsPerPage)}
          onValueChange={(v) =>
            onRowsPerPageChange(Number(v) as RowsPerPageOption)
          }
        >
          <SelectTrigger className="h-8 w-16 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROWS_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={String(opt)} className="text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
