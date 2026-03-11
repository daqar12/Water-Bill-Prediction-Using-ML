"use client";

import { useState } from "react";
import { Search, Plus, FileText, Download, Trash2, Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const dummyDocs = [
    { id: 1, title: "Annual Report 2023", category: "Reports", size: "2.5 MB", uploader: "Admin", date: "2024-01-10", type: "pdf" },
    { id: 2, title: "NGO License Certificate", category: "Legal", size: "1.2 MB", uploader: "Admin", date: "2023-05-15", type: "pdf" },
    { id: 3, title: "Orphan Sponsorship Forms", category: "Templates", size: "540 KB", uploader: "Jane Smith", date: "2024-02-20", type: "docx" },
    { id: 4, title: "Q1 Financial Statement", category: "Finance", size: "3.1 MB", uploader: "Admin", date: "2024-04-05", type: "xlsx" },
];

export default function DocumentsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                        Document Center
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Manage files, legal documents, reports, and templates.</p>
                </div>
                <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    Upload File
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1 space-y-4">
                    <Card>
                        <CardContent className="p-4 space-y-2">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4">Categories</h3>
                            {["All Documents", "Legal", "Finance", "Reports", "Templates", "Orphans"].map((cat, idx) => (
                                <button
                                    key={idx}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${idx === 0
                                            ? 'bg-primary text-white font-medium'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <Folder className="w-4 h-4" />
                                    {cat}
                                </button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1 md:col-span-3">
                    <Card>
                        <CardContent className="p-0">
                            <div className="p-4 border-b dark:border-slate-800">
                                <div className="relative max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search documents by title or category..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">File Name</th>
                                            <th scope="col" className="px-6 py-4">Category</th>
                                            <th scope="col" className="px-6 py-4">Size</th>
                                            <th scope="col" className="px-6 py-4">Uploaded By</th>
                                            <th scope="col" className="px-6 py-4">Date</th>
                                            <th scope="col" className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dummyDocs.map((doc) => (
                                            <tr key={doc.id} className="border-b last:border-0 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${doc.type === 'pdf' ? 'bg-red-100 text-red-600' :
                                                                doc.type === 'xlsx' ? 'bg-green-100 text-green-600' :
                                                                    'bg-blue-100 text-blue-600'
                                                            }`}>
                                                            <FileText className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium text-slate-900 dark:text-slate-100">{doc.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                        {doc.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 text-xs">
                                                    {doc.size}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    {doc.uploader}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 text-xs">
                                                    {doc.date}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-danger">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
