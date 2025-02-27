import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import TaskCard from "./components/TaskCard";
import "./styles.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: "1", text: "Personal Budget Tracker Task"},
    { id: "2", text: "Coffee Shop Website Task" },
    { id: "3", text: "JS Problem Solving Task" },
    { id: "4", text: "Build Shopping Cart Website Task"},
    {id: "5", text: "Build new interactive TODO LIST"}
  ]);
  const [newTask, setNewTask] = useState("");

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: status } : task)));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = [...tasks];
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container dark-theme" style={{ width: "600px", height: "500px" }}>
      <h1>✨ Interactive Todo List ✨</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div className="task-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div className="task-content">
                        <span>{task.text} </span>
                        <span className={task.status}>{task.status}</span>
                      </div>
                      <div className="task-buttons">
                        <button 
                          className={task.status === "completed" ? "completed active" : "completed"} 
                          onClick={() => updateTaskStatus(task.id, "completed")}
                        >
                          ✅ Completed
                        </button>
                        <button 
                          className={task.status === "incomplete" ? "incomplete active" : "incomplete"} 
                          onClick={() => updateTaskStatus(task.id, "incomplete")}
                        >
                          ❌ Incomplete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoApp;
