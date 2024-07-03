import React from "react";

const TaskDetailDropDown = ({ description, due_date }) => {
  return (
    <div className="mt-4 bg-[#1e1e1e] text-white p-4 rounded-md shadow-lg">
      <p className="mb-2">
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Due Date: </strong>
        {new Date(due_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        })}
      </p>
    </div>
  );
};

export default TaskDetailDropDown;
