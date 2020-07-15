import {SoundPlayBtn} from '@components/sound-play-btn';
import React, {useState, FC, useCallback} from 'react';
import {StyledContent} from './style';

const Render: FC = (props) => {
  const [state, setstate] = useState(true);

  const onClose = useCallback(() => {
    // setstate(false);
    // console.log('111:', navigationRef.current?.reset());
    // navigation
  }, []);

  return (
    <StyledContent>
      <SoundPlayBtn
        title="正确"
        uri={require('../../../source/music/sound/dot/right.mp3')}
      />
      <SoundPlayBtn
        title="折叠"
        uri={require('../../../source/music/sound/dot/switch.mp3')}
      />
    </StyledContent>
  );
};

export default Render;
