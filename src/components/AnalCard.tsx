import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    children: ReactNode;
}

function StatCard({ title, value, children }: StatCardProps) {
    return (
        <div className="border-2 border-accent bg-[#292825] hover:bg-[#33322f] p-6 w-full lg:w-1/4 rounded-2xl flex justify-between items-center transition-colors">
            <div className="flex gap-1">
                <h3 className="text-lg font-semibold">{title}:</h3>
                <p className="text-xl font-bold">{value}</p>
            </div>

            <div className="border-2 border-accent p-3 rounded-2xl bg-background">
                {children}
            </div>
        </div>
    );
}

export default StatCard;