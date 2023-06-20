import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './users.routes';
import matcheRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matcheRouter);
router.use('/leaderboard/home', leaderboardRouter);

export default router;
