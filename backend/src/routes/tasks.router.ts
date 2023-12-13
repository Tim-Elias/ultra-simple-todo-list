import { Router } from 'express';
import { createTask, getTasks, updateTask } from '../controllers/tasks/tasks.controller';

export const taskRouter = Router();
taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.post('/:id', updateTask);
