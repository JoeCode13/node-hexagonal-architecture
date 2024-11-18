import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/users', UserController.createUser);

// Definir rutas para GET, PUT, DELETE

export default router;
