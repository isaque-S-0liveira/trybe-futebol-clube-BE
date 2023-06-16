import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './users.routes';
import matcheRouter from './matches.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matcheRouter);

export default router;
