import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import TaskActionDialog from "../TaskListComponents/TaskActionDialog";
import EditTaskDialog from "../TaskListComponents/EditTaskDialog";
import TaskDetailDropDown from "../TaskListComponents/TaskDetailDropDown";
import {
  deleteTaskStatus,
  editTaskData,
  fetchTask,
  markTaskCompeted,
} from "../../Helper/Apis";

const TaskList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  const {
    isLoading,
    isError,
    data: tasks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTask,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskStatus,
    onSuccess: (data) => {
      setShowDialog(false);
      refetch();
      setEditTask({ name: "", description: "", dueDate: "" });
      alert(`Task ${data.taskName} deleted successfully`);
    },
  });

  const editMutation = useMutation({
    mutationFn: editTaskData,
    onSuccess: (data) => {
      setShowDialog(false);
      refetch();
      alert(`Task ${data.taskName} updated successfully`);
    },
  });

  const completeMutation = useMutation({
    mutationFn: markTaskCompeted,
    onSuccess: (data) => {
      setShowDialog(false);
      refetch();
      alert(`Task ${data.taskName} marked as completed successfully`);
    },
  });

  const toggleDropdown = (taskId) => {
    if (selectedTask === taskId) {
      setShowDropdown(!showDropdown);
    } else {
      setShowDropdown(true);
      setSelectedTask(taskId);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAction = (action, taskId) => {
    if (action === "edit") {
      const task = tasks.find((task) => task.id === taskId);
      setEditTask({
        name: task.taskName,
        description: task.description,
        dueDate: task.due_date,
      });
    }
    setShowDialog(action);
    setSelectedTask(taskId);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-10 w-full text-white">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center mt-10 w-full text-white">
        Error: {error.message}
      </div>
    );

  const notCompletedTasks = tasks.filter(
    (task) => task.status === "Not Completed"
  );
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return tasks.length === 0 ? (
    <div className="flex items-center justify-center font-mono mt-10 w-full font-bold text-3xl text-[#d1c1a6]">
      Add a Task!
    </div>
  ) : (
    <div className="flex items-center justify-center mt-10 w-full">
      <div className="space-y-4 w-1/3">
        {notCompletedTasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col bg-[#1e1e1e] border-2 border-[#635d52] py-4 px-6 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div
                  onClick={() =>
                    task.status === "Not Completed" &&
                    handleAction("complete", task.id)
                  }
                  className={`${
                    task.status === "Not Completed"
                      ? "border-[#ff5631] bg-transparent"
                      : "border-[#57cb4c] bg-[#57cb4c]"
                  } border-2 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center mr-4`}
                />
                <div
                  className={`text-2xl text-[#cebea4] ${
                    task.status === "Completed" ? "line-through" : "font-bold"
                  }`}
                >
                  {task.taskName}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[#504b44] font-bold text-2xl">
                {task.status === "Not Completed" && (
                  <button onClick={() => handleAction("edit", task.id)}>
                    <FaRegEdit />
                  </button>
                )}
                <button onClick={() => handleAction("delete", task.id)}>
                  <MdDeleteOutline />
                </button>
                <button onClick={() => toggleDropdown(task.id)}>
                  <IoIosArrowDropdown />
                </button>
              </div>
            </div>
            {showDropdown && selectedTask === task.id && (
              <div className="mt-4 bg-[#1e1e1e] text-white p-4 rounded-md shadow-lg">
                <p className="mb-2">
                  <strong>Description:</strong> {task.description}
                </p>
                <p>
                  <strong>Due Date: </strong>
                  {new Date(task.due_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </p>
              </div>
            )}
          </div>
        ))}
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col bg-[#1e1e1e] border-2 border-[#635d52] py-4 px-6 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="border-[#57cb4c] bg-[#57cb4c] border-2 w-8 h-8 rounded-full flex items-center justify-center mr-4" />
                <div className="text-2xl text-[#cebea4] line-through font-bold">
                  {task.taskName}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-[#504b44] font-bold text-2xl">
                <button onClick={() => handleAction("delete", task.id)}>
                  <MdDeleteOutline />
                </button>
                <button onClick={() => toggleDropdown(task.id)}>
                  <IoIosArrowDropdown />
                </button>
              </div>
            </div>
            {showDropdown && selectedTask === task.id && (
              <TaskDetailDropDown
                description={task.description}
                due_date={task.due_date}
              />
            )}
          </div>
        ))}
      </div>
      {showDialog === "delete" && (
        <TaskActionDialog
          action="delete"
          onAction={() => deleteMutation.mutate(selectedTask)}
          onClose={() => setShowDialog(false)}
        />
      )}
      {showDialog === "complete" && (
        <TaskActionDialog
          action="complete"
          onAction={() => completeMutation.mutate(selectedTask)}
          onClose={() => setShowDialog(false)}
        />
      )}
      {showDialog === "edit" && (
        <EditTaskDialog
          task={editTask}
          onEdit={() =>
            editMutation.mutate({ id: selectedTask, tasks: editTask })
          }
          onClose={() => setShowDialog(false)}
          onChange={handleEditChange}
        />
      )}
    </div>
  );
};

export default TaskList;
