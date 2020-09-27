/**
 * Created by lintong on 2017/11/20.
 * @flow
 */

import * as immutable from 'immutable';
import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Easing,
  Modal,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
// import styled from 'styled-components';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import ImagesViewModal from '../../../components/ZoomImage/ImagesViewModal';
import { ICARD, USER, IUSE, IUSEExist, COURSE } from '../../../redux/reqKeys';
import { getUserByID, classSearch } from '../../../request/leanCloud';
import { req, requestSucceed } from '../../../redux/actions/req';
import { selfUser, iCard, user, pointModel } from '../../../request/LCModle';
import { add } from '../../../redux/module/leancloud';
import { addListNormalizrEntity } from '../../../redux/actions/list';
import { addNormalizrEntity } from '../../../redux/module/normalizr';
import { user as UserEntity, schemas } from '../../../redux/scemes';
import Button from '../../../components/Button';
import { list, entitys } from '../../../redux/scemes';
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
  StyledCourseView,
  StyledKeysView,
  StyledDescirbe,
  StyledImg,
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
  StyledSubTitle,
  StyledHeaderIcon,
  StyledHedaderIconBack,
} from './infoStyle';

import { Privacy, CircleState } from '../../../configure/enum';
import FlipButton from '../../../components/Button/FlipButton';
import { findByID, find } from '../../../redux/module/leancloud';
import { easyPay } from '../../../redux/module/pay';
import { daysText } from '../../../configure/enum';
import Avatar from '../../../components/Avatar/Avatar2';
import { PasswordValidation } from './PasswordValidation';
import { User } from '@interface/index';
import { NavigationInjectedProps } from '@react-navigation/native';

interface StateType {
  showModal: boolean;
  visible: boolean;
  index: number;
}

interface PropsType {
  useExist: boolean;
  user: User;
  exist: (id: number) => void;
}

interface NavigationParams {
  iCardId: number;
}

type NavAndPropsType = PropsType & NavigationInjectedProps<NavigationParams>;

