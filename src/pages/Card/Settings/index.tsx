/**
 * Created by lintong on 2018/4/13.
 * @flow
 */

import React, { FC, PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableNativeFeedback,
  Image,
  Alert,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  StyledContent,
  StyledBottomMenu,
  StyledBottomMenuText,
  StyledIcon,
  StyledRow,
  StyledRowText,
  StyledRowDes,
  StyledRowTouch,
  StyledBottomMenuButton,
  StyeldDoneView,
  StyledActivityIndicator,
  StyledBtn,
  StyledHeader,
  StyledEntypoIcon,
  StyledBtnTitle,
} from './style';

// import ShareView from '../../../components/Share/ShareView'
// import Pop from '../../../components/Pop'
import { popToIndex } from '../../../redux/nav';

import { update } from '../../../redux/module/leancloud';

import { IUSE, IRECORD } from '../../../redux/reqKeys';
import { claerByID, addListNormalizrEntity } from '../../../redux/actions/list';
import { addNormalizrEntity } from '../../../redux/module/normalizr';

import { classUpdate } from '../../../request/leanCloud';
import { req } from '../../../redux/actions/req';


// const { width } = Dimensions.get('window');

interface RenderItemType {
  title: string;
  name: string;
  load?: boolean;
  size?: number;
  onPress: () => void;
  Icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}

const RenderItem: FC<RenderItemType> = (props) => {
  const {
    title,
    name,
    load = false,
    size = 30,
    onPress,
    Icon = StyledIcon,
    style
  } = props;
  console.log('style', style);

  return (
    <StyledBottomMenuButton
      style={style}
      disabled={load}
      hitSlop={{
        top: 10,
        left: 20,
        bottom: 10,
        right: 10,
      }}
      onPress={onPress}>
      {load ? <StyledActivityIndicator color={'gray'} /> : <Icon size={size} name={name} />}
      <StyledBottomMenuText>{title}</StyledBottomMenuText>
    </StyledBottomMenuButton>
  );
};


const Archive = `${IUSE}archive`;

