import {SoundPlayBtn} from '@components/sound-play-btn';
import React, {FC, useMemo, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {soundsIncentiveSource, soundsNormalSource} from 'src/configure/source';
// import {StyledContent} from './style';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {shadeBlend} from 'helps/util';
import * as Animatable from 'react-native-animatable';
interface RenderSoundsType {
  color: string;
  sound: string;
}

export const RenderSounds: FC<RenderSoundsType> = ({color}) => {
  const sources = useMemo(() => soundsNormalSource(), []);
  const incentiveSources = useMemo(() => soundsIncentiveSource(), []);

  const [openSounds, setOpenSounds] = useState(true);

  const propsColor = Platform.select({
    ios: {trackColor: {false: color, true: color}},
    android: {
      thumbColor: openSounds ? color : '#f6f7f9',
      trackColor: {
        true: shadeBlend(0.75, color),
        false: shadeBlend(0.75, color),
      },
    },
  });

  return (
    <>
      <StyledSubTitle>
        <StyledRowInner>
          <Icon size={30} color={'#333333'} name="musical-notes-outline" />
          <StyledSubTitleText>开启打卡音效</StyledSubTitleText>
        </StyledRowInner>
        <StyledSwitch
          {...propsColor}
          value={openSounds}
          onValueChange={(value) => {
            setOpenSounds(value);
          }}
        />
      </StyledSubTitle>

      {openSounds && (
        <>
          <Animatable.View animation="fadeInUp" delay={300}>
            <StyledSubTitle2>普通</StyledSubTitle2>
            <StyledSoundMain>
              {Object.keys(sources).map((item) => (
                <SoundPlayBtn
                  progressColor={color}
                  style={styles.SoundPlayBtn}
                  key={sources[item].title}
                  title={sources[item].title}
                  uri={sources[item].source}
                />
              ))}
            </StyledSoundMain>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={600}>
            <StyledSubTitle2>鼓励</StyledSubTitle2>
            <StyledSoundMain>
              {Object.keys(incentiveSources).map((item) => (
                <SoundPlayBtn
                  progressColor={color}
                  style={styles.SoundPlayBtn}
                  key={incentiveSources[item].title}
                  title={incentiveSources[item].title}
                  uri={incentiveSources[item].source}
                />
              ))}
            </StyledSoundMain>
          </Animatable.View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  SoundPlayBtn: {
    marginRight: 10,
  },
});

export const StyledContent = styled.View`
  flex: 1;
`;

export const StyledSoundMain = styled.View`
  flex-direction: row;
  padding: 10px 20px 0px 20px;
`;

export const StyledSubTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.titleBackViewColor};
  border-radius: 10px;
  padding: 10px 8px;
  margin: 10px 20px 0px 20px;
`;
export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`;
// export const StyledIcon = styled(Icon)`
//   align-self: center;
// `;

export const StyledSubTitleText = styled.Text`
  font-size: 17px;
  margin-left: 10px;
  color: #333333;
`;

export const StyledSwitch = styled.Switch``;

export const StyledSubTitle2 = styled.Text`
  font-size: 15px;
  margin: 20px 0px 0px 5px;
  padding: 5px 20px;
  color: #333333;
`;
