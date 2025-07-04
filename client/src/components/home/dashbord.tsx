"use client";

import { useAuthStore } from "@/lib/stores/useAuthstore";
import { useGetExpenses, useGetTotalExpense } from "@/lib/stores/useExpence";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Fade,
  Grow,
  Zoom,
} from "@mui/material";
import { PieChart, pieArcLabelClasses, LineChart } from "@mui/x-charts";
import { Expenses } from "@/lib/stores/useExpence";
import { useGetBudget } from "@/lib/stores/useBudgetStore";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  AlertTriangle,
} from "lucide-react";
import { StatCardProps } from "@/lib/types";



function Dashboard() {
  const { user, checkAuth } = useAuthStore();
  const { data: totalamount } = useGetTotalExpense(user?.id);
  const { data: expences, isLoading } = useGetExpenses(user?.id);
  const [animationDelay, setAnimationDelay] = useState(0);
  console.info(animationDelay)

  const currentMonth = new Date().getMonth() + 1;
  const { data: budgets } = useGetBudget(user?.id, currentMonth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationDelay(100), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const totalexp = totalamount?._sum?.amount || 0;
  const balance = Number(budgets?.amount) - totalexp;

  const processCategoryData = (): {
    id: number;
    label: string;
    value: number;
  }[] => {
    const categoryTotals: { [key: string]: number } = {};

    expences?.forEach((expense: Expenses) => {
      const category = expense.category;
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += expense.amount || 0;
    });

    return Object.entries(categoryTotals).map(([label, value], id) => ({
      id,
      label,
      value,
    }));
  };

  const categoryData = processCategoryData();
  const monthNames = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const expenseValues = [1200, 1350, 1100, 1500, 1250, totalexp];

  const COLORS = [
    "#6366f1", // Indigo
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#ec4899", // Pink
    "#84cc16", // Lime
  ];

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    delay = 0,
    trend = null,
  }) => (
    <Grow in={true} timeout={1000 + delay}>
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${color} text-white shadow-xl rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
      >
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium opacity-90 uppercase tracking-wider">
              {title}
            </p>
            <Icon className="h-8 w-8 opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tight animate-pulse">
              {value}
            </h3>
            <div className="flex items-center gap-2">
              {trend && (
                <div
                  className={`flex items-center gap-1 text-sm ${
                    trend > 0 ? "text-green-200" : "text-red-200"
                  }`}
                >
                  {trend > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{Math.abs(trend)}%</span>
                </div>
              )}
              <p className="text-sm opacity-90">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </Grow>
  );

  return (
    <Container maxWidth="xl" className="max-w-7xl mx-auto px-4 py-2">
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Fade in={true} timeout={1000}>
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome back, {user?.username}
            </h2>
            <p className="text-gray-600 text-lg">
              Here&apos;s your financial overview
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={`₹${totalexp.toLocaleString()}`}
            subtitle={
              totalexp > (budgets?.amount || 0) / 2
                ? "Warning: High spending"
                : "Spending on track"
            }
            icon={Wallet}
            color={
              totalexp > (budgets?.amount || 0) / 2
                ? "from-red-500 to-red-600"
                : "from-blue-500 to-blue-600"
            }
            delay={0}
            trend={totalexp > 1200 ? 15 : -8}
          />

          <StatCard
            title="Monthly Budget"
            value={
              budgets ? `₹${budgets.amount.toLocaleString()}` : "No Budget"
            }
            subtitle={
              budgets
                ? `${((totalexp / Number(budgets.amount)) * 100).toFixed(
                    0
                  )}% of budget used`
                : "Add Budget"
            }
            icon={Target}
            color="from-green-500 to-green-600"
            delay={200}
            trend={budgets ? 5 : null}
          />

          <StatCard
            title="Remaining Balance"
            value={`₹${Number.isNaN(balance) ? 0 : balance.toLocaleString()}`}
            subtitle={
              balance < 0
                ? "Budget exceeded!"
                : `${(
                    (Number.isNaN(balance)
                      ? 0
                      : balance / Number(budgets?.amount || 1)) * 100
                  ).toFixed(0)}% remaining`
            }
            icon={balance < 0 ? AlertTriangle : TrendingUp}
            color={
              balance < 0
                ? "from-red-500 to-red-600"
                : "from-purple-500 to-purple-600"
            }
            delay={400}
            trend={balance < 0 ? -25 : 12}
          />
        </div>

        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={1200}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  className="flex items-center gap-2"
                >
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  Expenses by Category
                </Typography>
                <Box sx={{ height: 350, pt: 2 }}>
                  <PieChart
                    series={[
                      {
                        data: categoryData,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "rgba(255,255,255,0.3)",
                        },
                        arcLabel: (item) =>
                          `${item.label}: ${(
                            (item.value / totalexp) *
                            100
                          ).toFixed(0)}%`,
                        valueFormatter: (item) => `₹${item.value}`,
                        arcLabelMinAngle: 45,
                        innerRadius: 40,
                        outerRadius: 120,
                        paddingAngle: 3,
                        cornerRadius: 8,
                        startAngle: -90,
                        endAngle: 270,
                      },
                    ]}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: "white",
                        fontWeight: "bold",
                        fontSize: "12px",
                      },
                      height: 350,
                    }}
                    colors={COLORS}
                    margin={{ right: 5 }}
                    slotProps={{
                      legend: {
                        hidden: false,
                        labelStyle: { fill: "white" },
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={1400}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  className="flex items-center gap-2"
                >
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  Monthly Expense Trend
                </Typography>
                <Box sx={{ height: 350, pt: 2 }}>
                  <LineChart
                    xAxis={[
                      {
                        data: monthNames,
                        scaleType: "band",
                        tickLabelStyle: {
                          angle: 0,
                          textAnchor: "middle",
                          fill: "white",
                        },
                      },
                    ]}
                    series={[
                      {
                        data: expenseValues,
                        label: "Expenses",
                        area: true,
                        showMark: true,
                        color: "#ffffff",
                        valueFormatter: (value) => `₹${value}`,
                        curve: "catmullRom",
                      },
                    ]}
                    height={350}
                    margin={{ left: 70, right: 30, top: 50, bottom: 30 }}
                    slotProps={{
                      legend: {
                        hidden: false,
                        labelStyle: { fill: "white" },
                      },
                    }}
                    sx={{
                      "& .MuiChartsAxis-tickLabel": {
                        fill: "white",
                      },
                      "& .MuiChartsAxis-line": {
                        stroke: "rgba(255,255,255,0.3)",
                      },
                      "& .MuiChartsAxis-tick": {
                        stroke: "rgba(255,255,255,0.3)",
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>

        
        {!budgets && (
          <Fade in={true} timeout={1800}>
            <Paper
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h6" fontWeight="bold" color="#8b4513">
                    Set Your Monthly Budget
                  </Typography>
                  <Typography variant="body1" color="#8b4513" sx={{ mt: 1 }}>
                    Track your spending better by setting a monthly budget limit
                  </Typography>
                </div>
                <Link
                  href="/budget"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Add Budget
                </Link>
              </div>
            </Paper>
          </Fade>
        )}

        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes shimmer {
            0% {
              background-position: -468px 0;
            }
            100% {
              background-position: 468px 0;
            }
          }

          .animate-shimmer {
            animation: shimmer 2s infinite;
            background: linear-gradient(
              90deg,
              #f0f0f0 0%,
              #e0e0e0 50%,
              #f0f0f0 100%
            );
            background-size: 468px 104px;
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
          }
        `}</style>
      </Box>
    </Container>
  );
}

export default Dashboard;
