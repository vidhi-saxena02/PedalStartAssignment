import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "../../Helper/Apis";
import Loader from "../Loader";

const ProgressStatus = () => {
  const {
    isLoading,
    isError,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTask,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-10 w-full text-white">
        <Loader />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center mt-10 w-full text-white">
        Error: {error.message}
      </div>
    );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="flex items-center justify-center">
      <div className="border-[#787061] rounded-[50px] flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 border-2 m-4 sm:m-10 px-6 sm:px-16 py-6 sm:py-10">
        <div className="font-mono text-[#d1c1a6] text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold">Task Done</h1>
          {completedTasks > 0 && (
            <h2 className="font-medium text-lg sm:text-xl">Keep it up</h2>
          )}
        </div>
        <div className="bg-[#ff5631] rounded-full font-bold text-3xl sm:text-[50px] flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32">
          {totalTasks === 0 ? "0" : `${completedTasks}/${totalTasks}`}
        </div>
      </div>
    </div>
  );
};

export default ProgressStatus;
