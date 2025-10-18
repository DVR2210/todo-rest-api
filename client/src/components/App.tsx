import React, { useEffect, useState } from 'react';
//import { Task } from './types'; // Убедись, что путь верный

interface Task {
  id: number;
  title: string;
  completed: boolean;
}


const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="container">
      <h1>TODO APP</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} (Completed: {task.completed.toString()})</li>
        ))}
      </ul>
    </div>
  );
};

export default App;