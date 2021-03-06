import {
  FeedWager, Wager, WagerStatus,
} from 'types/resources/wager';
import { getMultiplier } from 'utils/chess';

export const createResolvedFeedWager = (wager: Wager): FeedWager => ({
  ...wager,
  time: wager.updated_at,
  odds: wager.wdl ? wager.odds : wager.winning_pool_share ?? 1,
  type: 'wager',
});

export const createFeedWagers = (wager: Wager): FeedWager[] => ([
  {
    ...wager, time: wager.created_at, status: WagerStatus.PENDING, type: 'wager',
  },
  ...(wager.resolved ? [createResolvedFeedWager(wager)] : []),
]);

const onWDLWagerCreate = (data: string, amount: number, odds: number): string => (
  `You made a $${amount} bet with ${getMultiplier(odds)}x odds for ${data.replace('_', ' to ')}`
);

const onMoveWagerCreate = (data: string, amount: number): string => (
  `You made a $${amount} pool bet on ${data}`
);

const onWagerWin = (data: string, wdl: boolean, amount: number, odds: number): string => (
  `You won $${(amount * odds).toFixed(2)} from your $${amount}${!wdl ? ' pool' : ''} bet on ${data.replace('_', ' to ')}`
);

const onWagerLost = (data: string, wdl: boolean, amount: number): string => (
  `You lost your $${amount}${!wdl ? ' pool' : ''} bet on ${data.replace('_', ' to ')}`
);

const onWagerCancelled = (data: string, wdl: boolean, amount: number): string => (
  `Your $${amount}${!wdl ? ' pool' : ''} bet on ${data} was cancelled as no one was correct`
);

export const getFeedMessage = (status: WagerStatus, data: string, wdl: boolean, amount: number, odds: number): string => {
  switch (status) {
    case WagerStatus.PENDING:
      return wdl
        ? onWDLWagerCreate(data, amount, odds)
        : onMoveWagerCreate(data, amount);
    case WagerStatus.WON:
      return onWagerWin(data, wdl, amount, odds);
    case WagerStatus.LOST:
      return onWagerLost(data, wdl, amount);
    case WagerStatus.CANCELLED:
      return onWagerCancelled(data, wdl, amount);
    default:
      return '';
  }
};
