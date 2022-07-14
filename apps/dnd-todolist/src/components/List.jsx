import { useState } from 'react';

import Task from './Task';
import Modal from './Modal';

const List = ({
  list,
  updateList,
  deleteList,
  addTask,
  updateTaskStatus,
  changeTaskTitle,
  deleteTask,
}) => {
  const { id, title, description, tasks } = list;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [showCreateModal, setCreateModalShow] = useState(false);
  const [newTask, setNewTask] = useState('');

  const closeModal = () => {
    setCreateModalShow((showCreateModal) => (showCreateModal = false));
  };

  return (
    <div className="bg-stone-200 p-2 w-[300px] flex flex-col rounded-lg">
      <div className="flex flex-col duration-300 py-3 group px-1 gap-1">
        <div className="flex justify-between items-center">
          <span className="font-medium">{title}</span>
          <div className="gap-1 hidden group-hover:flex">
            <button
              className="bg-stone-300 hover:bg-stone-400 text-white rounded-md w-6 h-6"
              onClick={() =>
                setCreateModalShow((showModal) => (showModal = true))
              }
            >
              <svg
                className="mx-auto"
                width="15"
                height="15"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 7L25 2L5 22L3 29L10 27L30 7ZM21 6L26 11L21 6ZM5 22L10 27L5 22Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Modal show={showCreateModal} handleClose={() => closeModal()}>
              <div className="flex flex-col gap-3">
                <div className="font-medium text-xl border-b pb-2 border-[#841474]">
                  Update the list
                </div>
                <input
                  className="bg-stone-200 px-2 py-2 rounded-lg focus:outline-none"
                  placeholder="Title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle((newTitle) => e.target.value)}
                />
                <textarea
                  className="bg-stone-200 px-2 py-1 rounded-lg focus:outline-none resize-none h-40"
                  placeholder="Description"
                  value={newDescription}
                  onChange={(e) =>
                    setNewDescription((newDescription) => e.target.value)
                  }
                />
                <button
                  className="bg-[#841474] hover:bg-[#631257] py-2 rounded-lg text-white disabled:bg-stone-500 disabled:text-stone-200"
                  disabled={!newTitle}
                  onClick={() => {
                    updateList({ newTitle, newDescription }, id);
                    closeModal();
                  }}
                >
                  Confirm
                </button>
              </div>
            </Modal>
            <button
              className="bg-red-600 hover:bg-red-700 text-white rounded-md w-6 h-6"
              onClick={() => deleteList(id)}
            >
              <svg
                className="mx-auto"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.27344 2.69531H5.15625C5.2207 2.69531 5.27344 2.64258 5.27344 2.57812V2.69531H9.72656V2.57812C9.72656 2.64258 9.7793 2.69531 9.84375 2.69531H9.72656V3.75H10.7812V2.57812C10.7812 2.06104 10.3608 1.64062 9.84375 1.64062H5.15625C4.63916 1.64062 4.21875 2.06104 4.21875 2.57812V3.75H5.27344V2.69531ZM12.6562 3.75H2.34375C2.08447 3.75 1.875 3.95947 1.875 4.21875V4.6875C1.875 4.75195 1.92773 4.80469 1.99219 4.80469H2.87695L3.23877 12.4658C3.26221 12.9653 3.67529 13.3594 4.1748 13.3594H10.8252C11.3262 13.3594 11.7378 12.9668 11.7612 12.4658L12.123 4.80469H13.0078C13.0723 4.80469 13.125 4.75195 13.125 4.6875V4.21875C13.125 3.95947 12.9155 3.75 12.6562 3.75ZM10.7124 12.3047H4.2876L3.93311 4.80469H11.0669L10.7124 12.3047Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-xs">{description}</p>
      </div>
      <div className="flex flex-col gap-1">
        {tasks
          ? tasks.map((task) => {
              return (
                <Task
                  key={Math.random()}
                  listId={id}
                  task={task}
                  updateTaskStatus={updateTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  deleteTask={deleteTask}
                />
              );
            })
          : 'Empty'}
      </div>
      <div className="flex w-full gap-2 p-1 rounded-lg bg-white mt-1">
        <input
          className="w-full pl-2 focus:outline-none"
          type="text"
          value={newTask}
          placeholder="Add new task"
          onChange={(e) => setNewTask((newTask) => (newTask = e.target.value))}
        />
        <button
          className="h-7 w-7 flex justify-center rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 disabled:bg-stone-500 disabled:text-stone-200"
          disabled={!newTask}
          onClick={() => addTask(newTask, id)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addTask(newTask, id);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default List;
