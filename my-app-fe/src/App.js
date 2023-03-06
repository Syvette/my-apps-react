import logo from './logo.svg';
import './App.css';
import './core.min.css';
import TaskList from './component/Tasklist/TaskList';

function App() {
  return (
    <TaskList />);
}

// class ==> className
// style ==> style="attr:value;attr2:value2" ===> style {{attr: value, attr: value}}
// style ==> border-bottom: 3px ===> borderBottom: 3px 
export default App;
