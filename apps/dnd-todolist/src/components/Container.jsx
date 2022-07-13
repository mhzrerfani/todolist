import { useState, useEffect } from 'react';

import List from './List';
import Modal from './Modal';

const Container = () => {
  let defaultLists = [
    {
      id: Math.random(),
      title: 'List #1',
      description: 'Work tasks that should be done until next friday',
      tasks: [
        { id: Math.random(), title: 'Task #1', isDone: false },
        { id: Math.random(), title: 'Task #2', isDone: true },
        { id: Math.random(), title: 'Task #3', isDone: false },
      ],
    },
    {
      id: Math.random(),
      title: 'List #2',
      description: 'Work tasks that should be done until next friday',
      tasks: [
        { id: Math.random(), title: 'Task #1', isDone: false },
        { id: Math.random(), title: 'Task #2', isDone: true },
        { id: Math.random(), title: 'Task #3', isDone: false },
        { id: Math.random(), title: 'Task #4', isDone: true },
      ],
    },
  ];

  const todoLists = localStorage.storedLists
    ? JSON.parse(localStorage.storedLists)
    : defaultLists;

  const [lists, setLists] = useState(todoLists);
  const [newList, setNewList] = useState({ title: '', description: '' });
  const [showCreateModal, setCreateModalShow] = useState(false);

  const addList = (newList) => {
    const { title, description } = newList;
    setLists((lists) =>
      lists.concat({ id: Math.random(), title, description, tasks: [] })
    );
  };

  const addTask = (title, listId) => {
    setLists((lists) =>
      lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.concat({
            id: Math.random(),
            title,
            isDone: false,
          });
        }
        return list;
      })
    );
  };

  const updateList = (updatedList, listId) => {
    const { newTitle, newDescription } = updatedList;
    setLists((lists) =>
      lists.map((list) => {
        if (list.id === listId) {
          list.title = newTitle;
          list.description = newDescription;
        }
        return list;
      })
    );
  };

  const updateTaskStatus = (taskId, listId) => {
    setLists((lists) =>
      lists.map((list) => {
        if (list.id === listId) {
          list.tasks.map((task) => {
            if (task.id === taskId) {
              task.isDone = !task.isDone;
            }
            return task;
          });
        }
        return list;
      })
    );
  };

  const changeTaskTitle = (newTitle, taskId, listId) => {
    setLists((lists) =>
      lists.map((list) => {
        if (list.id === listId) {
          list.tasks.map((task) => {
            if (task.id === taskId) {
              task.title = newTitle;
            }
            return task;
          });
        }
        return list;
      })
    );
  };

  const deleteList = (id) => {
    setLists((lists) => lists.filter((list) => list.id !== id));
  };

  const deleteTask = (taskId, listId) => {
    setLists((lists) =>
      lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.filter((task) => {
            return task.id !== taskId;
          });
        }
        return list;
      })
    );
  };

  const closeModal = () => {
    setCreateModalShow((showCreateModal) => (showCreateModal = false));
  };

  useEffect(() => {
    localStorage.storedLists = JSON.stringify(lists);
  }, [lists]);

  return (
    <div className="flex flex-wrap gap-5 w-full justify-center items-start">
      {lists.map((list) => {
        return (
          <List
            key={Math.random()}
            list={list}
            addList={addList}
            updateList={updateList}
            deleteList={deleteList}
            addTask={addTask}
            updateTaskStatus={updateTaskStatus}
            changeTaskTitle={changeTaskTitle}
            deleteTask={deleteTask}
          />
        );
      })}

      <button
        className="bg-stone-200 hover:bg-stone-300 w-[300px] p-2 rounded-lg font-medium mb-10"
        onClick={() => setCreateModalShow((showModal) => (showModal = true))}
      >
        + Create New List
      </button>
      <Modal show={showCreateModal} handleClose={() => closeModal()}>
        <div className="flex flex-col gap-3">
          <div className="font-medium text-xl border-b pb-2 border-[#841474]">
            Create new list
          </div>
          <input
            className="bg-stone-200 px-2 py-2 rounded-lg focus:outline-none"
            placeholder="Title"
            type="text"
            value={newList.title}
            onChange={(e) =>
              setNewList(
                (list) =>
                  (list = {
                    title: e.target.value,
                    description: list.description,
                  })
              )
            }
          />
          <textarea
            className="bg-stone-200 px-2 py-1 rounded-lg focus:outline-none resize-none h-40"
            placeholder="Description"
            value={newList.description}
            onChange={(e) =>
              setNewList(
                (list) =>
                  (list = {
                    title: list.title,
                    description: e.target.value,
                  })
              )
            }
          />
          <button
            className="bg-[#841474] hover:bg-[#631257] py-2 rounded-lg text-white disabled:bg-stone-500 disabled:text-stone-200"
            disabled={!newList.title}
            onClick={() => {
              addList(newList);
              setNewList(
                (newList) =>
                  (newList = {
                    title: '',
                    description: '',
                  })
              );
              closeModal();
            }}
          >
            Add to lists
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Container;
