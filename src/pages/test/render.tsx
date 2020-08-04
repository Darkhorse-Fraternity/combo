import {SoundPlayBtn} from '@components/sound-play-btn';
import React, {useState, FC, useMemo} from 'react';
import {soundsSource} from '@configure/source';
import {StyledContent} from './style';

const Render: FC = (props) => {
  const [state, setstate] = useState(true);

  const sources = useMemo(() => soundsSource(), []);

  return (
    <StyledContent>
      {Object.keys(sources).map((item) => (
        <SoundPlayBtn
          style={{margin: 20}}
          key={sources[item].title}
          title={sources[item].title}
          uri={sources[item].source}
        />
      ))}
    </StyledContent>
  );
};

export default Render;
