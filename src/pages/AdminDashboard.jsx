import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminAnalytics } from "../redux/purchase/purchaseSlice";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  BarChart3,
  Medal,
  Globe,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Search,
  Download,
} from "lucide-react";

import { cn } from "../lib/utils";

/**
 * Enterprise Admin Analytics Dashboard
 *
 * Features:
 * - Product Search Filter
 * - Download Filtered Results CSV
 * - KPI Analytics
 * - Inventory Monitoring
 * - Responsive UI
 */

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [period, setPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { analytics, loading } = useSelector(
    (state) => state.purchase
  );

  useEffect(() => {
    dispatch(fetchAdminAnalytics(period));
  }, [dispatch, period]);

  // Filter Products
  const filteredProducts = useMemo(() => {
    return (
      analytics?.bestSellingProducts?.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [analytics, searchTerm]);

  // Download CSV
  const handleDownload = () => {
    if (!filteredProducts.length) return;

    const headers = [
      "Product Name",
      "Revenue",
      "Units Sold",
      "Quantity",
    ];

    const rows = filteredProducts.map((product) => [
      product.name,
      product.revenue,
      product.unitsSold,
      product.quantity,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "analytics-report.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val) =>
    (val || 0).toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(analytics?.summary?.totalSales),
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Net Profit",
      value: formatCurrency(analytics?.summary?.totalProfit),
      change: "+8.2%",
      trend: "up",
      icon: <TrendingUp size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Total Loss",
      value: formatCurrency(analytics?.summary?.totalLoss),
      change: "-2.4%",
      trend: "down",
      icon: <TrendingDown size={20} />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      title: "Total Orders",
      value: (
        analytics?.totalTransactions || 0
      ).toLocaleString(),
      change: "+18",
      trend: "up",
      icon: <Package size={20} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
  ];

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 gap-4">
        <div className="relative flex h-16 w-16">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>

          <span className="relative inline-flex rounded-full h-16 w-16 bg-indigo-600"></span>
        </div>

        <p className="text-slate-500 font-bold tracking-tight animate-pulse uppercase text-xs">
          Syncing Analytics...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50/50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <BarChart3 className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Executive Dashboard
            </h1>

            <p className="text-slate-500 text-sm font-medium">
              Monitoring sales velocity and inventory health
            </p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
          {["all", "daily", "weekly", "monthly"].map(
            (t) => (
              <button
                key={t}
                onClick={() => setPeriod(t)}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-widest",
                  period === t
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
              >
                {t === "all" ? "Lifetime" : t}
              </button>
            )
          )}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              "bg-white p-6 rounded-3xl border shadow-sm transition-all hover:shadow-xl hover:-translate-y-1",
              stat.border
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={cn(
                  "p-3 rounded-2xl",
                  stat.bg,
                  stat.color
                )}
              >
                {stat.icon}
              </div>

              <div
                className={cn(
                  "flex items-center gap-0.5 text-[10px] font-black px-2 py-1 rounded-lg",
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                )}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}

                {stat.change}
              </div>
            </div>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              {stat.title}
            </p>

            <h2 className="text-2xl font-black text-slate-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* TABLE + SIDEBAR */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* TABLE */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4 md:items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Medal
                  className="text-amber-500"
                  size={20}
                />
              </div>

              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Top Performance Products
              </h3>
            </div>

            {/* Search + Download */}
            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Download */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-semibold"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] bg-slate-50/50">
        <th className="py-4 px-6 text-left font-black">
          Rank
        </th>

        <th className="text-left font-black">
          Product
        </th>

        <th className="text-left font-black">
          Sales Performance
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-slate-50">
      {filteredProducts.map((product, index) => {
        return (
          <tr
            key={index}
            className="group hover:bg-slate-50/80 transition-colors"
          >
            {/* Rank */}
            <td className="py-5 px-6">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs bg-slate-100 text-slate-600">
                {index + 1}
              </span>
            </td>

            {/* Product */}
            <td>
              <div className="flex items-center gap-4">
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/150"
                  }
                  alt={product.name}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm"
                />

                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    {product.name}
                  </p>

                  <p className="text-[10px] font-bold text-emerald-600">
                    ${product.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </td>

            {/* Sales Performance */}
            <td>
              <div className="flex flex-col gap-1.5 min-w-[120px]">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                  <span>
                    {product.unitsSold} units
                  </span>

                  <span>
                    {Math.round(
                      (product.unitsSold /
                        filteredProducts[0]
                          ?.unitsSold) *
                        100
                    )}
                    %
                  </span>
                </div>

                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                    style={{
                      width: `${
                        (product.unitsSold /
                          filteredProducts[0]
                            ?.unitsSold) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>

  {!filteredProducts.length && (
    <div className="py-24 text-center">
      <Globe
        className="text-slate-200 mx-auto mb-4"
        size={48}
      />

      <h4 className="text-slate-900 font-bold">
        No Records Found
      </h4>

      <p className="text-slate-400 text-sm mt-1">
        Try another product name.
      </p>
    </div>
  )}
</div>

        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <AlertCircle
                  className="text-rose-500"
                  size={20}
                />
                Inventory Alerts
              </h3>

              <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-lg">
                Action Required
              </span>
            </div>

            <div className="space-y-4">
              {analytics?.bestSellingProducts
                ?.filter((p) => p.quantity < 10)
                .map((product, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        className="w-12 h-12 rounded-xl object-cover"
                        alt=""
                      />

                      <div
                        className={cn(
                          "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center",
                          product.quantity <= 0
                            ? "bg-rose-500"
                            : "bg-amber-500"
                        )}
                      >
                        {product.quantity <= 0 ? (
                          <AlertTriangle
                            size={8}
                            className="text-white"
                          />
                        ) : (
                          <Layers
                            size={8}
                            className="text-white"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {product.name}
                      </p>

                      <p
                        className={cn(
                          "text-[10px] font-black uppercase tracking-wider",
                          product.quantity <= 0
                            ? "text-rose-600"
                            : "text-amber-600"
                        )}
                      >
                        {product.quantity <= 0
                          ? "OUT OF STOCK"
                          : `${product.quantity} Units Left`}
                      </p>
                    </div>

                    <button className="p-2 text-slate-400">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}

              {(!analytics?.bestSellingProducts ||
                analytics.bestSellingProducts.filter(
                  (p) => p.quantity < 10
                ).length === 0) && (
                <div className="text-center py-10">
                  <CheckCircle2
                    className="text-emerald-400 mx-auto mb-2"
                    size={32}
                  />

                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Inventory Healthy
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SYSTEM CARD */}
          <div className="bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-200 text-white">
            <div className="flex items-center gap-2 mb-4 opacity-60">
              <Clock size={16} />

              <span className="text-[10px] font-black uppercase tracking-widest">
                System Update
              </span>
            </div>

            <h4 className="text-lg font-black leading-tight">
              Stock Replenishment
            </h4>

            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Automated reports are ready. Review low-stock
              items and initiate purchase orders.
            </p>

            <button
              onClick={handleDownload}
              className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/20 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={14} />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
