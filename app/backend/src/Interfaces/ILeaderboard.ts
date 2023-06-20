import ITeam from './ITeam';

export type TMatchResults = {
  victories: number;
  losses: number;
  draws: number;
  goalsFavor: number;
  goalsOwn: number;
};

export type TMatchesGoals = {
  gols: number;
  golsSofridos: number;
};

export type TMatch = {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

export type TTeamsAndMatches = ITeam & {
  homeMatches: TMatch[];
};

export type TLeaderboard = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number,
  efficiency: number,
};
