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
