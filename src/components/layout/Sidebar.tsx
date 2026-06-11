"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    HeartHandshake,
    HandCoins,
    Calendar,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    GraduationCap,
    FolderOpen,
    UserRound,
    UsersRound,
    Gauge,
    BrainCircuit,
    CreditCard,
    Receipt
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Customers", icon: UsersRound, href: "/dashboard/customers" },
    { name: "Meter Readings", icon: Gauge, href: "/dashboard/Meter" },
    { name: "ML Predictions", icon: BrainCircuit, href: "/dashboard/predictions" },
    { name: "Payments", icon: CreditCard, href: "/dashboard/Payments" },
    { name: "Billing", icon: Receipt, href: "/dashboard/billing" },
    { name: "Users", icon: Users, href: "/dashboard/users" },
    { name: "Reports", icon: FileText, href: "/dashboard/reports" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="relative flex flex-col bg-card border-r transition-all duration-300 ease-in-out h-screen w-64"
        >
            <div className="flex items-center justify-between p-6 h-20 border-b">
                <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-xl text-primary">Water Prediction ML</span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <button
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
