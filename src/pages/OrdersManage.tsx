import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from 'lucide-react';
import ReusableTable from "../components/DashTable"
import useOcount from "@/hooks/useOcount";

export default function ProductsManage() {
    const nav = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState<OrderItem[] | null>(null);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useOcount();

    const filteredData =
        data?.filter((item) => {
        const value = search.trim().toLowerCase();

        return (
            item.user_name.toLowerCase().includes(value) ||
            item.user_number.toString().includes(value) ||
            item.id.toLowerCase().includes(value)
        );
        }) ?? [];

    if (isLoading) return <p className="text-white">Loading...</p>;

    return (
        <div className="text-text">
            <div className="mb-7 flex items-center justify-between">
                <h2 className="text-xl font-bold">Orders Manage</h2>

                <button onClick={() => nav("/dashboard")} className="cursor-pointer text-accent">
                <ArrowRight className="h-9 w-9" />
                </button>
            </div>

            <div className="mb-5 flex items-center gap-2 rounded-2xl border border-accent p-4">
                <input
                className="w-full rounded border border-dashed border-white p-2 outline-none"
                type="text"
                placeholder="Search by phone number, user name or order ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />

                <Search className="h-10 w-10 text-accent" />
            </div>

        <ReusableTable
            data={filteredData}
            columns={[
            {
                header: "ID",
                accessor: "id",
                render: (id) => id.slice(0, 8),
            },
            {
                header: "Created At",
                accessor: "created_at",
                render: (created_at) => created_at.slice(0, 10),
            },
            {
                header: "Name",
                accessor: "user_name",
            },
            {
                header: "Number",
                accessor: "user_number",
            },
            {
                header: "Address",
                accessor: "user_add",
            },
            {
                header: "Order",
                accessor: "order",
                render: (order) => (
                <button
                    className="w-15 cursor-pointer rounded-2xl bg-accent p-2 text-xs font-bold text-black hover:bg-accent/75"
                    onClick={() => setSelectedOrder(order as OrderItem[])}
                >
                    Show Order
                </button>
                ),
            },
            ]}
        />

        <OrderInfo
            selectedOrder={selectedOrder}
            onClose={() => setSelectedOrder(null)}
        />
        </div>
    );
}


interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
}

type OrderInfoProps = {
    selectedOrder: OrderItem[] | null;
    onClose: () => void;
};

function OrderInfo({
    selectedOrder,
    onClose,
}: OrderInfoProps) {
    if (!selectedOrder) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className=" max-h-160 overflow-y-scroll w-[90%] max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                    Order Details
                </h2>

                <button
                    onClick={onClose}
                    className="rounded-lg px-3 py-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-3">
            {selectedOrder.map((item, index) => (
                <div key={index} className="rounded-lg border border-zinc-700 bg-zinc-800 p-4">
                <h3 className="text-lg font-semibold text-white">
                    {item.product_name}
                </h3>

                <div className="mt-2 flex justify-between text-sm text-zinc-400">
                    <span>Qty: {item.quantity}</span>
                    <span>{item.price} EGP</span>
                </div>
                </div>
            ))}
            </div>

            <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-accent py-2 font-semibold text-black transition hover:opacity-90"
            >
            Close
            </button>
        </div>
        </div>
    );
}