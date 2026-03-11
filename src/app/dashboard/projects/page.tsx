"use client";

import { useState } from "react";
import { Search, Plus, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const dummyProjects = [
    { id: "PRJ-101", name: "Al-Huda School Construction", budget: "$150,000", start: "2023-01-10", end: "2024-06-30", status: "In Progress", manager: "Ahmad Duale" },
    { id: "PRJ-102", name: "Bora Water Well Expansion", budget: "$45,000", start: "2024-02-01", end: "2024-12-31", status: "Planning", manager: "Zahra Ali" },
    { id: "PRJ-103", name: "Mobile Clinic Q4", budget: "$80,000", start: "2023-10-01", end: "2023-12-31", status: "Completed", manager: "Dr. Hassan" },
];

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                        Projects
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Manage infrastructure, health, and education projects.</p>
                </div>
                <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    New Project
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
                                placeholder="Search projects..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Project Name</th>
                                    <th scope="col" className="px-6 py-4">Budget</th>
                                    <th scope="col" className="px-6 py-4">Timeline</th>
                                    <th scope="col" className="px-6 py-4">Manager</th>
                                    <th scope="col" className="px-6 py-4">Status</th>
                                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyProjects.map((proj) => (
                                    <tr key={proj.id} className="border-b last:border-0 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                            <div className="flex flex-col">
                                                <span>{proj.name}</span>
                                                <span className="text-xs text-slate-400 font-mono mt-0.5">{proj.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">
                                            {proj.budget}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            <div className="text-xs space-y-1">
                                                <div><span className="font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px]">Start:</span> {proj.start}</div>
                                                <div><span className="font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px]">End:</span> {proj.end}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {proj.manager}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${proj.status === 'Completed' ? 'bg-success/10 text-success' :
                                                    proj.status === 'In Progress' ? 'bg-primary/10 text-primary' :
                                                        'bg-secondary/10 text-secondary'
                                                }`}>
                                                {proj.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                                                <MoreVertical className="w-4 h-4" />
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
