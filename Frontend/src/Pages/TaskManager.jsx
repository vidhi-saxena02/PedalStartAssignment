import React from "react";
import ProgressStatus from "../components/TaskManagerComponents/ProgressStatus";
import Header from "../components/TaskManagerComponents/Header";
import AddTask from "../components/TaskManagerComponents/AddTask";
import TaskList from "../components/TaskManagerComponents/TaskList";

const TaskManager = () => {
  return (
    <div>
      <Header />
      <ProgressStatus />
      <AddTask />
      <TaskList />
    </div>
  );
};

export default TaskManager;
