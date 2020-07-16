import {SoundPlayBtn} from '@components/sound-play-btn';
import React, {FC, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {soundsSource} from 'src/configure/source';
// import {StyledContent} from './style';
import styled from 'styled-components/native';

export const StyledContent = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px 20px;
`;

interface RenderSoundsType {
  color: string;
}

export const RenderSounds: FC<RenderSoundsType> = ({color}) => {
  const sources = useMemo(() => soundsSource(), []);

  return (
    <StyledContent>
      {Object.keys(sources).map((item) => (
        <SoundPlayBtn
          progressColor={color}
          style={styles.SoundPlayBtn}
          key={sources[item].title}
          title={sources[item].title}
          uri={sources[item].source}
        />
      ))}
    </StyledContent>
  );
};

const styles = StyleSheet.create({
  SoundPlayBtn: {
    marginRight: 10,
  },
});
