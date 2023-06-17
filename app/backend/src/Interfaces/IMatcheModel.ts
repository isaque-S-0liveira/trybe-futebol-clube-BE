import { ICRUDModelReader, ICRUDModelUpdater } from './ICRUDModel';
import IMatche, { newMatche } from './IMatche';

export type IMatcheModel = ICRUDModelReader<IMatche> & ICRUDModelUpdater<IMatche> &
{

  create(data: Omit<newMatche, 'id'>): Promise<newMatche>;
  filteredMatches(term: boolean): Promise<IMatche[]>;
  endMatch(id:number): Promise<number | null>;
};
