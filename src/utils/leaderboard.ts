import { Rank } from 'types/leaderboard';

export const getFirstRank = (r: Rank[]): number => r[0].rank;
export const getLastRank = (r: Rank[]): number => r[r.length - 1].rank;
