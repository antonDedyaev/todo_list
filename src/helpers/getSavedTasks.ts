import type ITask from 'models/ITask';

const getSavedTasks = (): ITask[] => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks !== null ? JSON.parse(savedTasks) : [];
};

export default getSavedTasks;
