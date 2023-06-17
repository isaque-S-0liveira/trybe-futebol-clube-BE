import { ICRUDModelReader, ICRUDModelUpdater } from './ICRUDModel';
import IMatche, { newMatche } from './IMatche';
import ITeam from './ITeam';

export type IMatcheModel = ICRUDModelReader<IMatche> & ICRUDModelUpdater<IMatche> &
{
  findIdTeam(id: number): Promise<ITeam | null>;
  create(data: Omit<newMatche, 'id'>): Promise<newMatche>;
  filteredMatches(term: boolean): Promise<IMatche[]>;
  endMatch(id:number): Promise<number | null>;
};
