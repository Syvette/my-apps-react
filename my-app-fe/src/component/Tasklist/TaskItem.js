// import
import React from 'react';
import { getAvatar, log, getPriorityBadge } from './TaskHelper';

const styles = {
  avatarImg: { width: '32px', height: 'auto', margin: '5px 0px' },
};

// function
function TaskItem({ task, index, completeOrRestoreTask, deleteTask }) {
  return (
    <tr className="fw-normal">
      <th>
        {/* "width: 55px; height: auto;" */}
        <img
          src={getAvatar()}
          className="shadow-1-strong rounded-circle"
          alt="avatar 1"
          style={styles.avatarImg}
        />
        {/* ms-2 text-decoration-line-through text-center*/}
        <span
          className={`ms-2 ${
            task.completed ? 'text-decoration-line-through' : ''
          } ${task.completed ? 'text-danger' : ''}`}
        >
          {task.name}
        </span>
      </th>
      {/*align-middle text-decoration-line-through */}
      <td
        className={`align-middle ${
          task.completed ? 'text-decoration-line-through' : ''
        } ${task.completed ? 'text-danger' : ''}`}
      >
        <span>{task.description}</span>
      </td>
      <td className="align-middle">
        <h6 className="mb-0">
          {getPriorityBadge(task.priority, task.completed)}
        </h6>
      </td>
      <td className="align-middle">
        {/* "Mark task as complete" : "Restore current task"*/}
        <a
          href="#!"
          data-mdb-toggle="tooltip"
          title={
            task.completed ? 'Restore current task' : 'Mark task as complete'
          }
          onClick={() => completeOrRestoreTask(index, task.completed)}
        >
          {/* "fas fa-check text-success me-3" */}
          <i
            className={`me-3 fas fa-${
              task.completed ? 'ban text-warning' : 'check text-success'
            }`}
          ></i>
        </a>
        <a
          href="#!"
          data-mdb-toggle="tooltip"
          title="Delete current task"
          onClick={() => deleteTask(index)}
        >
          <i className="fas fa-trash-alt text-danger"></i>
        </a>
      </td>
    </tr>
  );
}

// export default funcName
export default TaskItem;
