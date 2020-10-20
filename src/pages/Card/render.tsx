/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC, PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-simple-toast';
import {
  StyledContent,
  StyledIcon,
  StyledIconSet,
  StyledHeaderRight,
} from './style';

import TitleTabBar from '../../components/Groceries/TitleTabBar';
import Statistical from './Statistical';
// import Info from './Settings/index'
// import Course from './Course/index'
import Circle from './Circle/index';
import Button from '../../components/Button/index';
import { CircleState } from '../../configure/enum';
import { COURSE, ICARD } from '../../redux/reqKeys';
import { list, entitys } from '../../redux/scemes';
import { find, update } from '../../redux/module/leancloud';
import { addNormalizrEntity } from '../../redux/module/normalizr';


interface RenderHeaderRightProps {
  isSelf: boolean
  onPress: (type: 'log' | 'setting') => void;
}

const RenderHeaderRight: FC<RenderHeaderRightProps> = ({ isSelf, onPress }) => {
  return (
    <StyledHeaderRight>
      {isSelf && (
        <Button
          onPress={onPress.bind(undefined, 'log')}>
          <StyledIcon
            color="black"
            style={{ marginRight: 0, marginTop: Platform.OS === 'ios' ? 5 : 2 }}
            size={20}
            name="users"
          />
        </Button>
      )}
      <Button
        onPress={onPress.bind(undefined, 'setting')}>
        <StyledIcon
          color="black"
          style={{ marginRight: 10 }}
          size={20}
          name="more-horizontal"
        />
      </Button>
    </StyledHeaderRight>
  );
}


@connect(
  (state, props) => {
    const iCard = state.normalizr.get('iCard').get(props.route.params?.iCardId);
    // const courseId = iCard.get('course')
    return {
      iCard,
      iUse: state.normalizr.get('iUse').get(props.route.params?.iUseId),
      user: state.user.data,
      // course:
      // course: courseId && state.normalizr.get(COURSE).get(courseId)
    };
  },
  (dispatch, props) => ({
    setCircleState: async iCard => {
      const data = iCard.toJS();
      const id = data.objectId;
      const param = {
        circleState:
          data.state === CircleState.close
            ? CircleState.open
            : CircleState.close,
        state:
          data.state === CircleState.close
            ? CircleState.open
            : CircleState.close,
      };
      const res = await dispatch(update(id, param, ICARD));

      const entity = {
        ...param,
        ...res,
      };
      dispatch(addNormalizrEntity(ICARD, entity));
      Toast.show(data.state === CircleState.close ? '多人模式' : '单人模式');
    },
    dataLoad: () => {
      dispatch(async (dispatch, getState) => {
        const state = getState();
        const iCard = state.normalizr
          .get('iCard')
          .get(props.route.params.iCardId);
        const courseId = iCard.get('course');
        const course = courseId && state.normalizr.get(COURSE).get(courseId);
        console.log('course:', course);
        if (courseId && course.get('statu') === undefined) {
          const params = {
            include: 'user',
            where: {
              objectId: props.courseId,
            },
          };
          await dispatch(find(COURSE, params, { sceme: list(entitys[COURSE]) }));
        }
      });
    },
  }),
)
export default class Card extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      scrollValue: new Animated.Value(0),
    };
  }

  static propTypes = {};

  static defaultProps = {};


  componentDidMount() {


    this.props.navigation.setOptions({ headerRight: this.__renderRightView });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.iCard !== this.props.iCard) {
      this.props.navigation.setOptions({ headerRight: this.__renderRightView });
    }
  }

  __renderRightView = () => {
    const { route, iCard, user } = this.props;
    const { params } = route;
    const { iCardId, iUseId } = params;

    const isSelf = iCard.get('user') === user.objectId;

    return <RenderHeaderRight isSelf={isSelf} onPress={(type) => {
      if (type === 'log') {
        this.props.setCircleState(iCard);
      } else {
        this.props.navigation.navigate('cardSetting', {
          iCardId,
          iUseId,
        });
      }
    }} />

  };

  render() {
    // const {iUse,iCard} = params

    const { iCard, iUse, ...other } = this.props;

    if (!iCard) {
      return <StyledContent />;
    }
    const iCardM = iCard.toJS()
    const iUseM = iUse.toJS()
    // const useNum = iCard.get('useNum')
    let iconAndColor = iCard.get('iconAndColor');
    iconAndColor = iconAndColor ? iconAndColor.toJS() : {};
    const color = iconAndColor.color || '';
    const title = iCard.get('title');
    // const privacy = iUse.get('privacy')
    const state = iCard.get('state');

    return (
      <ScrollableTabView
        ref="ScrollableTabView"
        locked={state !== CircleState.open}
        onChangeTab={({ i }) => {
          this.props.navigation.setParams({ gestureEnabled: i === 0 });
        }}
        onScroll={x => {
          // if(state === CircleState.open){
          x = x <= 0 ? 0 : x;
          x = x >= 1 ? 1 : x;
          const containerWidthAnimatedValue = new Animated.Value(x);
          this.setState({ scrollValue: containerWidthAnimatedValue });
          // }
        }}
        renderTabBar={(...props) => (
          <TitleTabBar
            {...props}
            underlineColor={color}
            title={title}
            tabUnderlineWidth={35}
            scrollValueWithOutNative={this.state.scrollValue}
          // rightView={this.__renderRightView}
          />
        )}
        prerenderingSiblingsNumber={0}
      >
        {state === CircleState.open && (
          <Circle
            iUse={iUseM}
            iCard={iCardM}
            color={color}
            {...other}
            tabLabel="圈子" />
        )}
        <Statistical
          {...other}
          iUse={iUseM}
          iCard={iCardM}
          tabLabel={state === CircleState.open ? '统计' : title}

        />
      </ScrollableTabView>
    );
  }
}
