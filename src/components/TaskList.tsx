import type ITask from 'models/ITask';
import React, { type FC } from 'react';
import SingleTask from './SingleTask';

interface ITaskListProps {
  tasks: ITask[];
  setActiveTasksLeft: (tasks: ITask[]) => void;
}

const TaskList: FC<ITaskListProps> = ({ tasks, setActiveTasksLeft }) => {
  return (
    <div>
      {tasks.map(task => (
        <SingleTask task={task} setActiveTasksLeft={setActiveTasksLeft} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