@connect(
  (state, props) => ({
    user: state.user.data,
    iCard: state.normalizr.get('iCard').get(props.route.params.iCardId),
    iUse: state.normalizr.get('iUse').get(props.route.params.iUseId),
    iUseLoad: state.req.get(IUSE).get('load'),
    archive: state.req.get(Archive),
    // updatePrivacyLoad: state.req.get('updatePrivacy') && state.req.get('updatePrivacy').get('load'),
  }),
  (dispatch, props) => ({
    refresh: async (data) => {
      const id = data.objectId;
      const card = props.route.params.iCard;

      // const isDone = data.time % card.period === 0

      const param = {
        // time: isDone ? 0 : data.time,
        statu: 'start',
        // cycle: isDone ? data.cycle + 1 : data.cycle,
      };

      const lParams = classUpdate(IUSE, id, param);
      const res = await dispatch(req(lParams, Archive));
      const entity = {
        ...param,
        ...res,
      };
      dispatch(addListNormalizrEntity(IUSE, entity));
      dispatch(claerByID(IRECORD, id));
      // props.navigation.goBack()
      // props.navigation.goBack()
      // props.navigation.navigate('habit')
    },
    stop: async (data) => {
      const id = data.objectId;
      const param = {
        statu: 'stop',
        // cycle,
      };
      const lParams = classUpdate(IUSE, id, param);
      const res = await dispatch(req(lParams, Archive));
      const entity = {
        ...param,
        ...res,
      };

      dispatch(addNormalizrEntity(IUSE, entity));
      dispatch(claerByID(IUSE, id));
      props.navigation.dispatch(popToIndex());
    },
    delete: async (objectId, isFb) => {
      // await remove(objectId,IUSE)
      // 做伪删除
      if (isFb) {
        Alert.alert(
          '主人，我正参与副本活动，不可以被删除哦～！',
          '等活动结束后再来吧。',
          [{ text: '知道了' }],
        );
        return;
      }

      Alert.alert('确定删除?', '删除后不可恢复~！', [
        { text: '取消' },
        {
          text: '确定',
          onPress: async () => {
            const param = {
              statu: 'del',
            };
            const res = await dispatch(update(objectId, param, IUSE));
            const entity = {
              ...param,
              ...res,
            };
            dispatch(addNormalizrEntity(IUSE, entity));
            dispatch(claerByID(IUSE, objectId));
            dispatch(claerByID(IRECORD, objectId));
            // props.navigation.goBack()
            props.navigation.dispatch(popToIndex());
          },
        },
      ]);
    },
  }),
)
export default class Settings extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  // _renderDoneView = (done, over) => {
  //   return (
  //     <StyeldDoneView/>
  //   )
  // }

  static navigationOptions = (props) => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    const { iCardId } = props.route.params;
    return {
      title: '',
      headerRight: (porps) => (
        <StyledBtn
          // backgroundColor={iCard.iconAndColor && iCard.iconAndColor.color}
          hitSlop={{
            top: 5,
            left: 20,
            bottom: 5,
            right: 20,
          }}
          onPress={() => {
            props.navigation.navigate('cardInfo', { iCardId });
          }}>
          <StyledBtnTitle>查看</StyledBtnTitle>
        </StyledBtn>
      ),
      // headerStyle: {
      //     backgroundColor: '#f5fcff',
      //     shadowColor: '#F5FCFF',
      //     borderBottomColor: '#F5FCFF',
      // },
    };
  };



  _renderRresh = (reflesh, iUse) => {
    const text = !reflesh ? '暂停打卡' : '继续打卡';
    const archiveLoad = this.props.archive && this.props.archive.get('load');

    return (
      <RenderItem
        load={archiveLoad}
        onPress={() => {
          !reflesh ? this.props.stop(iUse) : this.props.refresh(iUse);
        }}
        Icon={StyledIcon}
        name={!reflesh ? 'md-pause' : 'md-refresh'}
        title={text}
      />
    );
  };

  _renderBottomMenu = () => {
    const iCard = this.props.iCard.toJS();
    const iUse = this.props.iUse.toJS();
    const { navigation, user } = this.props;

    // const pUse = this.props.iUse && this.props.iUse.toJS()
    // iUse = pUse || iUse

    const reflesh = iUse.statu === 'stop';

    return (
      <StyledBottomMenu>
        {iCard.user === user.objectId &&
          iCard.state !== -2 &&
          iUse.statu !== 'del' && (
            <RenderItem
              onPress={() => {
                navigation.navigate('cardConfig', { iCardId: iCard.objectId });
              }}
              name="md-settings"
              title="卡片配置"
            />
          )}
        {this._renderRresh(reflesh, iUse)}

        <RenderItem
          style={{ marginRight: 0 }}
          onPress={() => {
            this.props.delete(iUse.objectId, iUse.isFb);
          }}
          load={this.props.iUseLoad}
          name="md-trash"
          title="删除卡片"
        />
        {/* <View style={{ width: (Dimensions.get('window').width - 85) / 3 }} /> */}
      </StyledBottomMenu>
    );
  };

  row = (title, des) => (
    <StyledRow>
      <StyledRowText>{title}</StyledRowText>
      <StyledRowDes>{des}</StyledRowDes>
    </StyledRow>
  );

  rowTouch = (title, des, onPress) => (
    <StyledRowTouch onPress={onPress}>
      {/* <StyledRowText> */}
      {/* {title} */}
      {/* </StyledRowText> */}
      <StyledRowDes>{des}</StyledRowDes>
      {/* <StyledRowInner> */}

      {/* <StyledArrow/> */}
      {/* </StyledRowInner> */}
    </StyledRowTouch>
  );

  render() {
    return (
      <StyledContent>
        <StyledHeader>
          <StyledRowDes>{this.props.iCard.get('title')}</StyledRowDes>
        </StyledHeader>
        {this._renderBottomMenu()}
      </StyledContent>
    );
  }
}
