import { getBearerTokenHeader } from 'store/actionCreators';
import { createBackendAxiosRequest } from 'store/requests';
import { LeaderboardSection, Rank } from 'types/leaderboard';
import { RequestReturnType } from 'types/state';
import { validateSchema } from 'validation';
import { LeaderboardSchema, RankSchema } from 'validation/leaderboard';

export const getLeaderboardSection = async (start: number, end: number, id?: string): Promise<RequestReturnType<LeaderboardSection>> => {
  const result = await createBackendAxiosRequest<LeaderboardSection>({
    method: 'GET',
    url: '/leaderboard',
    params: { start, end, id },
  });

  return validateSchema(LeaderboardSchema, result, (d) => d.data);
};

export const getLeaderboardRank = async (): Promise<RequestReturnType<Rank>> => {
  const result = await createBackendAxiosRequest<Rank>({
    method: 'GET',
    url: '/leaderboard/userrank',
    headers: getBearerTokenHeader(),
  });

  return validateSchema(RankSchema, result, (d) => d.data);
};
