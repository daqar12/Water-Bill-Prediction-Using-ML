"use client";

import { use } from "react";
import Link from "next/link";
import {
    ChevronLeft, Edit, MapPin, Calendar,
    BookOpen, HeartPulse, HeartHandshake, FileText,
    School, Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Collection of orphans (In a real app, this would be an API fetch)
const allOrphans: Record<string, any> = {
    "101": {
        id: "101",
        name: "Maxamed Jamac Xasan",
        age: 8,
        gender: "Male",
        location: "Hodan",
        phone: "+252 61 123 4567",
        school: "Al-Nur Primary",
        status: "Active",
        photo: "https://i.pravatar.cc/150?u=101",
        guardian: "Sacdiyo Duraan Ali",
        dob: "2016",
        notes: "Maxamed is a bright student who loves math. He lives with his mother in Hodan district."
    },
    "102": {
        id: "102",
        name: "Xamdi Jamac Xasan",
        age: 6,
        gender: "Female",
        location: "Hodan",
        phone: "+252 61 123 4567",
        school: "Al-Nur Primary",
        status: "Active",
        photo: "https://i.pravatar.cc/150?u=102",
        guardian: "Sacdiyo Duraan Ali",
        dob: "2018",
        notes: "Xamdi is very active and loves drawing. She is currently in grade 1."
    },
    "103": {
        id: "103",
        name: "Farah Jamac Xasan",
        age: 10,
        gender: "Male",
        location: "Hodan",
        phone: "+252 61 123 4567",
        school: "Al-Nur Primary",
        status: "Pending",
        photo: "https://i.pravatar.cc/150?u=103",
        guardian: "Sacdiyo Duraan Ali",
        dob: "2014",
        notes: "Farah is the eldest in the family and helps his mother with chores."
    },
    "104": {
        id: "104",
        name: "Xamdi Ismail Maxamed",
        age: 6,
        gender: "Female",
        location: "Kaxda",
        phone: "+252 61 478 2393",
        school: "Jamhuriya University",
        status: "Active",
        photo: "https://i.pravatar.cc/150?u=104",
        guardian: "Khadijo Xasan Bulle",
        dob: "2018",
        notes: "Xamdi newly joined the school and is showing great potential."
    }
};

export default function OrphanProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const orphan = allOrphans[id] || allOrphans["101"]; // Fallback to 101

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/orphans">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                            Orphan Profile
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Viewing details for ID: #{orphan.id}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900 text-slate-600">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </Button>
                    <Button className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Card & Quick Info */}
                <div className="col-span-1 space-y-6">
                    <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800">
                        <div className="h-24 bg-primary/20 bg-gradient-to-r from-primary/30 to-primary/10"></div>
                        <CardContent className="pt-0 relative px-6 pb-6">
                            <div className="absolute -top-12 left-6 rounded-full p-1 bg-white dark:bg-slate-900 shadow-sm inline-block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={orphan.photo}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 dark:border-slate-900"
                                />
                            </div>
                            <div className="mt-14 mb-4">
                                <h3 className="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 leading-none">
                                    {orphan.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={cn(
                                        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider",
                                        orphan.status === 'Active' ? 'bg-success/10 text-success' : 'bg-amber-100 text-amber-700'
                                    )}>
                                        {orphan.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mt-6">
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span>{orphan.location}, Banaadir</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span>{orphan.age} Years Old (DOB: {orphan.dob})</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <HeartPulse className="w-4 h-4 text-slate-400" />
                                    <span>Healthy</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <HeartHandshake className="w-5 h-5 text-primary" />
                                Sponsor Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sponsor Name</p>
                                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-1">John Doe (UK)</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Start Date</p>
                                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-1">Jan 12, 2024</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Monthly Amount</p>
                                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-1 text-primary text-xl">$50.00</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Tabs/Details */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Detailed Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Full Name</p>
                                    <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{orphan.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Gender</p>
                                    <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{orphan.gender}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Guardian Name</p>
                                    <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{orphan.guardian} (Mother)</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Guardian Contact</p>
                                    <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{orphan.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">School Name</p>
                                    <p className="mt-1 font-medium flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                        <School className="w-4 h-4 text-slate-400" /> {orphan.school}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Grade / Level</p>
                                    <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">Grade {orphan.age > 7 ? orphan.age - 5 : 1}</p>
                                </div>
                            </div>

                            <hr className="my-6 border-slate-100 dark:border-slate-800" />

                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-2">Background Notes</p>
                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                    {orphan.notes}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Documents</CardTitle>
                            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs bg-white dark:bg-slate-900">
                                <BookOpen className="w-3 h-3" />
                                Upload File
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-slate-900 dark:text-slate-100">Birth Certificate.pdf</p>
                                            <p className="text-xs text-slate-500">1.2 MB • Uploaded Jan 10, 2024</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-slate-900 dark:text-slate-100">School Report Card.jpg</p>
                                            <p className="text-xs text-slate-500">850 KB • Uploaded Dec 20, 2023</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
