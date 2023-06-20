import SequelizeMatche from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamsModel';
import funcs from '../helpers/LeaderboardsCalculate';
import { TTeamsAndMatches, TMatch, TLeaderboard } from '../Interfaces/ILeaderboard';

export default class LeaderboardModel {
  private matcheModel = SequelizeMatche;
  private teamModel = TeamModel;
  static filteredResult(resultOrganized: TTeamsAndMatches[]) {
    return resultOrganized.map((el) => ({
      id: el.id,
      teamName: el.teamName,
      homeMatches: el.homeMatches.filter((match: TMatch) => match.inProgress === false),
    }));
  }

  async findAllLeaderboard() {
    const allTeamsAndMatches = await this.teamModel.findAll({
      include: [
        { model: this.matcheModel, as: 'homeMatches' },
      ],
    });
    const teams = allTeamsAndMatches.map((team) => team.dataValues);
    const match = LeaderboardModel.filteredResult(
      teams as unknown as TTeamsAndMatches[],
    );

    const leaderboard = funcs.resultExpected(match);

    leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;

      return b.goalsFavor - a.goalsFavor;
    });

    return leaderboard;
  }
}
