/**
 * Created by lintong on 2017/11/20.
 * @flow
 */

import React, { FC, PureComponent, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
// import {bindActionCreators} from 'redux';
// import styled from 'styled-components';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

import Button from '../../../components/Button';
import svgs from '../../../../source/icons';
import {
  StyledContent,
  StyledRow,
  StyledRowText,
  StyledRowDes,
  StyledArrow,
  StyledRowInner,
  StyledTitleView,
  StyledTitleText,
  StyledDescirbe,
  StyledIcon,
  StyledDescirbeView,
} from './style';

import {
  StyledHeaderCover,
  StyledHeaderImage,
  StyledHeaderTitle,
  StyledHeaderInner,
  StyledHeaderInnerLeft,
  StyledHeaderInnerRight,
  StyledNickName,
  StyledHeaderIcon,
  StyledHedaderIconBack,
} from './infoStyle';

import { CircleState, DeviceEventEmitterKey } from '../../../configure/enum';
import FlipButton from '../../../components/Button/FlipButton';
import { daysText } from '../../../configure/enum';
import Avatar from '../../../components/Avatar/Avatar2';
import { PasswordValidation } from './PasswordValidation';
import { RouteKey } from '@pages/interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import {
  GetClassesICardIdResponse,
  useGetClassesICardId,
  useGetClassesIUse,
  usePostClassesIUse,
} from 'src/hooks/interface';
import { LoadAnimation } from '@components/Load';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { IUseType2, UserType } from 'src/data/data-context/interface';
import { iCardPoint, userPoint } from '@request/LCModle';
// import { NavigationInjectedProps } from '@react-navigation/native';

interface StateType {
  showModal: boolean;
  visible: boolean;
  index: number;
}

interface PropsType {
  user: UserType;
  selfUser: UserType;
  // exist: (id: number) => void;
  iCard: GetClassesICardIdResponse;
  isTourist: boolean;
  load: boolean;
  exist: boolean;
  iUseData: IUseType2;
  use: () => void;
}

type NavAndPropsType = PropsType;

const row = (title: string, des: string) => (
  <StyledRow>
    <StyledRowText>{title}</StyledRowText>
    <StyledRowDes>{des}</StyledRowDes>
  </StyledRow>
);

class CardInfoClass extends PureComponent<NavAndPropsType, StateType> {
  constructor(props: NavAndPropsType) {
    super(props);
    this.state = {
      visible: false,
      index: 0,
      showModal: false,
    };
  }

  render() {
    const {
      selfUser,
      iCard,
      user: iCardUser,
      load,
      exist,
      iUseData,
    } = this.props;

    const cover = iCard.img ? { uri: iCard.img.url } : null;

    // const exist = this.props.useExist.get('data').size >= 1;
    // const load = this.props.useExist.get('load');
    const nickName = iCardUser.nickname;
    // const { keys } = iCard;
    const { describe, iconAndColor } = iCard;
    // const iUseData = this.props.data && this.props.data.toJS();

    // const { userLoad } = this.props;

    // const imgs = iCard && iCard.imgs;

    // const urlList =
    //   (imgs &&
    //     imgs.map((item) => ({
    //       url: item.img.url,
    //     }))) ||
    //   [];

    // console.log('iconAndColor:', iconAndColor);

    const isSelf = selfUser.objectId === iCard.user.objectId;

    const { limitTimes } = iCard;
    let limitTimesString = limitTimes.join('~');
    limitTimesString =
      limitTimesString === '00:00~24:00' ? '' : `，${limitTimesString}`;
    const limitTime = daysText(iCard.recordDay) + limitTimesString;
    // console.log('iCard.img:', iCard.img);

    return (
      <StyledContent colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}>
        <PasswordValidation
          show={this.state.showModal}
          onDone={(password, pdErrorAction) => {
            if (password === iCard.password) {
              // this.props.use(iCard);
              // TODO 参与
              this.setState({ showModal: false });
              this.props.use();
            } else {
              pdErrorAction();
            }
          }}
          loading={false}
          onClose={() => {
            this.setState({ showModal: false });
          }}
        />
        {/* {iCard.img && (
          <ImagesViewModal
            visible={this.state.visible}
            index={this.state.index}
            closeCallBack={() => {
              this.setState({ visible: false, index: 0 });
            }}
            imageUrls={[{ url: iCard.img.url }, ...urlList]}
          />
        )} */}
        <FlipButton
          faceText={'马上\n参与'}
          backText="已参与"
          load={load}
          flip={exist}
          animation={Platform.OS === 'ios' ? 'bounceIn' : 'bounceInRight'}
          onPress={() => {
            if (exist && iUseData) {
              this.props.navigation.navigate('card', {
                iUseId: iUseData.objectId,
                iCardId: iCard.objectId,
              });
            } else {
              if (this.props.isTourist) {
                this.props.navigation.navigate('login');
                return Toast.show('加入圈子必须先登录哦~!');
              }

              if (iCard.password && iCard.password.length > 0 && !isSelf) {
                this.setState({ showModal: true });
              } else {
                this.props.use();
              }
            }
          }}
          containStyle={styles.containStyle}
          style={styles.flip}
        />
        <ScrollView
          // removeClippedSubviews={true}
          style={[styles.wrap]}>
          {cover ? (
            <StyledHeaderCover
              onPress={() => {
                this.setState({ visible: true });
              }}>
              <StyledHeaderImage
                resizeMode={iCard.img ? 'cover' : 'center'}
                source={cover}
              />
            </StyledHeaderCover>
          ) : (
            <StyledHedaderIconBack color={iconAndColor.color || 'blue'}>
              <StyledHeaderIcon
                resizeMode="contain"
                source={svgs[iconAndColor.name || 'sun']}
              />
            </StyledHedaderIconBack>
          )}

          <StyledHeaderInner>
            <StyledHeaderInnerLeft>
              {/* {iCard.subtitle && (
                <StyledSubTitle>{iCard.subtitle}</StyledSubTitle>
              )} */}

              <StyledHeaderTitle>{iCard.title}</StyledHeaderTitle>
              {/* {keys && (
                <StyledKeysView>
                  {keys.map((key) => `#${key}`).join(' ')}
                </StyledKeysView>
              )} */}
            </StyledHeaderInnerLeft>
            <StyledHeaderInnerRight>
              <Button
                style={{ alignItems: 'center' }}
                onPress={() => {
                  this.props.navigation.navigate('following', {
                    userId: iCardUser.objectId,
                  });
                }}>
                <Avatar user={iCardUser} />
                <StyledNickName numberOfLines={3}>{nickName}</StyledNickName>
              </Button>
              {/* {this.__renderFocusOn()} */}
            </StyledHeaderInnerRight>
          </StyledHeaderInner>

          <View style={{ height: 50 }} />

          <StyledTitleView>
            <StyledTitleText>卡片介绍</StyledTitleText>
          </StyledTitleView>

          {row('加入费用:', iCard.price === 0 ? '免费' : `${iCard.price}元`)}
          {row(
            '是否开启圈子:',
            iCard.state !== CircleState.open ? '关闭' : '开启',
          )}
          {row(
            '提醒时间:',
            iCard.notifyTimes.length > 0 ? iCard.notifyTimes.join('、') : '无',
          )}
          {/* {row('关键字:', iCard.keys.join("+"))} */}
          {row('打卡时间:', limitTime)}
          {/* {row("习惯周期:", `${iCard.period}次`)} */}
          {row('打卡要求:', iCard.record?.join('+') || '默认点击')}
          {row('创建时间:', moment(iCard.createdAt).format('MMM YYYY'))}
          <Button
            onPress={() => {
              this.props.navigation.navigate('cardUse', {
                iCardId: iCard.objectId,
              });
            }}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {row('参与人数:', iCard.useNum + '')}
            <StyledIcon
              size={15}
              style={{ marginTop: 5 }}
              name="ios-arrow-forward"
            />
          </Button>
          {/* {rowTouch('使用人数:', iCard.useNum + '人', () => [])} */}

          {describe && (
            <StyledDescirbeView>
              <StyledDescirbe>{describe}</StyledDescirbe>
            </StyledDescirbeView>
          )}

          {/* {imgs &&
            imgs.map((item, index) => (
              <TouchableHighlight
                key={item.img.url + index}
                onPress={() => [
                  this.setState({ visible: true, index: index + 1 }),
                ]}>
                <StyledImg
                  width={Dimensions.get('window').width - 50}
                  source={{ uri: item.img.url }}
                />
              </TouchableHighlight>
            ))} */}
          <View style={{ height: 200 }} />
        </ScrollView>
      </StyledContent>
    );
  }
}

