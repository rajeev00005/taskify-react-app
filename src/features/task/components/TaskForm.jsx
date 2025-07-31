import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../taskSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
} from "@mui/material";

const TaskForm = ({ open, handleClose, editData, userId }) => {
  const dispatch = useDispatch();

  // Local state for form
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending", // default for new tasks
    tags: [],
  });

  const [tagInput, setTagInput] = useState(""); // For entering new tags

  // Sync form with editData (when editing)
  useEffect(() => {
    if (editData) {
      setTaskData({
        title: editData.title || "",
        description: editData.description || "",
        status: editData.status || "pending",
        tags: Array.isArray(editData.tags) ? editData.tags : [],
      });
      setTagInput("");
    } else {
      // Reset for new task
      setTaskData({
        title: "",
        description: "",
        status: "pending",
        tags: [],
      });
      setTagInput("");
    }
  }, [editData]);

  // Handle regular field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tag input
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Add tag on Enter or comma
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !taskData.tags.includes(trimmed)) {
      setTaskData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
    }
    setTagInput("");
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove) => {
    setTaskData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const trimmedTitle = taskData.title.trim();
    if (!trimmedTitle || !userId) {
      console.error("Missing title or userId.");
      return;
    }

    try {
      const payload = {
        title: trimmedTitle,
        description: taskData.description.trim(),
        status: taskData.status,
        tags: taskData.tags,
      };

      if (editData?.id) {
        // Update existing task
        await dispatch(
          updateTask({
            taskId: editData.id,
            updatedTask: payload,
            userId,
          })
        ).unwrap();
      } else {
        // Create new task (always starts as pending)
        await dispatch(
          addTask({
            task: payload,
            userId,
          })
        ).unwrap();
      }

      // Reset and close
      handleClose();
      setTaskData({ title: "", description: "", status: "pending", tags: [] });
      setTagInput("");
    } catch (err) {
      console.error("Task submission failed:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#222",
          color: "#fff",
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle>{editData ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
        {/* Title */}
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          fullWidth
          required
          value={taskData.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
          inputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />

        {/* Description */}
        <TextField
          margin="dense"
          name="description"
          label="Description"
          fullWidth
          multiline
          minRows={3}
          value={taskData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
          inputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />

        {/* Status Dropdown - Only shown when editing */}
        {editData && (
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              label="Status"
              sx={{
                color: "#fff",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#2196f3" },
              }}
            >
              <MenuItem value="pending" sx={{ color: "#ffb300" }}>
                🟡 Pending
              </MenuItem>
              <MenuItem value="completed" sx={{ color: "#66bb6a" }}>
                ✅ Completed
              </MenuItem>
            </Select>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
              Update the completion status of this task.
            </Typography>
          </FormControl>
        )}

        {/* Hint when creating a new task */}
        {!editData && (
          <Typography
            variant="body2"
            color="Secondary"
            sx={{ mb: 2, fontSize: "0.85rem" }}
          >
            🟡 New tasks are automatically marked as <strong>pending</strong>. You can mark them as complete later.
          </Typography>
        )}

        {/* Tags Section */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.7)"
            sx={{ mb: 1 }}
          >
            Tags (press Enter or comma to add)
          </Typography>
          <TextField
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="e.g., bug, urgent"
            fullWidth
            size="small"
            sx={{
              backgroundColor: "#333",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
            }}
            inputProps={{
              onKeyDown: (e) => {
                if (e.key === "," || e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              },
            }}
          />
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
            }}
          >
            {taskData.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => handleRemoveTag(tag)}
                deleteIcon={
                  <span style={{ color: "#fff", fontSize: "1rem" }}>×</span>
                }
                sx={{
                  bgcolor: "rgba(33, 150, 243, 0.2)",
                  color: "#2196f3",
                  height: "22px",
                  "& .MuiChip-deleteIcon": { fontSize: "1rem" },
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!taskData.title.trim()}
        >
          {editData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;