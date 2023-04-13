import { Router } from "express";
import passport from 'passport';
import * as transactionController from '../controllers/transactionControllers.js';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }),transactionController.getTransactions);

router.post('/', passport.authenticate('jwt', { session: false }),transactionController.setTransaction);

router.delete('/:id', passport.authenticate('jwt', { session: false }),transactionController.deleteTransaction);

router.patch('/:id', passport.authenticate('jwt', { session: false }),transactionController.updateTransaction);

export default router;