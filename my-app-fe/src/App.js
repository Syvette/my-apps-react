import logo from './logo.svg';
import './App.css';
import TaskList from './component/Tasklist/TaskList';
import Home from './component/Home/Home';

function App() {
  return (
    <>
      {/* <TaskList /> */}
      <Home />
    </>
  );
}

// class ==> className
// style ==> style="attr:value;attr2:value2" ===> style={{attr: value, attr: value}}
// style ==> border-bottom: 3px ==> borderBottom: 3px

export default App;
