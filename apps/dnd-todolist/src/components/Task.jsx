import { useState, useEffect } from 'react';

import { useOutsideClick } from '../hooks';

const Item = ({
  task,
  listId,
  deleteTask,
  updateTaskStatus,
  changeTaskTitle,
}) => {
  const { id, title, isDone } = task;

  const [taskStatus, setTaskStatus] = useState(isDone);
  const [newTitle, setNewTitle] = useState(title);
  const [editable, setEditable] = useState(false);

  const handleClickOutside = () => {
    setEditable(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className="w-full p-2 h-auto min-h-4 bg-white rounded-md shadow-2xl">
      {!editable ? (
        <div className="flex w-full justify-between items-center group">
          <div className="flex items-center gap-2 max-w-[220px]">
            <input
              type="checkbox"
              checked={taskStatus}
              onChange={() => {
                setTaskStatus(!taskStatus);
                updateTaskStatus(id, listId);
              }}
            />
            <span>{title}</span>
          </div>
          <div className="gap-1 hidden group-hover:flex">
            <button
              className="bg-stone-300 hover:bg-stone-400 text-white rounded-md w-6 h-6"
              onClick={() => {
                setEditable((editable) => true);
              }}
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white rounded-md w-6 h-6"
              onClick={() => {
                deleteTask(id, listId);
              }}
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
      ) : (
        <div ref={ref} class="flex justify-between items-center gap-2">
          <input
            value={newTitle}
            onChange={(e) => {
              setNewTitle((newTitle) => e.target.value);
            }}
            className="w-full h-auto focus:outline-none bg-white shadow-2xl rounded-md"
          />
          <button
            className="w-6 h-6 flex items-center justify-center rounded-md bg-green-600 hover:bg-green-700 disabled:bg-stone-300"
            onClick={() => {
              changeTaskTitle(newTitle, id, listId);
            }}
            disabled={!newTitle}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.082 1.17188L7.91797 13.2539L2.5 7.83984L0 10.3398L8.33203 18.6719L20 3.67188L17.082 1.17188Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
