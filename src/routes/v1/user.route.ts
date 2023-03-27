import { authMiddleware } from './../../middleware/authMiddleware';
import { Router } from 'express';
import {
  UserSchema,
  UserOptionalDefaultsSchema,
} from '../../../../types/';
import { UserPartialSchema } from '../../../../types/generated/index';
import prisma from '../../database/PrismaClient';
import {
  register,
  logout,
  currentUser,
  login,
} from '../../controllers/user.controller';
import { RegisterSchema, LoginSchema } from '../../utils/customValidation';
import {
  authPassportLocal,
  isLoggedIn,
  validateSchema,
} from '../../middleware';

const router = Router();
router.post('/register', validateSchema(RegisterSchema), register);
router.post('/login', validateSchema(LoginSchema), login);
router.post('/logout', logout);
router.get('/users/current-user', authMiddleware, currentUser);

export default router;
