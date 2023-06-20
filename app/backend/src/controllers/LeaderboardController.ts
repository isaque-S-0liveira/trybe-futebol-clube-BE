import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  async getAllLeaderboards(_req: Request, res: Response) {
    const allLeaderboards = await this.leaderboardService.getAllLeaderboards();
    return res.status(200).json(allLeaderboards.data);
  }
}
