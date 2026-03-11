"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Download, FileText, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const distributionData = [
    { name: "Orphan Sponsorship", value: 45000 },
    { name: "Emergency Food", value: 25000 },
    { name: "Water Wells", value: 15000 },
    { name: "Education", value: 10000 },
];

const COLORS = ["#0F766E", "#F59E0B", "#3B82F6", "#EC4899"];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                        Reports & Analytics
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Export customized reports and data summaries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <Filter className="w-4 h-4" />
                        Jan 1 - Mar 31, 2024
                    </Button>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <Download className="w-4 h-4" />
                        Export All
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Generated Reports</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                "Q1 2024 Financial Summary",
                                "Orphan Sponsorship Status Report",
                                "Ramadan Campaign ROI",
                                "March 2024 Donor Activity",
                                "Beneficiary Demographics",
                            ].map((report, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg group hover:border-primary/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                        <span className="font-medium text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">{report}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-primary h-8 w-8">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <Card className="h-[420px]">
                        <CardHeader>
                            <CardTitle className="text-lg">Funds Allocation by Sector</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={distributionData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {distributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: any) => value !== undefined && value !== null ? `$${value.toLocaleString()}` : ''}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
