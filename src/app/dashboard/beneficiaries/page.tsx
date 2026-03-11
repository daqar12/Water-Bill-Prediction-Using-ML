"use client";

import { useState } from "react";
import { Search, Plus, MapPin, PackageOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const dummyBeneficiaries = [
    { id: 1, name: "Ali Yussuf", phone: "+252 61 123 4567", location: "Mogadishu", type: "Food Aid", date: "2024-03-01" },
    { id: 2, name: "Halima Abdi", phone: "+252 61 234 5678", location: "Garowe", type: "Water Supply", date: "2024-02-15" },
    { id: 3, name: "Ibrahim Hassan", phone: "+252 61 345 6789", location: "Beledweyne", type: "Emergency Relief", date: "2023-11-10" },
    { id: 4, name: "Safiya Jama", phone: "+252 61 456 7890", location: "Kismayo", type: "Education Material", date: "2024-01-20" },
];

export default function BeneficiariesPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                        Beneficiaries
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Manage individuals receiving aid and assistance.</p>
                </div>
                <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    Add Beneficiary
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="p-4 border-b dark:border-slate-800">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search beneficiaries..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Phone</th>
                                    <th scope="col" className="px-6 py-4">Location</th>
                                    <th scope="col" className="px-6 py-4">Aid Type</th>
                                    <th scope="col" className="px-6 py-4">Date Subscribed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyBeneficiaries.map((beneficiary) => (
                                    <tr key={beneficiary.id} className="border-b last:border-0 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                            {beneficiary.name}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                            {beneficiary.phone}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                {beneficiary.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-2">
                                                <PackageOpen className="w-4 h-4 text-primary" />
                                                <span className="font-medium">{beneficiary.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {beneficiary.date}
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