const CardInfo: FC<{}> = (props): JSX.Element => {
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cardInfo>();
  const { user } = useGetInfoOfMe();
  const { data: iCard } = useGetClassesICardId({
    id: iCardId,
    include: 'user',
  });

  //查询是否已参与

  // where: {
  //   ...iCard(id),
  //   ...dispatch(selfUser()),
  //   statu: { $ne: 'del' },
  // },

  //判断是否有该习惯
  const { data } = useGetClassesIUse((res) => ({
    count: '1',
    limit: '1',
    where: JSON.stringify({
      user: userPoint(user.objectId), //粉丝查看也是这个入口，此时userid 不为自己
      // ...iCardM(iCardId),
      iCard: iCardPoint(iCardId),
      statu: { $ne: 'del' },
    }),
    ...res,
  }));

  // 添加习惯
  const { run, loading } = usePostClassesIUse(
    {
      user: userPoint(user.objectId), //粉丝查看也是这个入口，此时userid 不为自己
      // ...iCardM(iCardId),
      iCard: iCardPoint(iCardId),
    },
    { manual: true },
  );

  const [hasJoin, setHasJoin] = useState(false);
  const addUse = async () => {
    const res = await run();
    res.objectId && setHasJoin(true);
    DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload, {});
  };

  if (!data || !iCard) {
    return <LoadAnimation />;
  }
  const { count = 0, results = [] } = data;

  return (
    <CardInfoClass
      {...props}
      iCard={iCard}
      user={iCard.user as UserType}
      selfUser={user}
      isTourist={user.isTourist}
      exist={count > 0 || hasJoin}
      iUseData={results[0]}
      load={loading}
      use={addUse}
    />
  );
};

export default CardInfo;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 25,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: width * 0.7,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginLeft: 18,
    fontSize: 17,
    color: 'rgb(100,100,100)',
  },
  btn: {
    // marginBottom: 7，
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fdd83c',
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4e4e4',
  },
  btnText: {
    color: 'white',
    fontSize: 17,
  },
  arrowView: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderRightWidth: StyleSheet.hairlineWidth * 2,
    borderColor: '#8c8c85',
    transform: [{ rotate: '315deg' }],
    marginRight: 5,
    width: 10,
    height: 10,
  },
  title: {
    color: 'rgb(50,50,50)',
    fontSize: 18,
  },
  des: {
    color: 'rgb(50,50,50)',
    fontSize: 19,
  },
  flip: {
    position: 'absolute',
    zIndex: 100,
    bottom: 50,
    right: 15,
  },
  containStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
