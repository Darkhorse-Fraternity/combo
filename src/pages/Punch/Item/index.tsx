/**
 * Created by lintong on 2018/10/11.
 * @flow
 */

import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import {
  StyledFlipCard,
  StyledCard,
  StyledCardTitle,
  StyledCardTitleView,
  StyledMaterialCommunityIcons,
  StyledButton,
  StyledIconImage,
  StyledCardDis,
  StyledInner,
  StyledFB,
  StyledFBText,
  StyledTop,
} from './style';
import svgs from '../../../../source/icons';
import Sounds from 'react-native-sound';
import { SoundsKeys, soundsSource } from '@configure/source';
import { isTablet } from 'react-native-device-info';

interface PunchItemProps {
  done: boolean;
  soundsKey?: SoundsKeys;
  openSound?: boolean;
  onPress: (flip: boolean, flipBack: () => void) => void;
  numColumns: number;
  scWidth: number;
  title: string;
  discrib: string;
  style?: StyleProp<ViewStyle>;
  showFB?: boolean;
  name?: string;
  color?: string;
}

const PunchItem: FC<PunchItemProps> = (props) => {
  const {
    title,
    // onLongPress,
    style,
    name = 'sun',
    color = '#afd2ef',
    onPress,
    discrib,
    done,
    numColumns,
    scWidth,
    openSound,
    soundsKey,
    showFB = false,
  } = props;
  // const { flip } = this.state;
  const [flip, setFlip] = useState(done);

  const firstRef = useRef(true);
  useEffect(() => {
    if (!firstRef.current) {
      setFlip(done);
    }
    firstRef.current = false;
  }, [done]);

  //     if (props.openSound && props.soundsKey) {
  //       const source = soundsSource();
  //       const data = source[props.soundsKey];
  //       if (data?.source && !props.done) {
  //         this.sound = new Sounds(data.source);
  //       }
  //     }
  const soundRef = useRef<Sounds>();
  useEffect(() => {
    if (openSound && soundsKey) {
      const data = soundsSource()[soundsKey];
      if (data?.source) {
        soundRef.current = new Sounds(data.source);
      }
    }
    return () => {
      soundRef.current?.release();
    };
  }, [openSound, soundsKey]);

  const right = isTablet() ? 15 : 10;

  // const { width, height } = Dimensions.get('window');
  const minWidth = scWidth || 0;
  // console.log('height', height);
  // console.log('width', width);
  // console.log('minWidth', minWidth);

  const itemWidth = (minWidth - 40 - right * (numColumns - 1)) / numColumns;

  const iconWidth = itemWidth / 2; // 4.0.8
  return (
    <StyledButton
      // disabled={flip}
      // onLongPress={onLongPress}
      onPress={() => {
        onPress &&
          onPress(flip, () => {
            // self.setState({ flip: !flip });
            if (!flip) {
              soundRef.current?.play();
            }
            setFlip((res) => !res);
          });
        // }
      }}>
      <StyledFlipCard
        style={style as never}
        useNativeDriver
        friction={50}
        perspective={360}
        flipHorizontal
        flipVertical={false}
        flip={flip}
        clickable={false}>
        <StyledCard
          marginRight={right}
          width={itemWidth}
          backgroundColor={color}>
          <StyledTop>
            {showFB ? (
              <StyledFB>
                <StyledFBText>副本</StyledFBText>
              </StyledFB>
            ) : (
              <View />
            )}
            <StyledCardDis>{discrib}</StyledCardDis>
          </StyledTop>
          <StyledInner height={iconWidth}>
            <StyledIconImage
              size={iconWidth}
              source={svgs[name]}
              resizeMode="contain"
            />
          </StyledInner>
          <StyledCardTitleView>
            <StyledInner height={25}>
              <StyledCardTitle
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                //   textAlignVertical="center"
                numberOfLines={1}>
                {title}
              </StyledCardTitle>
            </StyledInner>
          </StyledCardTitleView>
        </StyledCard>
        <StyledCard
          marginRight={right}
          width={itemWidth}
          backgroundColor={color}>
          <StyledCardDis style={{ color: 'white', fontWeight: '600' }}>
            +1
          </StyledCardDis>
          <StyledInner height={iconWidth}>
            <StyledMaterialCommunityIcons
              color="white"
              size={50}
              name="check-decagram"
            />
          </StyledInner>
          <StyledCardTitleView>
            <StyledInner height={25}>
              <StyledCardTitle
                style={{ color: 'white', fontWeight: '600' }}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                //   textAlignVertical="center"
                numberOfLines={1}>
                {title}
              </StyledCardTitle>
            </StyledInner>
          </StyledCardTitleView>
        </StyledCard>
      </StyledFlipCard>
    </StyledButton>
  );
};
// }

export default PunchItem;
