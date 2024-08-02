import React, { useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: {};
  searchKey?: string;
  total: number;
  translate?: any;
  pagination: {
    pageSize: number;
    pageIndex: number;
  };
  setPagination: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  searchKey,
  total,
  pagination,
  setPagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    pageCount: total / pagination.pageSize,
    meta: meta,
    manualPagination: true,
  });

  useEffect(() => {
    console.log(table, data, table?.getRowModel()?.rows, "table");
  }, [table, data]);

  return (
    <div className="rounded-md overflow-x-auto w-full">
      <table className="table table-sm text-sm">
        <thead className="bg-white py-2">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id} className="border-b-0">
              {headerGroup.headers.map((header: any) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="py-2 text-sm text-black border-b-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="rounded-md">
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows.map((row: any) => {
              return (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(`border-none my-2`)}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <td
                      key={cell.id}
                      className={cn("py-4 my-2", {
                        "bg-green-100": row.original.type === "BUY",
                        "bg-red-100": row.original.type === "SELL",
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
