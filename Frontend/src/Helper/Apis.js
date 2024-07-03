import axios from "axios";

const api = "https://pedalstartassignment.onrender.com/api/tasks";
export const fetchTask = async () => {
  const { data } = await axios.get(api);
  return data;
};

export const postTask = async (task) => {
  const { data } = await axios.post(api, task);
  return data;
};

export const deleteTaskStatus = async (id) => {
  const { data } = await axios.delete(`${api}/${id}`);
  return data;
};

export const editTaskData = async (task) => {
  const { data } = await axios.put(`${api}/${task.id}`, task.tasks);
  return data;
};

export const markTaskCompeted = async (id) => {
  const { data } = await axios.put(`${api}/${id}/completed`);
  return data;
};
