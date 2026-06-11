"use client";

import React from "react";
import { Search, Bell, Moon, Sun, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    // Capitalize first letter of the route for the titl;

    return (
        <header className="h-20 bg-card border-b flex items-center justify-between px-8 sticky top-0 z-10 w-full shadow-sm">


            <div className="flex flex-1 items-left justify-end gap-6">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-full border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    />
                </div>

                <div className="flex items-center gap-4 border-l pl-6 dark:border-slate-800">
                    <button className="p-2 text-slate-500 hover:text-primary transition-colors hover:bg-slate-100 rounded-full dark:hover:bg-slate-800">
                        <Sun className="w-5 h-5" />
                        <span className="sr-only">Toggle theme</span>
                    </button>

                    <button className="p-2 text-slate-500 hover:text-primary transition-colors hover:bg-slate-100 rounded-full dark:hover:bg-slate-800 relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
                        <span className="sr-only">Notifications</span>
                    </button>

                    <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors border dark:border-slate-800 dark:hover:bg-slate-800">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                            JD
                        </div>
                        <div className="flex flex-col items-start hidden sm:flex">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-none">John Doe</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Admin</span>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}
