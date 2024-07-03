import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { postTask } from "../../Helper/Apis";
import { useToasts } from "@geist-ui/core";

const AddTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState("");
  const { setToast } = useToasts();
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const queryClient = useQueryClient();

  const openModal = () => {
    if (task) {
      setIsModalOpen(true);
    } else {
      alert("Add a task name");
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const mutation = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      setTask("");
      setDescription("");
      setDueDate("");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setToast({ text: "Task created successfully", type: "success" });
    },
    onError: (error) => {
      setToast({ text: error.message, type: "error" });
    },
  });

  const handleCreateTask = () => {
    mutation.mutate({
      name: task,
      description,
      dueDate,
    });
    closeModal();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-y-4 sm:gap-x-10">
        <input
          type="text"
          placeholder="Write your next task"
          className="rounded-2xl bg-[#1e1e1e] px-5 py-3 w-full sm:w-96 text-white placeholder-[#d1c1a6]"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-[#ff5631] rounded-full w-12 h-12 flex justify-center items-center"
          onClick={openModal}
        >
          <FaPlus className="text-2xl font-bold" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1e1e1e] rounded-2xl p-6 w-[90%] sm:w-[400px]">
            <h2 className="text-2xl font-bold text-white mb-4">{task}</h2>
            <input
              type="text"
              placeholder="Task Description"
              className="rounded-lg bg-[#2a2a2a] px-4 py-2 w-full text-white placeholder-[#665f54] mb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="date"
              className="rounded-lg bg-[#2a2a2a] px-4 py-2 w-full text-white placeholder-[#665f54] mb-4"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-[#ff5631] rounded-full px-4 py-2 text-white"
                onClick={handleCreateTask}
              >
                Create Task
              </button>
              <button
                className="bg-gray-600 rounded-full px-4 py-2 text-white"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
