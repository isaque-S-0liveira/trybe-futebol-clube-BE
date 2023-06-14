import SequelizeTeam from '../database/models/TeamsModel';
import ITeam from '../Interfaces/ITeam';
import { ICRUDModelReader } from '../Interfaces/ICRUDModel';

export default class TeamModel implements ICRUDModelReader<ITeam> {
  private model = SequelizeTeam;
  async findAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbData = this.model.findByPk(id);
    if (dbData == null) return null;
    return dbData;
  }
}
