"use client";
import { Users, HeartHandshake, HandCoins, Briefcase } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useEffect, useState } from "react";

const donationData = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 2000 },
  { name: "Apr", total: 2780 },
  { name: "May", total: 1890 },
  { name: "Jun", total: 2390 },
  { name: "Jul", total: 3490 },
];

const reliefData = [
  { name: "Week 1", beneficiaries: 120 },
  { name: "Week 2", beneficiaries: 250 },
  { name: "Week 3", beneficiaries: 180 },
  { name: "Week 4", beneficiaries: 300 },
];

const recentActivities = [
  {
    id: 1,
    action: "New Orphan Registered",
    subject: "Aisha Mohamed",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    action: "Donation Received",
    subject: "$500 from John Doe",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: 3,
    action: "Relief Distributed",
    subject: "Food packages in Region A",
    time: "1 day ago",
    status: "pending",
  },
  {
    id: 4,
    action: "New Sponsor Joined",
    subject: "Sarah Smith",
    time: "2 days ago",
    status: "completed",
  },
];

export default function DashboardPage() {
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [customerOverview, setCustomerOverview] = useState<
    { name: string; total: number }[]
  >([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/customers/overview")
      .then((res) => res.json())
      .then((data) => setCustomerOverview(data))
      .catch(() => setCustomerOverview([]));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/all")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.total))
      .catch(() => setTotalUsers(0));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/customers/all")
      .then((res) => res.json())
      .then((data) => setTotalCustomers(data.total))
      .catch(() => setTotalCustomers(0));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-heading text--800 dark:text-slate-100">
          Dashboard Overview
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={
            totalCustomers === null ? "..." : totalCustomers.toLocaleString()
          }
          icon={<Users className="w-6 h-6" />}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value={totalUsers === null ? "..." : totalUsers.toLocaleString()}
          icon={<HeartHandshake className="w-6 h-6" />}
          trend={{ value: "5%", isPositive: true }}
        />
        <StatCard
          title="Total Donations"
          value="$52,000"
          icon={<HandCoins className="w-6 h-6" />}
          trend={{ value: "18%", isPositive: true }}
        />
        <StatCard
          title="Active Projects"
          value="12"
          icon={<Briefcase className="w-6 h-6" />}
          trend={{ value: "2", isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerOverview}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b" }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    // Recharts formatter signature: (value, name, props) => [formattedValue, label]
                    formatter={(value: any, name?: string | number) => [
                      String(value).toLocaleString(),
                      String(name ?? "Customers"),
                    ]}
                  />
                  <Bar dataKey="total" fill="#0F766E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 rounded-tr-lg text-right"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b last:border-0 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {activity.subject}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {activity.time}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          activity.status === "completed"
                            ? "bg-success/10 text-success"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        {activity.status}
                      </span>
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
