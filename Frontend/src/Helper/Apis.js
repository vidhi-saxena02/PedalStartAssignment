import axios from "axios";

export const fetchTask = async () => {
  const { data } = await axios.get("http://localhost:3000/api/tasks");
  return data;
};

export const postTask = async (task) => {
  const { data } = await axios.post("http://localhost:3000/api/tasks", task);
  return data;
};

export const deleteTaskStatus = async (id) => {
  const { data } = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
  return data;
};

export const editTaskData = async (task) => {
  const { data } = await axios.put(
    `http://localhost:3000/api/tasks/${task.id}`,
    task.tasks
  );
  return data;
};

export const markTaskCompeted = async (id) => {
  const { data } = await axios.put(
    `http://localhost:3000/api/tasks/${id}/completed`
  );
  return data;
};
