import type ITask from 'models/ITask';

const getFilteredTasks = (param: string, list: ITask[]): ITask[] => {
  switch (param) {
    case 'Active':
      return list.filter(item => !item.isCompleted);
    case 'Completed':
      return list.filter(item => item.isCompleted);
    case 'All':
      return list;
    default:
      return list;
  }
};

export default getFilteredTasks;
