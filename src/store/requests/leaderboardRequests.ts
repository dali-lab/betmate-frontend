import { getBearerTokenHeader } from 'store/actionCreators';
import { createBackendAxiosRequest } from 'store/requests';
import { LeaderboardSection, Rank } from 'types/leaderboard';
import { RequestReturnType } from 'types/state';

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
