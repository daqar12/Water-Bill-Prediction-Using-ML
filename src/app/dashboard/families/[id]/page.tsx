"use client";

import React from "react";
import {
    ChevronLeft,
    Phone,
    MapPin,
    Calendar,
    CreditCard,
    Clock,
    Heart,
    GraduationCap,
    HeartPulse,
    Eye,
    Users,
    Plus,
    Building,
    ExternalLink,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Child {
    id: number;
    name: string;
    age: number;
    gender: string;
    school: string;
    photo: string;
    status: string;
    health: string;
}

interface Family {
    id: string;
    motherName: string;
    phone: string;
    photo: string;
    address: string;
    district: string;
    village: string;
    notes: string;
    registrationDate: string;
    children: Child[];
    aidHistory: any[];
}

// Collection of families (In a real app, this would be an API fetch)
const allFamilies: Record<string, Family> = {
    "FAM-001": {
        id: "FAM-001",
        motherName: "Sacdiyo Duraan Ali",
        phone: "0615551234",
        photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop",
        address: "Maka Al-Mukarama Road, House #45",
        district: "Hodan District",
        village: "Banaadir",
        notes: "Family displaced from Lower Shabelle in 2022. Requires monthly food package and medical assistance for the youngest child.",
        registrationDate: "2024-01-15",
        children: [
            { id: 101, name: "Maxamed Jamac Xasan", age: 8, gender: "Male", school: "Al-Nur Primary", photo: "https://i.pravatar.cc/150?u=101", status: "Active", health: "Good" },
            { id: 102, name: "Xamdi Jamac Xasan", age: 6, gender: "Female", school: "Al-Nur Primary", photo: "https://i.pravatar.cc/150?u=102", status: "Active", health: "Asthma" },
            { id: 103, name: "Farah Jamac Xasan", age: 10, gender: "Male", school: "Al-Nur Primary", photo: "https://i.pravatar.cc/150?u=103", status: "Pending", health: "Good" },
        ],
        aidHistory: [
            { id: 1, type: "Food Basket", date: "2024-03-01", value: "$45", status: "Delivered" },
            { id: 2, type: "Medical Checkup", date: "2024-02-15", value: "$30", status: "Completed" },
        ]
    },
    "FAM-002": {
        id: "FAM-002",
        motherName: "Khadijo Xasan Bulle",
        phone: "+252 61 478 2393",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
        address: "Kaxda District, Sector 4",
        district: "Kaxda",
        village: "Banaadir",
        notes: "Single mother with 4 kids. Newly registered in the system.",
        registrationDate: "2024-02-10",
        children: [
            { id: 104, name: "Xamdi Ismail Maxamed", age: 6, gender: "Female", school: "Jamhuriya University", photo: "https://i.pravatar.cc/150?u=104", status: "Active", health: "Good" },
        ],
        aidHistory: [
            { id: 1, type: "Startup Kit", date: "2024-02-12", value: "$100", status: "Delivered" },
        ]
    }
};

export default function FamilyProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const fam: Family = allFamilies[resolvedParams.id] || allFamilies["FAM-001"]; // Fallback to FAM-001 if id not found

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/orphans">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-xl">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                            Family Record
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">Household management for {fam.motherName}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xs uppercase tracking-widest">
                        Export Dossier
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 rounded-xl font-bold text-xs uppercase tracking-widest px-6 shadow-lg shadow-primary/20">
                        Update Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Side: Mother Card */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-[32px]">
                        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/20 dark:to-slate-800" />
                        <CardContent className="px-6 pb-8 -mt-16 text-center">
                            <div className="relative inline-block">
                                <img
                                    src={fam.photo}
                                    alt={fam.motherName}
                                    className="w-32 h-32 rounded-[2rem] object-cover mx-auto ring-8 ring-white dark:ring-slate-900 shadow-xl"
                                />
                                <div className="absolute bottom-1 right-1 bg-success text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-900">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="mt-6 text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{fam.motherName}</h3>
                            <p className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Head of Household</p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-primary">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-slate-400 font-black uppercase">Phone</p>
                                        <p className="font-bold text-slate-800 dark:text-slate-100">{fam.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-primary">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-slate-400 font-black uppercase">Location</p>
                                        <p className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{fam.district}, {fam.village}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-primary">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-slate-400 font-black uppercase">Registered On</p>
                                        <p className="font-bold text-slate-800 dark:text-slate-100">{fam.registrationDate}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[32px] border-none shadow-xl shadow-slate-100 dark:shadow-none bg-white dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Guardian ID</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <span className="font-mono text-xl font-black text-primary">{fam.id}</span>
                                <ExternalLink className="w-5 h-5 text-primary opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main: Children and History */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-8 bg-primary rounded-[32px] text-white shadow-2xl shadow-primary/20 overflow-hidden relative group">
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                            <h4 className="text-primary-foreground/60 font-black uppercase text-[10px] tracking-[0.2em] mb-2">Total Dependents</h4>
                            <p className="text-5xl font-black tracking-tighter">{fam.children.length}</p>
                            <Users className="w-16 h-16 text-white/10 absolute right-8 top-8" />
                        </div>
                        <div className="p-8 bg-slate-900 rounded-[32px] text-white shadow-2xl shadow-slate-900/20 overflow-hidden relative group">
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                            <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mb-2">Active Support</h4>
                            <p className="text-5xl font-black tracking-tighter">{fam.children.filter(c => c.status === 'Active').length}</p>
                            <Heart className="w-16 h-16 text-white/10 absolute right-8 top-8" />
                        </div>
                    </div>

                    <Card className="rounded-[32px] border-none shadow-lg bg-white dark:bg-slate-900 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between px-8 py-6 border-b dark:border-slate-800">
                            <CardTitle className="text-lg font-black uppercase tracking-tight text-slate-800 dark:text-white">Registered Children</CardTitle>
                            <Button variant="ghost" className="text-primary font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary/5">
                                Add Dependent
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] bg-slate-50/50 dark:bg-slate-800/20 border-b dark:border-slate-800">
                                        <tr>
                                            <th className="px-8 py-5">Record</th>
                                            <th className="px-8 py-5">Age/Gender</th>
                                            <th className="px-8 py-5">Education</th>
                                            <th className="px-8 py-5">Health</th>
                                            <th className="px-8 py-5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
                                        {fam.children.map(child => (
                                            <tr key={child.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={child.photo}
                                                            alt={child.name}
                                                            className="w-12 h-12 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform"
                                                        />
                                                        <div>
                                                            <p className="font-black text-slate-900 dark:text-white">{child.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase">ID #{child.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="font-bold text-slate-700 dark:text-slate-300">{child.age} Years</p>
                                                    <p className="text-[10px] font-black uppercase text-slate-400">{child.gender}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl w-fit border border-slate-100 dark:border-slate-700">
                                                        <Building className="w-3.5 h-3.5 text-primary" />
                                                        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">{child.school}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={cn(
                                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                        child.health === 'Good' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    )}>
                                                        {child.health === 'Good' ? 'Healthy' : child.health}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <Link href={`/dashboard/orphans/${child.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all">
                                                            <Eye className="w-5 h-5" />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[32px] border-none shadow-lg bg-white dark:bg-slate-900 overflow-hidden">
                        <CardHeader className="px-8 py-6 border-b dark:border-slate-800">
                            <CardTitle className="text-lg font-black uppercase tracking-tight text-slate-800 dark:text-white">Household Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    "{fam.notes}"
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
