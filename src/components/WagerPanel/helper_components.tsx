import React from 'react';
import { GameOdds } from 'types/resources/game';

interface VerticalBarProps {
  color: string,
  maxPercentage: number,
  percentage: number,
}

export const VerticalBar: React.FC<VerticalBarProps> = (props) => {
  return (
    <div className="vertical-bar-container">
      <div style={{
        height: 40 * (props.percentage / props.maxPercentage),
        background: props.color,
      }} />
    </div>
  );
};

interface WDLBarProps {
  odds: GameOdds,
}

export const WDLBar: React.FC<WDLBarProps> = (props) => {
  return (
    <div className="wdl-bar-container">
      <div style={{ background: 'white', width: `${props.odds.white_win * 100}%` }} />
      <div style={{ background: 'grey', width: `${props.odds.draw * 100}%` }} />
      <div style={{ background: 'black', width: `${props.odds.black_win * 100}%` }} />
    </div>
  );
};
