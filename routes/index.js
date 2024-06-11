import { Router } from 'express';
import { checkSchema } from 'express-validator';

import userController from '../controllers/user-controller.js';
import {
  schemaRegistration,
  schemaLogin,
} from '../validadtions-schemas/index.js';
import noteController from '../controllers/note-controller.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

//User routes
router.post(
  '/register',
  checkSchema(schemaRegistration),
  userController.register,
);
router.post('/login', checkSchema(schemaLogin), userController.login);
router.get('/current', authenticateToken, userController.current);

//Note routes
router.get('/notes/', authenticateToken, noteController.getAllNotes);
router.post('/notes', authenticateToken, noteController.createNote);
router.put('/notes/:id', authenticateToken, noteController.editNote);
router.delete('/notes/:id', authenticateToken, noteController.deleteNote);
router.delete('/notes', authenticateToken, noteController.clearTrashNotes);

export default router;
