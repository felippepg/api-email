import { Router } from 'express';
import UserController from '../ controller/User';

const router = Router();

router.post('/users', UserController.create);

export default router;