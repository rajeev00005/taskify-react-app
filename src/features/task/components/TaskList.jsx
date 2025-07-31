import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Skeleton,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { Delete, Edit, Search as SearchIcon, Label } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../taskSlice";
import { useAuth } from "../../../context/AuthContext";

const TaskList = ({ setEditTask }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Access tasks from Redux
  const { tasks = [], loading, error } = useSelector((state) => state.task || {});

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'pending', 'completed'
  const [tagFilter, setTagFilter] = useState(""); // filter by specific tag

  // Extract unique tags from tasks
  const allTags = [...new Set(tasks.flatMap((task) => task.tags || []))];

  // Combined filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      !searchQuery ||
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.status === "completed") ||
      (statusFilter === "pending" && task.status !== "completed");

    const matchesTag =
      !tagFilter ||
      (task.tags && task.tags.includes(tagFilter));

    return matchesSearch && matchesStatus && matchesTag;
  });

  // Fetch tasks when user is available
  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  // Handle Edit
  const handleEdit = (task) => {
    setEditTask(task);
  };

  // Handle Delete
  const handleDelete = (taskId) => {
    if (!taskId || !user?.uid) {
      console.error("Missing taskId or user ID:", { taskId, user });
      return;
    }

    dispatch(deleteTask({ taskId, userId: user.uid }))
      .unwrap()
      .then(() => console.log("Task deleted"))
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Skeleton loader
  const SkeletonLoader = () => (
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          <TableCell><Skeleton variant="text" width="100%" height={30} sx={{ bgcolor: "rgba(255,255,255,0.1)" }} /></TableCell>
          <TableCell><Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: "rgba(255,255,255,0.1)" }} /></TableCell>
          <TableCell align="right">
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
              <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  // Render states
  if (!user?.uid) {
    return <Typography color="white">Loading user info...</Typography>;
  }

  if (loading) {
    return (
      <Box sx={{ mt: 4 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Searching tasks..."
          disabled
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#2a2a2a",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
          }}
        />
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
          <Skeleton width={200} height={40} sx={{ borderRadius: 2 }} />
          <Skeleton width={200} height={40} sx={{ borderRadius: 2 }} />
          <Skeleton width={200} height={40} sx={{ borderRadius: 2 }} />
        </Stack>
        <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e" }}>
          <Table>
            <SkeletonLoader />
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <Box sx={{ mt: 1 }}>
      {/* Search Input */}
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search tasks by title or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{
          mb: 2,
          backgroundColor: "#2a2a2a",
          borderRadius: 1,
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#2196f3" },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2196f3",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Status Filter */}
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(e, value) => value && setStatusFilter(value)}
          aria-label="task status filter"
          size="small"
        >
          <ToggleButton value="all" sx={{ color: "#fff" }}>
            All
          </ToggleButton>
          <ToggleButton value="pending" sx={{ color: "#ffb300" }}>
            Pending
          </ToggleButton>
          <ToggleButton value="completed" sx={{ color: "#66bb6a" }}>
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
            <Label fontSize="small" /> Tags
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Chip
              label="None"
              icon={<Label fontSize="small" />}
              onClick={() => setTagFilter("")}
              sx={{
                bgcolor: tagFilter ? "#333" : "#2196f3",
                color: "white",
                height: "28px",
              }}
            />
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                icon={<Label fontSize="small" />}
                onClick={() => setTagFilter(tag)}
                onDelete={() => setTagFilter(tagFilter === tag ? "" : "")}
                deleteIcon={<></>} // Prevent accidental delete; click to toggle
                variant="outlined"
                sx={{
                  borderColor: tagFilter === tag ? "#2196f3" : "rgba(255,255,255,0.3)",
                  color: tagFilter === tag ? "#2196f3" : "#bbb",
                  bgcolor: tagFilter === tag ? "rgba(33, 150, 243, 0.1)" : "transparent",
                  height: "28px",
                }}
              />
            ))}
          </Stack>
          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />
        </Box>
      )}

      {/* Task Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell sx={{ color: "#ccc" }}>
                    {task.title || "Untitled Task"}
                    <Typography variant="caption" sx={{ display: "block", mt: 0.5, color: task.status === "completed" ? "#66bb6a" : "#ffb300" }}>
                      {task.status === "completed" ? "✅ Completed" : "🟡 Pending"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#bbb" }}>
                    {task.description?.length > 80
                      ? `${task.description.slice(0, 80)}...`
                      : task.description || "No description"}
                    {task.tags && task.tags.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {task.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            icon={<Label fontSize="small" />}
                            sx={{
                              mr: 0.5,
                              fontSize: "0.75rem",
                              height: "18px",
                              bgcolor: "rgba(33, 150, 243, 0.1)",
                              color: "#2196f3",
                              "& .MuiChip-icon": { color: "#2196f3", fontSize: "14px !important" }
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(task)} sx={{ color: "#2196f3" }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(task.id)}
                        sx={{ color: "#f44336", ml: 1 }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "#888", py: 3 }}>
                  No tasks match your filters and search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskList;