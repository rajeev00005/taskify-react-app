import React from "react";
import { Typography, Container, Box, Button, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{bgcolor: '#000', color: '#fff'
        , minHeight: '100vh', display: 'flex', justifyContent: 'center', px: 2 }}
    >
    <Container maxWidth="md" sx={{ py: { xs: 6, sm: 8, md: 10 }}}>
      <Paper
        elevation={3}
        sx={{
            bgcolor: '#222',
          p: { xs: 3, sm: 10},
          borderRadius: 3,
          textAlign: "center",
          minHeight: "100",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#fff", mb: 2, fontWeight: "bold" }}
        >
          Welcome to Your Dashboard,
          <br />
          {user?.email} 👋
        </Typography>

        <Typography
          variant="body1"
          sx={{  color: "#bbb", mb: 10, fontSize: "1.1rem" }}
        >
          You can start creating and managing your tasks from here.
        </Typography>

        <Button
          component={Link}
          to="/tasks"
          size="large"
          variant="contained"
          sx={{
            py: 1.5,
            px: 4,
            fontWeight: "bold",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Go to Tasks
        </Button>
      </Paper>
    </Container>
    </Box>
  );
};

export default Dashboard;
