import getFilteredTasks from 'helpers/getFilteredTasks';
import TaskList from '../components/TaskList';
import React, { useState, type KeyboardEvent, type MouseEvent, type FC } from 'react';
import getSavedTasks from 'helpers/getSavedTasks';

const App: FC = () => {
  const allTasks = getSavedTasks();
  const [inputValue, setInputValue] = useState('');
  const [filteredList, setFilteredList] = useState(allTasks);
  const [activeTasksLeft, setActiveTasksLeft] = useState(allTasks.filter(task => !task.isCompleted));

  const handleSaveInput = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const currentValue = (e.target as HTMLInputElement).value;
      const newTask = { id: Date.now(), text: currentValue, isCompleted: false };
      allTasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(allTasks));
      setFilteredList(allTasks);
      setActiveTasksLeft(allTasks.filter(task => !task.isCompleted));
      setInputValue('');
    }
  };

  const handleSelectFilter = (e: MouseEvent<HTMLDivElement>): void => {
    document.querySelector('.container__filterButton_active')?.classList.remove('container__filterButton_active');
    const target = e.target as HTMLButtonElement;
    target.classList.add('container__filterButton_active');
    if (target.textContent !== null) {
      const filteredTasks = getFilteredTasks(target.textContent, getSavedTasks());
      setFilteredList(filteredTasks);
    }
  };

  const handleClearCompletedTasks = (): void => {
    localStorage.setItem('tasks', JSON.stringify(activeTasksLeft));
    setFilteredList(activeTasksLeft);
  };

  return (
    <div className="container">
      <div className="container__content">
        <header className="container__contentHeader">
          <h1>todos</h1>
        </header>
        <section className="container__contentBody">
          <div className="container__inputLine">
            <input
              type="text"
              value={inputValue}
              placeholder="What needs to be done?"
              data-testid="main-input"
              onChange={e => {
                setInputValue(e.target.value);
              }}
              onKeyDown={e => {
                handleSaveInput(e);
              }}
            />
          </div>
          <div className="container__list">
            <TaskList tasks={filteredList} setActiveTasksLeft={setActiveTasksLeft} />
          </div>
        </section>
        <footer className="container__contentFooter">
          <span>{`${activeTasksLeft.length} ${activeTasksLeft.length === 1 ? 'item' : 'items'} left`}</span>
          <div
            className="container__listFilters"
            onClick={e => {
              handleSelectFilter(e);
            }}
          >
            <button className="container__filterButton container__filterButton_active" data-testid="display-all">
              All
            </button>
            <button className="container__filterButton" data-testid="active-todos">
              Active
            </button>
            <button className="container__filterButton">Completed</button>
          </div>
          <button onClick={handleClearCompletedTasks} data-testid="clear-all">
            Clear completed
          </button>
        </footer>
        <div className="container__backPage container__backPage_first"></div>
        <div className="container__backPage container__backPage_second"></div>
      </div>
    </div>
  );
};

export default App;
