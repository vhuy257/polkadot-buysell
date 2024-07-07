"use client";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate, formatCurrency } from "./format";

export type Notes = {
  id: number;
  dot_amount: number;
  dot_price: number;
  usdt_amount: number;
  usdt_price: number;
  total_vnd: number;
  created_at: string;
  type: "BUY" | "SELL";
};

export const columnBuyTable: ColumnDef<Notes>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <span>ID</span>,
    cell: ({ row }) => <span># {row.index + 1}</span>,
  },
  {
    accessorKey: "dot_amount",
    header: ({ column }) => <span>DOT Amount</span>,
    cell: ({ row }) => (
      <span className="max-w-[200px] block truncate">
        {row.original.dot_amount}
      </span>
    ),
  },
  {
    accessorKey: "dot_price",
    header: ({ column }) => <span>DOT Price</span>,
    cell: ({ row }) => {
      return row.original.dot_price ? (
        <span className="flex text-green-500 items-center gap-2">
          {row.original.dot_price}
        </span>
      ) : null;
    },
  },
  {
    accessorKey: "usdt_amount",
    header: ({ column }) => <span>USDT Amount</span>,
    cell: ({ row }) => {
      return row.original.usdt_amount ? (
        <span className="flex text-green-500 items-center gap-2">
          {row.original.usdt_amount}
        </span>
      ) : null;
    },
  },
  {
    accessorKey: "usdt_price",
    header: ({ column }) => <span>USDT Price</span>,
    cell: ({ row }) => {
      return row.original.usdt_price ? (
        <span className="flex text-green-500 items-center gap-2">
          {formatCurrency(row.original.usdt_price)}
        </span>
      ) : null;
    },
  },
  {
    accessorKey: "total_vnd",
    header: ({ column }) => <span>Total VND</span>,
    cell: ({ row }) => {
      return row.original.total_vnd ? (
        <span className="flex text-green-500 items-center gap-2">
          {formatCurrency(row.original.total_vnd)}
        </span>
      ) : null;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => <span>Type</span>,
    cell: ({ row }) => {
      return row.original.type === "BUY" ? (
        <span className="badge badge-success">
          Buy
        </span>
      ) : <span className="badge badge-error">Sell</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <span>Date</span>,
    cell: ({ row }) => <span>{formatDate(row.original.created_at)}</span>,
  },
];
