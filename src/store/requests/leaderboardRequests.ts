import { getBearerTokenHeader } from 'store/actionCreators';
import { createBackendAxiosRequest } from 'store/requests';
import { RequestReturnType } from 'types/state';

export interface Rank {
  user_id: string
  user_name: string
  rank: number
  winnings: number
}

export interface LeaderboardSection {
  _id: string
  rankings: Rank[]
  rankings_size: number
}

export const getLeaderboardSection = async (start: number, end: number): Promise<RequestReturnType<LeaderboardSection>> => {
  const result = await createBackendAxiosRequest<LeaderboardSection>({
    method: 'GET',
    url: '/leaderboard',
    params: { start, end },
  });
  // Validation here
  return result;
};

export const getLeaderboardRank = async (): Promise<RequestReturnType<Rank>> => {
  const result = await createBackendAxiosRequest<Rank>({
    method: 'GET',
    url: '/leaderboard/userrank',
    headers: getBearerTokenHeader(),
  });

  return result;
};