@connect(
  (state, props) => {
    const { iCardId } = props.route.params;
    const iCard = state.normalizr.get(ICARD).get(iCardId);
    const userId = iCard && iCard.get('user');
    // console.log('iCardId:', iCardId);
    return {
      // data:state.req.get()
      iCard,
      user: userId && state.normalizr.get(USER).get(userId),
      userLoad: state.req.get(USER).get('load'),
      useExist: state.req.get(IUSEExist),
      data: state.normalizr
        .get(IUSE)
        .get(state.req.get(IUSEExist).get('data').get('0')),
      dataId: state.req.get(IUSEExist).get('data').get('0'),
      course: iCard && state.normalizr.get(COURSE).get(iCard.get('course')),
      selfUse: state.user.data,
      isTourist: state.user.isTourist,
    };
  },
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch),
    loadCard: () => {
      const { iCardId } = props.route.params;
      dispatch(
        find(
          ICARD,
          {
            where: {
              objectId: iCardId,
            },
            limit: 1,
            include: 'user,course',
          },
          { sceme: list(entitys[ICARD]) },
        ),
      );
    },
    loadCourse: (course) => {
      if (course && !course.get('title')) {
        const id = course.get('objectId');
        dispatch(findByID(COURSE, id));
      }
    },
    loadUser: (iCardUser) => {
      if (!iCardUser.nickname && iCardUser.objectId) {
        const param = getUserByID(iCardUser.objectId);
        dispatch(req(param, USER, { sceme: UserEntity }));
      }
    },
    use: async (card) => {
      const param = {
        // cycle: 0,
        time: 0,
        privacy: Privacy.open, // 对外开放
        statu: 'start',
        // notifyTime:option&&option.notifyTime||"20.00",
        doneDate: { __type: 'Date', iso: moment('2017-03-20') },
        ...dispatch(selfUser()),
        ...iCard(card.objectId),
        // include: 'avatar'
      };
      const res = await dispatch(add(param, IUSE));
      const entity = {
        ...param,
        ...res,
      };
      dispatch(addListNormalizrEntity(IUSE, entity));
      dispatch(
        addNormalizrEntity(ICARD, {
          ...card,
          useNum: card.useNum + 1,
        }),
      );
      dispatch(requestSucceed(IUSEExist, [res.objectId]));
      // props.navigation.goBack()
      Toast.show(`你接受了一个卡片${card.title}`);
    },
    exist: async (id) => {
      const params = classSearch(IUSE, {
        where: {
          ...iCard(id),
          ...dispatch(selfUser()),
          statu: { $ne: 'del' },
        },
      });
      dispatch(req(params, IUSEExist, { sceme: schemas[IUSE] }));
    },
    joinPay: async (price, title, bid) => {
      const description = `圈子_${title}的加入费用`;
      return dispatch(easyPay(price, description, 'joinCard', bid));
    },
  }),
)
export default class CardInfo extends PureComponent<
NavAndPropsType,
StateType
> {
  constructor(props: NavAndPropsType) {
    super(props);
    this.state = {
      visible: false,
      index: 0,
      showModal: false,
    };
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    (props) => ({});

  componentDidMount() {
    if (!this.props.iCard) {
      this.props.loadCard();
    }
    if (this.props.user) {
      this.props.loadUser(this.props.user.toJS());
    }
    this.props.exist(this.props.route.params.iCardId);
    this.props.loadCourse(this.props.course);
  }

  componentWillReceiveProps(nextProps: NavAndPropsType) {
    if (nextProps.user !== this.props.user) {
      this.props.exist(this.props.route.params.iCardId);
    }
  }

  // shouldComponentUpdate(nextProps: Object) {
  //     return !immutable.is(this.props, nextProps)
  // }

  row = (title, des) => (
    <StyledRow>
      <StyledRowText>{title}</StyledRowText>
      <StyledRowDes>{des}</StyledRowDes>
    </StyledRow>
  );

  rowTouch = (title, des, onPress) => (
    <Button onPress={onPress}>
      <StyledRow>
        <StyledRowText>{title}</StyledRowText>

        <StyledRowInner>
          <StyledRowDes>{des}</StyledRowDes>
          <StyledArrow />
        </StyledRowInner>
      </StyledRow>
    </Button>
  );

  _renderCourse = (course) => <StyledCourseView />; // console.log('course:', course);

  render(): ReactElement<any> {
    if (!this.props.iCard) {
      return null;
    }

    const { selfUse, joinPay } = this.props;

    const iCard = this.props.iCard.toJS();
    const iCardUser = this.props.user.toJS();

    const cover = iCard.img ? { uri: iCard.img.url } : null;

    const exist = this.props.useExist.get('data').size >= 1;
    const load = this.props.useExist.get('load');
    const nickName = iCardUser.nickname;
    const { keys } = iCard;
    const { describe, iconAndColor } = iCard;
    const iUseData = this.props.data && this.props.data.toJS();

    const { userLoad } = this.props;

    // let { course } = this.props
    // course = course && course.toJS()

    const imgs = iCard && iCard.imgs;

    const urlList =
      (imgs &&
        imgs.map((item) => ({
          url: item.img.url,
        }))) ||
      [];

    // console.log('iconAndColor:', iconAndColor);

    const isSelf = selfUse.objectId === iCard.user;

    let { limitTimes } = iCard;
    limitTimes = (limitTimes && limitTimes.join('~')) || '';
    limitTimes = limitTimes === '00:00~24:00' ? '' : `，${limitTimes}`;
    const limitTime = daysText(iCard.recordDay) + limitTimes;
    // console.log('iCard.img:', iCard.img);

    return (
      <StyledContent
        colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}
        forceInset={{ top: 'never' }}>
        <PasswordValidation
          show={this.state.showModal}
          onDone={(password, pdErrorAction) => {
            if (password === iCard.password) {
              this.props.use(iCard);
              this.setState({ showModal: false });
            } else {
              pdErrorAction();
            }
          }}
          loading={false}
          onClose={() => {
            this.setState({ showModal: false });
          }}
        />
        {iCard.img && (
          <ImagesViewModal
            visible={this.state.visible}
            index={this.state.index}
            closeCallBack={() => {
              this.setState({ visible: false, index: 0 });
            }}
            imageUrls={[{ url: iCard.img.url }, ...urlList]}
          />
        )}
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
                this.props.use(iCard);
              }
            }
          }}
          containStyle={styles.containStyle}
          style={styles.flip}
        />
        <ScrollView
          // removeClippedSubviews={true}
          style={[this.props.style, styles.wrap]}>
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
              <StyledHedaderIconBack color={iconAndColor.color}>
                <StyledHeaderIcon
                  resizeMode="contain"
                  source={svgs[iconAndColor.name]}
                />
              </StyledHedaderIconBack>
            )}

          <StyledHeaderInner>
            <StyledHeaderInnerLeft>
              {iCard.subtitle && (
                <StyledSubTitle>{iCard.subtitle}</StyledSubTitle>
              )}

              <StyledHeaderTitle>{iCard.title}</StyledHeaderTitle>
              {keys && (
                <StyledKeysView>
                  {keys.map((key) => `#${key}`).join(' ')}
                </StyledKeysView>
              )}
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

          {this.row(
            '加入费用:',
            iCard.price === 0 ? '免费' : `${iCard.price}元`,
          )}
          {this.row(
            '是否开启圈子:',
            iCard.circleState !== CircleState.open ? '关闭' : '开启',
          )}
          {this.row(
            '提醒时间:',
            iCard.notifyTimes.length > 0 ? iCard.notifyTimes.join('、') : '无',
          )}
          {/* {this.row('关键字:', iCard.keys.join("+"))} */}
          {this.row('打卡时间:', limitTime)}
          {/* {this.row("习惯周期:", `${iCard.period}次`)} */}
          {this.row('打卡要求:', iCard.record.join('+') || '默认点击')}
          {this.row('创建时间:', moment(iCard.createdAt).format('MMM YYYY'))}
          <Button
            onPress={() => {
              !userLoad &&
                this.props.navigation.navigate('cardUse', {
                  iCardId: iCard.objectId,
                });
            }}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {this.row('参与人数:', iCard.useNum)}
            <StyledIcon
              size={15}
              style={{ marginTop: 5 }}
              name="ios-arrow-forward"
            />
          </Button>
          {/* {this.rowTouch('使用人数:', iCard.useNum + '人', () => [])} */}
          {/* {course && course.title && this._renderCourse(course)} */}

          {describe && (
            <StyledDescirbeView>
              <StyledDescirbe>{describe}</StyledDescirbe>
            </StyledDescirbeView>
          )}

          {imgs &&
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
            ))}
          <View style={{ height: 200 }} />
        </ScrollView>
      </StyledContent>
    );
  }
}

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
