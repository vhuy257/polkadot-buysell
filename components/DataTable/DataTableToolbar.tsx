"use client"
import { Table } from "@tanstack/react-table"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
}

export function DataTableToolbar<TData>({
  table,
  searchKey
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        <input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  )
}