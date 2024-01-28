import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number) => {
    setExpandedRowIndex((prevIndex) =>
      prevIndex === rowIndex ? null : rowIndex
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <React.Fragment key={row.id}>
                <TableRow
                  className="cursor-pointer"
                  onClick={() => handleRowClick(rowIndex)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {expandedRowIndex === rowIndex && (
                  <TableRow>
                    <TableCell colSpan={table.getVisibleFlatColumns().length}>
                      <div className="relative p-4">
                        <div
                          onClick={() => handleRowClick(rowIndex)}
                          className="absolute top-0 right-0 m-2 cursor-pointer"
                        >
                          X
                        </div>
                        <p>Expanded row</p>
                        <p>Expanded row</p>
                        <p>Expanded row</p>
                        <p>Expanded row</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Hurray, all tasks are done for now!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
