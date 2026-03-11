"use client";

import { useState } from "react";
import { Search, Plus, MapPin, Users as UsersIcon, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const dummyCampaigns = [
    { id: "CMP-01", name: "Ramadan Food Drive 2024", location: "Mogadishu", type: "Food", beneficiaries: 5000, start: "2024-03-01", status: "Active" },
    { id: "CMP-02", name: "Clean Water Initiative", location: "Garowe", type: "Water", beneficiaries: 2000, start: "2024-01-15", status: "Active" },
    { id: "CMP-03", name: "Flood Emergency Relief", location: "Beledweyne", type: "Emergency", beneficiaries: 1500, start: "2023-11-05", status: "Completed" },
    { id: "CMP-04", name: "Winter Clothing Distribution", location: "Hargeisa", type: "Clothing", beneficiaries: 3000, start: "2023-12-01", status: "Completed" },
];

export default function CampaignsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                        Relief Campaigns
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Manage food, water, and emergency relief drives.</p>
                </div>
                <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    Create Campaign
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dummyCampaigns.map((camp) => (
                    <Card key={camp.id} className="hover:shadow-lg transition-all hover:border-primary/20 group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2.5 rounded-xl ${camp.type === 'Food' ? 'bg-orange-100 text-orange-600' :
                                        camp.type === 'Water' ? 'bg-blue-100 text-blue-600' :
                                            'bg-red-100 text-red-600'
                                    }`}>
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${camp.status === 'Active'
                                        ? 'bg-success/10 text-success'
                                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                    }`}>
                                    {camp.status}
                                </span>
                            </div>

                            <h3 className="font-bold font-heading text-lg text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                                {camp.name}
                            </h3>

                            <div className="space-y-2 mt-4">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <MapPin className="w-4 h-4" />
                                    {camp.location}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <UsersIcon className="w-4 h-4" />
                                    {camp.beneficiaries.toLocaleString()} Beneficiaries
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t dark:border-slate-800 flex justify-between items-center text-sm">
                                <span className="text-slate-400">Type: <strong className="text-slate-600 dark:text-slate-300 font-medium">{camp.type}</strong></span>
                                <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary/80">
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
