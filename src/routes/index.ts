import express, { Router } from 'express';
import { auth } from '../middlewares/auth';
import users from './users';
import group from './group';

const router = Router();

router.use('/users', users);
router.use('/groups', auth, group);

export default router;
