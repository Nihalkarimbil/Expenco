"use client";

import { useAuthStore } from "@/lib/stores/useAuthstore";
import { useGetExpenses, useGetTotalExpense } from "@/lib/stores/useExpence";
import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import {
  PieChart,
  pieArcLabelClasses,
  LineChart,
} from "@mui/x-charts";
import { Expenses } from "@/lib/stores/useExpence";
import { useGetBudget } from "@/lib/stores/useBudgetStore";
import Link from "next/link";

function Dashboard() {
  const { user ,checkAuth} = useAuthStore();
  const { data: totalamount } = useGetTotalExpense(user?._id);
  const { data: expences, isLoading } = useGetExpenses(user?._id);
  const currentMonth = new Date().getMonth() + 1;
  const { data: budgets } = useGetBudget(user?._id, currentMonth);
  console.log("budg", budgets);
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if (isLoading) {
    return <div>loding</div>;
  }

  
  const totalexp = totalamount && totalamount[0]?.total ? totalamount[0].total : 0;

  const balance = Number(budgets?.amount)- totalexp;

  const processCategoryData = (): {
    id: number;
    label: string;
    value: number;
  }[] => {
    const exp = Array(expences);
   console.log(exp);
   
    const categoryTotals: { [key: string]: number } = {};

    expences.forEach((expense: Expenses) => {
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
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Box mb={2}>
          <Typography variant="h4" color="text.secondary">
            Welcome back, {user?.username}
          </Typography>
        </Box>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderLeft: 6,
                borderColor: "primary.main",
                height: "100%",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textTransform="uppercase"
                >
                  Total Expenses
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  fontWeight="bold"
                  my={1}
                >
                  ₹{totalexp}
                </Typography>
                <Typography
                  variant="body2"
                  color={totalexp > budgets.amount / 2 ? "error.main" : "success.main"}
                >
                  {totalexp >Number(budgets.amount) / 2
                    ? "Warning: High spending"
                    : "Spending on track"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderLeft: 6,
                borderColor: "primary.main",
                height: "100%",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textTransform="uppercase"
                >
                  Monthly Budget
                </Typography>

                {budgets ? (
                  <>
                    <Typography
                      variant="h4"
                      component="div"
                      fontWeight="bold"
                      my={1}
                    >
                      ₹{budgets.amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {((totalexp / Number(budgets.amount)) * 100).toFixed(0)}% of
                      budget used
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      component="div"
                      fontWeight="medium"
                      my={1}
                      color="text.secondary"
                    >
                      No budget is available for this month
                    </Typography>
                    <Link href={"/budget"}>add Budget</Link>
                  </>
                )}
              </CardContent>

            </Card>

          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderLeft: 6,
                borderColor: "primary.main",
                height: "100%",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textTransform="uppercase"
                >
                  Remaining Balance
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  fontWeight="bold"
                  my={1}
                  color={balance < 0 ? "error.main" : "inherit"}
                >
                  ₹{balance}
                </Typography>
                <Typography
                  variant="body2"
                  color={balance < 0 ? "error.main" : "success.main"}
                >
                  {balance < 0
                    ? "Budget exceeded!"
                    : `${((balance / Number(budgets.amount)) * 100).toFixed(0)}% remaining`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%", boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Expenses by Category
              </Typography>
              <Box sx={{ height: 300, pt: 1 }}>
                <PieChart
                  series={[
                    {
                      data: categoryData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                      arcLabel: (item) =>
                        `${item.label}: ${(
                          (item.value / totalexp) *
                          100
                        ).toFixed(0)}%`,
                      valueFormatter: (item) => `$${item.value}`,
                      arcLabelMinAngle: 45,
                      innerRadius: 0,
                      outerRadius: 100,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      startAngle: -90,
                      endAngle: 270,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontWeight: "bold",
                    },
                    height: 300,
                  }}
                  colors={COLORS}
                  margin={{ right: 5 }}
                  slotProps={{
                    legend: { hidden: false },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%", boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Monthly Expense Trend
              </Typography>
              <Box sx={{ height: 300, pt: 1 }}>
                <LineChart
                  xAxis={[
                    {
                      data: monthNames,
                      scaleType: "band",
                      tickLabelStyle: {
                        angle: 0,
                        textAnchor: "middle",
                      },
                    },
                  ]}
                  series={[
                    {
                      data: expenseValues,
                      label: "Expenses",
                      area: true,
                      showMark: true,
                      color: "#8884d8",
                      valueFormatter: (value) => `$${value}`,
                    },
                  ]}
                  height={300}
                  margin={{ left: 70, right: 30, top: 50, bottom: 30 }}
                  slotProps={{
                    legend: { hidden: false },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
