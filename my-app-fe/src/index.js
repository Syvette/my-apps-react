import React from 'react'; // 'package name'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorView from './component/Home/ErrorView';
import TaskList from './component/Tasklist/TaskList';
import TaskAPIList from './component/TasklistAPI/TaskAPIList';
import Welcome from './component/Welcome/Welcome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/projects/taskslist',
        element: <TaskList />,
      },
      {
        path: '/projects/taskslistapi',
        element: <TaskAPIList />,
      },
      {
        path: '/projects',
        element: <Welcome />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// <img />
// .js, .jsx, .ts, .tsx

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// index.html
// ^--- index.js  ----> hook router
//        ^----- App.js
//                  ^-------- TaskList
//                               ^----- TaskItem
//                               ^----- TaskCreate
