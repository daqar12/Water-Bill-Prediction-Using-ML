"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Upload,
    Save,
    Plus,
    Trash2,
    User,
    Users,
    CheckCircle2,
    Circle,
    ArrowRight,
    ArrowLeft,
    Info
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ChildForm {
    id: string;
    name: string;
    age: string;
    gender: string;
    school: string;
    health: string;
    photo: string | null;
}

export default function AddFamilyPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Parent State
    const [parent, setParent] = useState({
        motherName: "",
        phone: "",
        address: "",
        district: "",
        notes: "",
        photo: null as string | null
    });

    // Children State
    const [children, setChildren] = useState<ChildForm[]>([
        { id: Math.random().toString(), name: "", age: "", gender: "", school: "", health: "Good", photo: null }
    ]);

    const handleAddChild = () => {
        setChildren([
            ...children,
            { id: Math.random().toString(), name: "", age: "", gender: "", school: "", health: "Good", photo: null }
        ]);
    };

    const handleRemoveChild = (id: string) => {
        if (children.length > 1) {
            setChildren(children.filter(c => c.id !== id));
        }
    };

    const updateChild = (id: string, field: keyof ChildForm, value: string) => {
        setChildren(children.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            router.push("/dashboard/orphans");
        }, 1500);
    };

    const nextStep = () => setStep(2);
    const prevStep = () => setStep(1);

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-20">
            {/* Header & Stepper */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/orphans">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-100">
                            Family Registration
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Register a mother and all her children in one go.
                        </p>
                    </div>
                </div>

                {/* Steps Indicator */}
                <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                        step === 1 ? "bg-white dark:bg-slate-900 text-primary shadow-sm" : "text-slate-500"
                    )}>
                        {step > 1 ? <CheckCircle2 className="w-4 h-4 text-success" /> : <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">1</span>}
                        Parent Info
                    </div>
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                        step === 2 ? "bg-white dark:bg-slate-900 text-primary shadow-sm" : "text-slate-500"
                    )}>
                        <span className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                            step === 2 ? "bg-primary/10 text-primary" : "bg-slate-200 dark:bg-slate-700"
                        )}>2</span>
                        Children Details
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Card className="lg:col-span-1">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Upload className="w-5 h-5 text-primary" />
                                            Mother's Photo
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden aspect-square flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 mb-4 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <User className="w-8 h-8" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Click to upload</p>
                                            <p className="text-xs text-slate-500 mt-2">Professional portrait for ID</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="lg:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Info className="w-5 h-5 text-primary" />
                                            Guardian Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mother Full Name *</label>
                                                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="Enter full name as per ID" value={parent.motherName} onChange={e => setParent({ ...parent, motherName: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number *</label>
                                                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="e.g. 061XXXXXXX" value={parent.phone} onChange={e => setParent({ ...parent, phone: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Village / District</label>
                                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="e.g. Hodan District" value={parent.district} onChange={e => setParent({ ...parent, district: e.target.value })} />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Home Address</label>
                                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="Specific house number or landmarks" value={parent.address} onChange={e => setParent({ ...parent, address: e.target.value })} />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Notes</label>
                                                <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="Family background, urgent needs, etc." value={parent.notes} onChange={e => setParent({ ...parent, notes: e.target.value })} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button type="button" onClick={nextStep} className="gap-2 px-8 min-w-[200px] shadow-lg shadow-primary/20 group">
                                    Next: Add Children
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="bg-primary/5 border border-primary/10 border-dashed rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-primary shadow-sm">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Adding children for:</p>
                                        <h4 className="text-lg font-bold text-slate-800 dark:text-white">{parent.motherName || "Unnamed Parent"}</h4>
                                    </div>
                                </div>
                                <Button type="button" onClick={handleAddChild} variant="outline" className="gap-2 bg-white dark:bg-slate-900 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                                    <Plus className="w-4 h-4" />
                                    Add Another Child
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {children.map((child, index) => (
                                    <Card key={child.id} className="relative overflow-hidden group border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[10px]">C{index + 1}</span>
                                                Child Details
                                            </CardTitle>
                                            {children.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveChild(child.id)} className="h-8 w-8 text-slate-400 hover:text-danger hover:bg-danger/5">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex gap-4">
                                                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all cursor-pointer bg-slate-50 dark:bg-slate-900/50">
                                                    <Upload className="w-6 h-6 mb-1" />
                                                    <span className="text-[10px] font-bold uppercase">Photo</span>
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Child Full Name *</label>
                                                        <input required type="text" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Full name" value={child.name} onChange={e => updateChild(child.id, 'name', e.target.value)} />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Age *</label>
                                                            <input required type="number" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Age" value={child.age} onChange={e => updateChild(child.id, 'age', e.target.value)} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Gender *</label>
                                                            <select required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" value={child.gender} onChange={e => updateChild(child.id, 'gender', e.target.value)}>
                                                                <option value="">Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3 pt-2">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Current School</label>
                                                    <input type="text" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Which school is the child attending?" value={child.school} onChange={e => updateChild(child.id, 'school', e.target.value)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Health Status</label>
                                                    <input type="text" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Conditions or regular treatments?" value={child.health} onChange={e => updateChild(child.id, 'health', e.target.value)} />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-10 border-t dark:border-slate-800">
                                <Button type="button" variant="ghost" onClick={prevStep} className="gap-2 text-slate-500">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Parent Info
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className="gap-2 px-10 min-w-[200px] shadow-lg shadow-success/20 bg-success hover:bg-success/90">
                                    {isSubmitting ? "Finalizing Registry..." : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Complete Registration
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
