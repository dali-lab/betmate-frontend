/* eslint-disable new-cap */
import React, { useEffect, useRef, useState } from 'react';
import { Chessground as ChessgroundApi } from 'chessground';
import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css';

import { Api } from 'chessground/api';
import { Config } from 'chessground/config';

interface Props {
  width?: number
  height?: number
  contained?: boolean;
  config?: Partial<Config>
}

const Chessground: React.FC<Props> = ({
  width = 900, height = 900, config = {}, contained = false,
}) => {
  const [api, setApi] = useState<Api | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current && !api) {
      const chessgroundApi = ChessgroundApi(ref.current, {
        animation: { enabled: true, duration: 200 },
        ...config,
      });
      setApi(chessgroundApi);
    } else if (ref && ref.current && api) {
      api.set(config);
    }
  }, [ref]);

  useEffect(() => {
    api?.set(config);
  }, [api, config]);

  return (
    <div style={{ height: contained ? '100%' : height, width: contained ? '100%' : width }}>
      <div ref={ref} style={{ height: '100%', width: '100%', display: 'table' }} />
    </div>
  );
};

export default Chessground;
