// import
import React, { useState, useEffect, useMemo } from 'react';

import './core.min.css';
import './TaskAPIList.css';

import TaskAPIItem from './TaskAPIItem';
import TaskAPICreate from './TaskAPICreate';

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
function TaskAPIList() {
  // const [read, update] = useState([])
  const [tasks, setTasks] = useState([]);
  const [finishedCount, setFinishedCount] = useState(0);
  const [unfinishedCount, setUnfinishedCount] = useState(0);
  const TASKLIST_KEY = 'TASKLIST_API';
  let IS_INITIAL_SETUP = 0;
  let item;
  const ENDPOINT = 'http://localhost:3002/api/tasks';

  // useEffect(func, data_to_monitor)
  // useEffect(func, null)
  // tracking number of items
  useEffect(() => {
    // console.log(`Effect has been called.`);
    setFinishedCount(tasks.filter((task) => task.completed).length);
    setUnfinishedCount(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  // syncing localStorage
  // useEffect(() => {
  //   // console.log('Will run only once. ');
  //   // setTasks(DEFAULT_TASK);
  //   item = localStorage.getItem(TASKLIST_KEY);
  //   // console.log(item);
  //   if (!item && item === null) {
  //     localStorage.setItem(TASKLIST_KEY, JSON.stringify(DEFAULT_TASK));
  //     item = localStorage.getItem(TASKLIST_KEY);
  //     IS_INITIAL_SETUP = 1;
  //     setTasks(JSON.parse(item));
  //   } else {
  //     IS_INITIAL_SETUP = 1;
  //     setTasks(JSON.parse(item));
  //   }
  // }, []); // will run once

  // sync from database
  useEffect(() => {
    fetch(ENDPOINT, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // const newTasks = [...tasks, ...result];
        // let newTasks = [...tasks];
        // newTasks = [...newTasks, ...data];
        setTasks([...data]);
      })
      .catch((error) => console.log('error', error));
  }, []);

  // useEffect(() => {
  //   if (!IS_INITIAL_SETUP) {
  //     // localStorage.setItem(TASKLIST_KEY, JSON.stringify(tasks));
  //   }
  // }, [tasks]);

  const getIndexById = (id) => {
    let index = tasks.indexOf(tasks.filter((task) => task.id === id)[0]);
    return index;
  };

  const completeOrRestoreTask = async (id, restore = false) => {
    // console.log(`Complete task for id ${id} is called from parent`);
    await fetch(`${ENDPOINT}/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !restore }),
    })
      .then((data) => {
        const newTasks = [...tasks]; //create a copy;
        newTasks[getIndexById(id)].completed = !restore; //manipulate data;
        setTasks(newTasks); //push/save modified data;
      })
      .catch((error) => {
        alert(`Unable to update task`);
      });
  };

  const deleteTask = (id) => {
    fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.includes('successfully deleted')) {
          alert(`Successfully deleted task id=${id}`);
          const newTasks = [...tasks];
          newTasks.splice(getIndexById(id), 1);
          setTasks(newTasks);
        } else {
          alert(`Unable to delete task id=${id}`);
        }
      })
      .catch((error) => {
        alert(`Unable to delete task.`);
      });
  };

  const addTask = async (value) => {
    // console.log(`Parent has been notified to add a new task`);

    // prepare data
    const task = {
      // modify
      avatar: '',
      name: 'Lean Jerios',
      priority: 'high',
      description: value,
      completed: false,
    };

    // fire an api
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          // if request is good, return the body parsed as json
          return response.json();
        } else {
          // alert(`${response.status}: ${response.statusText}`);
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .then((data) => {
        // implement update of internal store
        const newTasks = [...tasks];
        // task.id = data.id;
        // newTasks.push(task);
        newTasks.push(data);
        setTasks(newTasks);
        console.log(tasks);
      })
      .catch((error) => {
        alert(`Unable to create a task. Reason: ${error.message}`);
      });

    // then update our internal state
  };

  const completeAllTasks = () => {
    console.log('completeAllTasks');
  };

  const deleteAllTasks = (completed) => {
    fetch(`${ENDPOINT}?completed=${completed}`, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        const newTasks = [...tasks];
        const remaining = newTasks.filter(
          (task) => task.completed !== completed
        );
        setTasks(remaining);
      })
      .catch((error) => alert(error));
  };

  return (
    <section className="" style={styles.body}>
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
                <div className="d-flex justify-content-between ">
                  <p>
                    <strong>Current Tasks ({unfinishedCount})</strong>
                  </p>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-success "
                      onClick={() => completeAllTasks()}
                    >
                      Complete All
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteAllTasks(false)}
                    >
                      Delete All
                    </button>
                  </div>
                </div>
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
                            <TaskAPIItem
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
                <div className="d-flex justify-content-between ">
                  <p>
                    <strong>Completed Tasks ({finishedCount})</strong>
                  </p>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-success "
                      onClick={() => completeAllTasks()}
                    >
                      Complete All
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteAllTasks(true)}
                    >
                      Delete All
                    </button>
                  </div>
                </div>
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
                            <TaskAPIItem
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
                <TaskAPICreate addTask={addTask} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// export
export default TaskAPIList;
