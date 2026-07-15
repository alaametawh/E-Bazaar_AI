import React from "react";

type Column<T> = {
    header: string;
    accessor: keyof T;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type ReusableTableProps<T> = {
    data: T[];
    columns: Column<T>[];
};

export default function ReusableTable<T extends object>({
    data,
    columns,
    }: ReusableTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-xl border border-zinc-700 bg-zinc-900">
        <table className=" overflow-x-scroll min-w-full text-sm text-zinc-200">
            <thead className="bg-zinc-800">
            <tr>
                {columns.map((column) => (
                <th
                    key={String(column.accessor)}
                    className="border-b border-zinc-700 px-6 py-4 text-left font-semibold text-zinc-100"
                >
                    {column.header}
                </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {data.map((row, rowIndex) => (
                <tr
                key={rowIndex}
                className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/70"
                >
                {columns.map((column) => (
                    <td
                    key={String(column.accessor)}
                    className="px-6 py-4 text-zinc-300"
                    >
                    {column.render
                        ? column.render(row[column.accessor], row)
                        : String(row[column.accessor])}
                    </td>
                ))}
                </tr>
            ))}

            {data.length === 0 && (
                <tr>
                <td
                    colSpan={columns.length}
                    className="py-8 text-center text-zinc-500"
                >
                    No data found.
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
}