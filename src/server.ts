const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [
  { id: 1, title: 'Купить продукты', completed: false },
  { id: 2, title: 'Изучить Webpack', completed: true },
];
let nextId = 3;

app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Задача не найдена' });
  }
  res.json(task);
});

app.post('/api/tasks', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Требуется заголовок задачи' });
  }
  const newTask: Task = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Задача не найдена' });
  }
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Задача не найдена' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});