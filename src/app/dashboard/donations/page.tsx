"use client";

import { useState } from "react";
import { Search, Plus, Filter, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const dummyDonations = [
    { id: "DON-001", donor: "John Doe", amount: "$500", currency: "USD", date: "2024-03-10", method: "Credit Card", project: "Orphan Sponsorship", status: "Completed" },
    { id: "DON-002", donor: "Sarah Smith", amount: "£200", currency: "GBP", date: "2024-03-09", method: "PayPal", project: "Water Well", status: "Completed" },
    { id: "DON-003", donor: "Anonymous", amount: "$150", currency: "USD", date: "2024-03-08", method: "Bank Transfer", project: "General Fund", status: "Pending" },
    { id: "DON-004", donor: "Ali Foundation", amount: "$5,000", currency: "USD", date: "2024-03-07", method: "Bank Transfer", project: "Ramadan Relief Form", status: "Completed" },
];

export default function DonationsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                        Donations
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Track financial contributions and donor transactions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        Add Donation
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="p-4 border-b dark:border-slate-800 flex justify-between gap-4 items-center">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search transactions..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                        <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Transaction ID</th>
                                    <th scope="col" className="px-6 py-4">Donor</th>
                                    <th scope="col" className="px-6 py-4">Amount</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4">Method</th>
                                    <th scope="col" className="px-6 py-4">Project</th>
                                    <th scope="col" className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyDonations.map((donation) => (
                                    <tr key={donation.id} className="border-b last:border-0 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500">
                                            {donation.id}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                            {donation.donor}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">
                                            {donation.amount}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {donation.date}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">
                                            {donation.method}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {donation.project}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${donation.status === 'Completed'
                                                    ? 'bg-success/10 text-success'
                                                    : 'bg-secondary/10 text-secondary'
                                                }`}>
                                                {donation.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
