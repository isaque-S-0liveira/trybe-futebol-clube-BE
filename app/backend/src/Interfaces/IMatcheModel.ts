import { ICRUDModelReader, ICRUDModelUpdater } from './ICRUDModel';
import IMatche from './IMatche';

export type IMatcheModel = ICRUDModelReader<IMatche> & ICRUDModelUpdater<IMatche> &
{
  filteredMatches(term: boolean): Promise<IMatche[]>,
  endMatch(id:number): Promise<number | null>;
};
