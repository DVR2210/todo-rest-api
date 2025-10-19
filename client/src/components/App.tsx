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

 const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    // Отправка обновления на сервер (пока заглушка)
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !tasks.find((t) => t.id === id)?.completed }),
    });
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((tasks) => tasks.id !== id));
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <div className="container">
      <h1>TODO APP</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.title} (Completed: {task.completed.toString()})
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;