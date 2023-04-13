import { Router } from "express";
import passport from 'passport';
import * as catagoriesController from '../controllers/catagoriesControllers.js';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }),catagoriesController.addCatagory);

router.delete('/:id', passport.authenticate('jwt', { session: false }),catagoriesController.deleteCatagory);

router.patch('/:id', passport.authenticate('jwt', { session: false }),catagoriesController.updateCatagory);

export default router;