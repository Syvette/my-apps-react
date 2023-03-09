import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      <div id="sidebar">
        <h1>WD40P React App Collections</h1>
        <div>
          <form id="seach-form" role="search">
            <input id="q" name="q" placeholder="search" type="search" />
          </form>
        </div>
        <nav>
          <ul>
            <li>
              {/* a href ---> Link to */}
              <Link to={`/projects`}>Welcome</Link>
            </li>
          </ul>
          <ul>
            <li>
              {/* a href ---> Link to */}
              <Link to={`/projects/taskslist`}>Tasks List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default Home;
