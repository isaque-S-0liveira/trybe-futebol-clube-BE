import ITeam from '../Interfaces/ITeam';
import { IMatcheModel } from '../Interfaces/IMatcheModel';
import SequelizeMatche from '../database/models/MatcheModel';
import IMatche, { newMatche, newMatcheReturn } from '../Interfaces/IMatche';
import TeamModel from '../database/models/TeamsModel';

export default class MatcheModel implements IMatcheModel {
  private model = SequelizeMatche;
  private teamModel = TeamModel;
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

  async findById(id: number): Promise<IMatche | null> {
    const matche = await this.model.findByPk(id);
    if (!matche) return null;

    return matche as unknown as IMatche;
  }

  async findIdTeam(id: number): Promise<ITeam | null> {
    const team = await this.teamModel.findByPk(id);
    if (!team) return null;

    return team;
  }

  async endMatch(id: number): Promise<number | null> {
    const [affectedRows] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    if (affectedRows === 0) return null;

    return affectedRows;
  }

  async update(id: number, data: Partial<IMatche>): Promise<IMatche | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async create(data: Omit<newMatche, 'id'>): Promise<newMatcheReturn> {
    return this.model.create({ ...data, inProgress: true });
  }
}
