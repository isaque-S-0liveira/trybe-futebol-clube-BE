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

  async findById(id: number): Promise<IMatche | null> {
    const dbData = this.model.findByPk(id);
    if (dbData == null) return null;
    return dbData as unknown as IMatche;
  }
}
