import {
  TMatchResults,
  TMatchesGoals,
  TMatch,
  TTeamsAndMatches,
  TLeaderboard } from '../Interfaces/ILeaderboard';

const organize = (homeMatches: TMatch[]): TMatchesGoals[] => homeMatches.map((mt) => ({
  gols: mt.homeTeamGoals,
  golsSofridos: mt.awayTeamGoals,
}));

const generateResults = (matches: TMatchesGoals[]): TMatchResults => {
  const matchResult: TMatchResults = {
    victories: 0,
    draws: 0,
    losses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  };

  matches.forEach((match) => {
    const { gols, golsSofridos } = match;

    matchResult.goalsFavor += gols;
    matchResult.goalsOwn += golsSofridos;

    if (gols > golsSofridos) matchResult.victories += 1;
    if (gols < golsSofridos) matchResult.losses += 1;

    matchResult.draws += 1;
  });

  return matchResult;
};

const resultExpected = (matches: TTeamsAndMatches[]): TLeaderboard[] => matches.map((el) => {
  const organized = organize(el.homeMatches);
  const result = generateResults(organized);
  const totalPoints = result.victories * 3 + result.draws;
  const SaldoDeGols = result.goalsFavor - result.goalsOwn;
  const efficiency = ((totalPoints / (organize.length * 3)) * 100).toFixed(2);

  return {
    name: el.teamName,
    totalPoints,
    totalGames: organized.length,
    totalVictories: result.victories,
    totalDraws: result.draws,
    totalLosses: result.losses,
    goalsFavor: result.goalsFavor,
    goalsOwn: result.goalsOwn,
    goalsBalance: SaldoDeGols,
    efficiency: Number(efficiency),
  };
});

export default {
  organize,
  resultExpected,
};
