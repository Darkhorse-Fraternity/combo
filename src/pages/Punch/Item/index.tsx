/**
 * Created by lintong on 2018/10/11.
 * @flow
 */

import React, {PureComponent} from 'react';
import {View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import {debounce} from 'lodash';
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
import {soundsSource, SoundsType} from 'src/configure/source';
import {isTablet} from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
const minWidth = Math.min(width, height);

interface PunchItemProps {
  done: boolean;
  soundsKey?: string;
  openSound?: boolean;
  onPress: (flip: boolean, flipBack: () => void, sound: () => void) => void;
  numColumns: number;
}

interface PunchItemState {
  flip: boolean;
}

export default class PunchItem extends PureComponent<
  PunchItemProps,
  PunchItemState
> {
  constructor(props: PunchItemProps) {
    super(props);
    if (props.openSound && props.soundsKey) {
      const source = soundsSource();
      const data = source[props.soundsKey] as SoundsType;
      if (data?.source) {
        this.sound = new Sounds(data?.source);
      }
    }
    this.state = {
      flip: props.done,
    };
  }

  sound?: Sounds;
  static propTypes = {
    title: PropTypes.string,
    done: PropTypes.bool,
    name: PropTypes.string,
    color: PropTypes.string,
    showFB: PropTypes.bool,
  };

  static defaultProps = {
    done: false,
    name: 'sun',
    color: '#afd2ef',
    showFB: false,
  };

  flipDo = () => {
    if (this.props.done !== this.state.flip) {
      // console.log('title2:', this.props.title);
      // console.log('flip2:', this.props.done);
      this.setState({flip: this.props.done});
    }
  };

  debounceFlip = debounce(this.flipDo, 1000, {leading: false, trailing: true});

  componentWillReceiveProps(nextProps) {
    // TODO： 这边这样设置会有反复哦，所以这边就先避免了

    // const debounceFlip = debounceFlipConfig(nextProps,this.state)

    this.debounceFlip();
  }

  componentWillUnmount() {
    this.sound && this.sound.release();
  }

  render() {
    const {
      title,
      done,
      onLongPress,
      style,
      name,
      color,
      onPress,
      discrib,
      showFB,
    } = this.props;
    const {flip} = this.state;

    const self = this;

    const right = isTablet() ? 15 : 10;

    const itemWidth =
      (minWidth - 40 - right * (this.props.numColumns - 1)) /
      this.props.numColumns;
    const iconWidth = itemWidth / 2; // 4.0.8
    return (
      <StyledButton
        // disabled={flip}
        onLongPress={onLongPress}
        onPress={() => {
          // if (!flip) {
          //   if (!flip) {

          //   }

          onPress &&
            onPress(
              flip,
              () => {
                self.setState({flip: !flip});
              },
              () => {
                console.log('???', this.props.soundsKey);

                this.sound && this.sound.play();
              },
            );
          // }
        }}>
        <StyledFlipCard
          style={style}
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
            <StyledCardDis style={{color: 'white', fontWeight: '600'}}>
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
                  style={{color: 'white', fontWeight: '600'}}
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
  }
}
