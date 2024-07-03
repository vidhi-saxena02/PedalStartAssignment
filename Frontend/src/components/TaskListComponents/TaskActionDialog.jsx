import React from "react";

const TaskActionDialog = ({ action, onAction, onClose }) => {
  const handleAction = () => {
    onAction();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-bold mb-4">
          {action === "delete" ? "Delete Task" : "Mark Task as Completed"}
        </h2>
        <p className="mb-4">
          {action === "delete"
            ? "Are you sure you want to delete this task?"
            : "Are you sure you want to mark this task as completed?"}
        </p>
        <div className="flex justify-end gap-x-4">
          <button
            onClick={handleAction}
            className={`${
              action === "delete" ? "bg-[#ff5631]" : "bg-[#57cb4c]"
            } px-4 py-2 rounded-lg`}
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 px-4 py-2 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskActionDialog;
