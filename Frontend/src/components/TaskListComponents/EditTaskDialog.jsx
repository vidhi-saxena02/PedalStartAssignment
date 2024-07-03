import React from "react";

const EditTaskDialog = ({ task, onEdit, onClose, onChange }) => {
  const handleEdit = () => {
    onEdit();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block mb-2">Task Name:</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="flex justify-end gap-x-4">
          <button
            onClick={handleEdit}
            className="bg-[#57cb4c] px-4 py-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskDialog;
