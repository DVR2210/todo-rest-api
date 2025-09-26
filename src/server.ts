import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'TODO REST API готов! TypeScript + Express.' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});