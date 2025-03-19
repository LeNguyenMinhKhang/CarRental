"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const RevenuePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    // Dữ liệu mẫu giao dịch
    const fakeTransactions = [
      { id: 1, customer: "Nguyễn Văn A", car: "Toyota Vios", amount: 500000, date: "2025-03-01" },
      { id: 2, customer: "Trần Thị B", car: "Honda Civic", amount: 700000, date: "2025-03-05" },
      { id: 3, customer: "Lê Văn C", car: "Ford Ranger", amount: 1200000, date: "2025-03-10" },
      { id: 4, customer: "Phạm Văn D", car: "Mazda 3", amount: 800000, date: "2025-03-12" },
    ];

    setTransactions(fakeTransactions);
    setTotalRevenue(fakeTransactions.reduce((sum, tx) => sum + tx.amount, 0));

    // Dữ liệu doanh thu theo tháng
    const fakeMonthlyRevenue = [
      { month: "Jan", revenue: 10000000 },
      { month: "Feb", revenue: 12000000 },
      { month: "Mar", revenue: 9000000 },
      { month: "Apr", revenue: 15000000 },
      { month: "May", revenue: 17000000 },
    ];
    setMonthlyRevenue(fakeMonthlyRevenue);
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Báo cáo doanh thu</h1>

        {/* Tổng doanh thu */}
        <Card className="p-4 mb-6">
          <CardContent>
            <h2 className="text-lg font-semibold">Tổng doanh thu</h2>
            <p className="text-2xl text-blue-600 font-bold">
              {totalRevenue.toLocaleString("vi-VN")} VND
            </p>
          </CardContent>
        </Card>

        {/* Biểu đồ doanh thu */}
        <Card className="p-4 mb-6">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Danh sách giao dịch */}
        <Card className="p-4">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Lịch sử giao dịch</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Khách hàng</th>
                  <th className="p-2 text-left">Xe thuê</th>
                  <th className="p-2 text-right">Số tiền</th>
                  <th className="p-2 text-right">Ngày thuê</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t">
                    <td className="p-2">{tx.customer}</td>
                    <td className="p-2">{tx.car}</td>
                    <td className="p-2 text-right">{tx.amount.toLocaleString("vi-VN")} VND</td>
                    <td className="p-2 text-right">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenuePage;
