import { IMatcheModel } from '../Interfaces/IMatcheModel';
import SequelizeMatche from '../database/models/MatcheModel';
import IMatche from '../Interfaces/IMatche';
import TeamModel from '../database/models/TeamsModel';

export default class MatcheModel implements IMatcheModel {
  private model = SequelizeMatche;
  async findAll(): Promise<IMatche[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches as unknown as IMatche[];
  }

  async filteredMatches(term: boolean): Promise<IMatche[]> {
    const finishedOrInProgress = await this.model.findAll({
      where: { inProgress: term },
      include: [
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    return finishedOrInProgress as unknown as IMatche[];
  }
}
