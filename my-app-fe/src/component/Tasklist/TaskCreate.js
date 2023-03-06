// import
import React, { useState } from 'react';
import { log } from './TaskHelper';

// function
function TaskCreate({ addTask }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // dont refresh the page
    if (!value) return;
    log(`Adding of task initiated.`);
    // do update parent to add task
    addTask(value);
    setValue('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Priority
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </li>
          </ul>
          <input
            type="text"
            className="form-control"
            value={value}
            placeholder="Add a new task item ..."
            onChange={(e) => {
              //   log(`Changed in value: ${e.target.value}`);
              setValue(e.target.value);
            }}
          />
          <button className="btn btn-primary">Add Task</button>
        </div>
      </form>
    </>
  );
}

// export default
export default TaskCreate;
