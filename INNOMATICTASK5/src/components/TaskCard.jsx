import React from "react";
import { motion } from "framer-motion";

const TaskCard = ({ task, provided, toggleComplete, deleteTask }) => {
  return (
    <motion.div
      className={`task-card ${task.completed ? "completed" : ""}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p onClick={() => toggleComplete(task.id)}>{task.text}</p>
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </motion.div>
  );
};

export default TaskCard;
