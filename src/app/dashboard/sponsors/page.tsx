"use client";

import { useState } from "react";
import { Search, Plus, Mail, Phone, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const dummySponsors = [
    { id: 1, name: "John Doe", country: "United Kingdom", email: "john@example.com", phone: "+44 123 456 789", totalDonations: "$5,200", orphans: 3 },
    { id: 2, name: "Sarah Smith", country: "United States", email: "sarah@example.com", phone: "+1 234 567 890", totalDonations: "$1,800", orphans: 1 },
    { id: 3, name: "Ali Foundation", country: "UAE", email: "info@alifoundation.ae", phone: "+971 50 123 4567", totalDonations: "$15,000", orphans: 10 },
    { id: 4, name: "Fatima Noor", country: "Canada", email: "fatima.noor@example.com", phone: "+1 416 123 4567", totalDonations: "$3,400", orphans: 2 },
];

export default function SponsorsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                        Sponsors & Donors
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Manage donor profiles and sponsorship details.</p>
                </div>
                <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    Add Sponsor
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
                                placeholder="Search sponsors by name or email..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Contact</th>
                                    <th scope="col" className="px-6 py-4">Country</th>
                                    <th scope="col" className="px-6 py-4 text-center">Sponsored Orphans</th>
                                    <th scope="col" className="px-6 py-4 text-right">Total Donations</th>
                                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummySponsors.map((sponsor) => (
                                    <tr key={sponsor.id} className="border-b last:border-0 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                            {sponsor.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    <span className="text-xs">{sponsor.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    <span className="text-xs">{sponsor.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {sponsor.country}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                                                {sponsor.orphans}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-100">
                                            {sponsor.totalDonations}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
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
