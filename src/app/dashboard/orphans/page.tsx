"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Eye,
    Edit3,
    Users,
    MapPin,
    School,
    Phone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const dummyOrphans = [
    {
        id: "101",
        name: "Maxamed Jamac Xasan",
        age: 8,
        gender: "Male",
        location: "Hodan",
        phone: "+252 61 123 4567",
        school: "Al-Nur Primary",
        status: "Active",
        photo: "https://i.pravatar.cc/150?u=101",
        mother: "Sacdiyo Duraan Ali",
        motherId: "FAM-001"
    },
    {
        id: "102",
        name: "Xamdi Jamac Xasan",
        age: 6,
        gender: "Female",
        location: "Hodan",
        phone: "+252 61 123 4567",
        school: "Al-Nur Primary",
        status: "Active",
        photo: "https://i.pravatar.cc/150?u=102",
        mother: "Sacdiyo Duraan Ali",
        motherId: "FAM-001"
    },
    {
        id: "103",
        name: "Farah Jamac Xasan",
        age: 10,
        gender: "Male",
        location: "Hodan",
        phone: "+252 61 123 4567",
        school: "Al-Nur Primary",
        status: "Pending",
        photo: "https://i.pravatar.cc/150?u=103",
        mother: "Sacdiyo Duraan Ali",
        motherId: "FAM-001"
    },
    {
        id: "104",
        name: "Xamdi ismail maxamed",
        age: 6,
        gender: "Female",
        location: "kaxda",
        phone: "+252 61 478 2393",
        school: "Jamhuriya university",
        status: "Active",
        photo: "https://i.pravatar.cc/150?u=104",
        mother: "khadijo xasan bulle",
        motherId: "FAM-002"
    }
];

export default function OrphansTable() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrphans = dummyOrphans.filter(orphan =>
        orphan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orphan.id.includes(searchTerm) ||
        orphan.mother.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1e293b] tracking-tight">Orphans & Family</h1>
                    <p className="text-slate-500 text-[13px] mt-0.5">Manage orphan profiles and sponsorship details.</p>
                </div>
                <Link href="/dashboard/orphans/add">
                    <Button className="bg-[#137d74] hover:bg-[#0e615a] text-white rounded-lg px-5 py-2 flex gap-2 text-sm font-semibold shadow-sm transition-all">
                        <Plus className="w-4 h-4" /> Add Orphan
                    </Button>
                </Link>
            </div>

            {/* Content Card */}
            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-4 border-b dark:border-slate-800 bg-white dark:bg-slate-900">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#137d74]/20 text-[13px]"
                                placeholder="Search by name, mother or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="text-[10px] text-slate-400 uppercase font-bold tracking-wider bg-slate-50/50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Photo</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Age / Gender</th>
                                    <th className="px-6 py-3">Location</th>
                                    <th className="px-6 py-3">Phone</th>
                                    <th className="px-6 py-3">School</th>
                                    <th className="px-6 py-3">Mother / Guardian</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredOrphans.map((orphan) => (
                                    <tr key={orphan.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors group">
                                        <td className="px-6 py-3.5 font-medium text-slate-700 text-[12px]">{orphan.id}</td>
                                        <td className="px-6 py-3.5">
                                            <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                                                <img src={orphan.photo} alt={orphan.name} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 font-bold text-slate-800 dark:text-slate-100 text-[14px]">{orphan.name}</td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex flex-col">
                                                <span className="text-[#137d74] dark:text-emerald-400 font-bold text-[12px]">
                                                    {orphan.age} Years
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-medium uppercase">{orphan.gender}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[13px]">
                                                <MapPin className="w-3 h-3 text-red-400" />
                                                {orphan.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[12px]">
                                                <Phone className="w-3 h-3 text-[#137d74]" />
                                                {orphan.phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-[12px] max-w-[140px] truncate">
                                                <School className="w-3 h-3 text-blue-400 flex-shrink-0" />
                                                {orphan.school}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-[13px] font-semibold text-slate-700 dark:text-slate-300">{orphan.mother}</td>
                                        <td className="px-6 py-3.5 text-center">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase py-0.5 px-2.5 rounded-full ring-1 ring-inset",
                                                orphan.status === 'Active'
                                                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                    : 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/20 dark:text-amber-400'
                                            )}>
                                                {orphan.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-0.5">
                                                <Link href={`/dashboard/orphans/${orphan.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-[#137d74]" title="View">
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/orphans/${orphan.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-amber-600" title="Edit">
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/families/${orphan.motherId}`}>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-blue-600" title="Family View">
                                                        <Users className="w-3.5 h-3.5" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-900/10">
                        <p className="text-[11px] font-medium text-slate-500">
                            Showing <span className="text-[#137d74] font-bold">1 to {filteredOrphans.length}</span> of {dummyOrphans.length} entries
                        </p>
                        <div className="flex gap-1.5">
                            <Button variant="outline" className="h-8 px-3 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 disabled:opacity-50" disabled>Previous</Button>
                            <Button variant="outline" className="h-8 px-3 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-50">Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}