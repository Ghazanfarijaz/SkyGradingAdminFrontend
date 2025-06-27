import { Grid, Paper, Typography } from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetAllUsersQuery, useGetAllCardsQuery } from "../api/apiSlice"; // Import the necessary hooks

// Custom colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Dashboard() {
  // Fetch users and cards data
  const {
    data: users = [],
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetAllUsersQuery();
  const {
    data: cards = [],
    isLoading: isCardsLoading,
    error: cardsError,
  } = useGetAllCardsQuery();

  // Calculate metrics
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const totalCards = cards.length;
  const pendingCards = cards.filter(
    (card) => card.trackingStatus === "pending"
  ).length;

  // Prepare data for the graph (e.g., card grades distribution)
  const gradeDistribution = cards.reduce((acc, card) => {
    const grade = card.grade || "No Grade";
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

  const gradeData = Object.keys(gradeDistribution).map((grade) => ({
    name: `Grade ${grade}`,
    value: gradeDistribution[grade],
  }));

  // Prepare data for the graph (e.g., card rarity distribution)
  const rarityDistribution = cards.reduce((acc, card) => {
    const rarity = card.rarity || "No Rarity";
    acc[rarity] = (acc[rarity] || 0) + 1;
    return acc;
  }, {});

  const rarityData = Object.keys(rarityDistribution).map((rarity) => ({
    name: rarity,
    value: rarityDistribution[rarity],
  }));

  // Metrics to display
  const metrics = [
    { title: "Total Users", value: totalUsers },
    { title: "Active Users", value: activeUsers },
    { title: "Total Cards", value: totalCards },
    { title: "Pending Cards", value: pendingCards },
  ];

  // Handle loading and error states
  if (isUsersLoading || isCardsLoading) {
    return <Typography variant="h6">Loading dashboard data...</Typography>;
  }

  if (usersError || cardsError) {
    return (
      <Typography variant="h6" color="error">
        Error fetching dashboard data
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Display metrics */}
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.title}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {metric.title}
              </Typography>
              <Typography variant="h4">{metric.value}</Typography>
            </Paper>
          </Grid>
        ))}

        {/* Graph for Card Grades Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Card Grades Distribution
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Graph for Card Rarity Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Card Rarity Distribution
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rarityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {rarityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
