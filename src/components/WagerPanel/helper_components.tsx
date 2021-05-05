import React from 'react';

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
  white: number,
  draw: number,
  black: number,
}

export const WDLBar: React.FC<WDLBarProps> = (props) => {
  return (
    <div className="wdl-bar-container">
      <div style={{ background: 'white', width: `${props.white}%` }} />
      <div style={{ background: 'grey', width: `${props.draw}%` }} />
      <div style={{ background: 'black', width: `${props.black}%` }} />
    </div>
  );
};
