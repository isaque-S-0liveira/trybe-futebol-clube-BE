import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}
  async getAllLeaderboards() {
    const allLeaderboards = await this.leaderboardModel.findAllLeaderboard();
    return { status: 'SUCCESSFUL', data: allLeaderboards };
  }
}
