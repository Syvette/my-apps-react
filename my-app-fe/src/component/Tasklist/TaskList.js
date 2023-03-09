// import
import React, { useState, useEffect, useMemo } from 'react';

import './core.min.css';
import './TaskList.css';

import TaskItem from './TaskItem';
import TaskCreate from './TaskCreate';

const styles = {
  body: { backgroundColor: '#fff' },
  cardBody: {
    position: 'relative',
    height: '400px',
    overflow: 'auto',
  },
};

const DEFAULT_TASK = [
  {
    id: 100,
    avatar: 'high-prio.webp',
    name: 'Lean Jerios',
    description: 'Build Todo App',
    priority: 'high',
    completed: false,
  },
  {
    id: 101,
    avatar: 'low-prio.webp',
    name: 'Andria Degoma',
    description: 'Feed the kittens',
    priority: 'low',
    completed: false,
  },
  {
    id: 102,
    avatar: 'mid-prio.webp',
    name: 'Czedrick Rodis',
    description: 'Play some games',
    priority: 'mid',
    completed: false,
  },
];

// function
function TaskList() {
  // const [read, update] = useState([])
  const [tasks, setTasks] = useState([]);
  const [finishedCount, setFinishedCount] = useState(0);
  const [unfinishedCount, setUnfinishedCount] = useState(0);
  const TASKLIST_KEY = 'TASKLIST';
  let IS_INITIAL_SETUP = 0;
  let item;

  // useEffect(func, data_to_monitor)
  // useEffect(func, null)
  // tracking number of items
  useEffect(() => {
    // console.log(`Effect has been called.`);
    setFinishedCount(tasks.filter((task) => task.completed).length);
    setUnfinishedCount(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  // syncing localStorage
  useEffect(() => {
    // console.log('Will run only once. ');
    // setTasks(DEFAULT_TASK);
    item = localStorage.getItem(TASKLIST_KEY);
    // console.log(item);
    if (!item && item === null) {
      localStorage.setItem(TASKLIST_KEY, JSON.stringify(DEFAULT_TASK));
      item = localStorage.getItem(TASKLIST_KEY);
      IS_INITIAL_SETUP = 1;
      setTasks(JSON.parse(item));
    } else {
      IS_INITIAL_SETUP = 1;
      setTasks(JSON.parse(item));
    }
  }, []); // will run once

  useEffect(() => {
    if (!IS_INITIAL_SETUP) {
      localStorage.setItem(TASKLIST_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const getIndexById = (id) => {
    let index = tasks.indexOf(tasks.filter((task) => task.id === id)[0]);
    return index;
  };

  const completeOrRestoreTask = (id, restore = false) => {
    // console.log(`Complete task for id ${id} is called from parent`);
    const newTasks = [...tasks]; //create a copy;
    newTasks[getIndexById(id)].completed = !restore; //manipulate data;
    setTasks(newTasks); //push/save modified data;
  };

  const deleteTask = (id) => {
    // console.log(`Deleted task for id ${id}`);
    const newTasks = [...tasks];
    newTasks.splice(getIndexById(id), 1);
    setTasks(newTasks);
  };

  const addTask = (value) => {
    // console.log(`Parent has been notified to add a new task`);
    const newTasks = [...tasks]; //copy
    newTasks.push({
      // modify
      id: Math.floor(Math.random() * (10000 - 200)) + 200,
      avatar: '',
      name: 'Lean Jerios',
      priority: 'high',
      description: value,
      completed: false,
    });
    setTasks(newTasks);
  };

  return (
    <section className="vh-100" style={styles.body}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card shadow-lg">
              <div className="card-header p-3">
                <h5 className="mb-0">
                  <i className="fas fa-tasks me-2"></i>Task List
                </h5>
              </div>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={styles.cardBody}
              >
                {/* Incomplete Tasks */}
                <p>
                  <strong>Current Tasks ({unfinishedCount})</strong>
                </p>
                {unfinishedCount === 0 ? (
                  <p className="text-center">No items to show</p>
                ) : (
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Team Member</th>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks
                        .filter((task) => !task.completed)
                        .map((task, index) => {
                          return (
                            <TaskItem
                              task={task}
                              key={task.id}
                              index={task.id}
                              completeOrRestoreTask={completeOrRestoreTask}
                              deleteTask={deleteTask}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                )}

                {/* Completed Tasks */}
                <p className="mt-4">
                  <strong>Completed Tasks ({finishedCount})</strong>
                </p>
                {finishedCount === 0 ? (
                  <p className="text-center">No items to show</p>
                ) : (
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Team Member</th>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks
                        .filter((task) => task.completed)
                        .map((task, index) => {
                          return (
                            <TaskItem
                              task={task}
                              key={task.id}
                              index={task.id}
                              completeOrRestoreTask={completeOrRestoreTask}
                              deleteTask={deleteTask}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="card-footer text-end p-3">
                <TaskCreate addTask={addTask} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// export
export default TaskList;
