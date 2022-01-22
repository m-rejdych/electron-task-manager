import { Router } from 'express';

import { createTask } from './services';

const router = Router();

router.post('/create-task', createTask);

export default router;
