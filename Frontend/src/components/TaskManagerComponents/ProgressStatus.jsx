import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "../../Helper/Apis";

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
        Loading...
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
      <div className="border-[#787061] rounded-[50px] flex justify-center items-center gap-x-10 border-2 m-10 px-16 py-10">
        <div className="font-mono text-[#d1c1a6]">
          <h1 className="text-4xl font-bold">Task Done</h1>
          {completedTasks > 0 && (
            <h2 className="font-medium text-xl">Keep it up</h2>
          )}
        </div>
        <div className="bg-[#ff5631] rounded-full font-bold text-[50px] flex items-center justify-center w-32 h-32">
          {totalTasks === 0 ? "0" : `${completedTasks}/${totalTasks}`}
        </div>
      </div>
    </div>
  );
};

export default ProgressStatus;
