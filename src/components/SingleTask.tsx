import getSavedTasks from 'helpers/getSavedTasks';
import type ITask from 'models/ITask';
import React, { type FC, useEffect, useState } from 'react';

interface ITaskProps {
  task: ITask;
  setActiveTasksLeft: (tasks: ITask[]) => void;
}

const SingleTask: FC<ITaskProps> = ({ task, setActiveTasksLeft }) => {
  const allTasks: ITask[] = getSavedTasks() ?? [];
  const [checked, setChecked] = useState(task.isCompleted);

  useEffect(() => {
    allTasks.forEach(item => {
      if (item.id === task.id) {
        item.isCompleted = checked;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(allTasks));

    const activeTasksLeft = allTasks.filter(task => !task.isCompleted);
    setActiveTasksLeft(activeTasksLeft);
  }, [checked]);

  return (
    <div className="taskContainer" data-testid="list-item">
      <div className="taskContainer__content">
        <input
          type="checkbox"
          id={`todo-${task.id}`}
          onChange={e => {
            setChecked(e.target.checked);
          }}
          checked={checked}
        />
        <label htmlFor={`todo-${task.id}`}>{task.text}</label>
      </div>
    </div>
  );
};

export default SingleTask;
