import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../../../context/AuthContext";

const Tasks = () => {
  const [editTask, setEditTask] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenForm = () => {
    setEditTask(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditTask(null);
  };

  const handleSetEditTask = (task) => {
    setEditTask(task);
    setOpenForm(true);
  };

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        py: { xs: 3, sm: 6 },
        px: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "#1e1e1e",
          borderRadius: { xs: 2, sm: 4 },
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#222",
            py: 3,
            px: { xs: 2, sm: 4 },
            borderBottom: "1px solid #444",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: { xs: "1.75rem", sm: "2.125rem" },
            }}
          >
            Task Management
          </Typography>
        </Box>

        <Grid container>
          {/* Left: Add Task & Form */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              borderRight: { md: "1px solid #444" },
              borderBottom: { xs: "1px solid #444", md: "none" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: { xs: 2, sm: 3 },
            }}
          >
            {isMobile ? (
              <Button
                fullWidth
                startIcon="➕"
                onClick={handleOpenForm}
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  mb: 2,
                  mt: 5,
                  textTransform: "none",
                }}
              >
                Add Task
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon="➕"
                onClick={handleOpenForm}
                sx={{
                  width: "100%",
                  maxWidth: 320,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  mb: 3,
                  textTransform: "none",
                  borderRadius: "999px",
                }}
              >
                Add New Task
              </Button>
            )}

            {/* Task Form */}
            <Box sx={{ width: "100%", maxWidth: 360 }}>
              <TaskForm
                open={openForm}
                handleClose={handleCloseForm}
                editData={editTask}
                userId={user?.uid}
              />
            </Box>
          </Grid>

          {/* Right: Task List */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              p: { xs: 2, sm: 3 },
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 2,
                display: { xs: "block", sm: "none" }, // Show only on mobile
              }}
            >
              Your Tasks
            </Typography>
            <TaskList setEditTask={handleSetEditTask} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Tasks;
