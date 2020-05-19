/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  Platform
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Toast from "react-native-simple-toast";
import { StyledContent, StyledIcon, StyledIconSet } from "./style";

import BackTabBar from "../../components/Groceries/BackTabBar";
import TitleTabBar from "../../components/Groceries/TitleTabBar";
import Statistical from "./Statistical";
import NavBar from "../../components/Nav/bar/NavBar";
// import Info from './Settings/index'
// import Course from './Course/index'
import Circle from "./Circle/index";
import Button from "../../components/Button/index";
import { theme } from "../../Theme/index";
import { Privacy, CircleState } from "../../configure/enum";
import { COURSE, ICARD } from "../../redux/reqKeys";
import { list, entitys } from "../../redux/scemes";
import { find, update } from "../../redux/module/leancloud";
import { addNormalizrEntity } from "../../redux/module/normalizr";

@connect(
  (state, props) => {
    const iCard = state.normalizr
      .get("iCard")
      .get(props.navigation.state?.params?.iCardId);
    // const courseId = iCard.get('course')
    return {
      iCard,
      iUse: state.normalizr
        .get("iUse")
        .get(props.navigation.state?.params?.iUseId),
      user: state.user.data
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
            : CircleState.close
      };
      const res = await dispatch(update(id, param, ICARD));

      const entity = {
        ...param,
        ...res
      };
      dispatch(addNormalizrEntity(ICARD, entity));
      Toast.show(data.state === CircleState.close ? "多人模式" : "单人模式");
    },
    dataLoad: () => {
      dispatch(async (dispatch, getState) => {
        const state = getState();
        const iCard = state.normalizr
          .get("iCard")
          .get(props.navigation.state.params.iCardId);
        const courseId = iCard.get("course");
        const course = courseId && state.normalizr.get(COURSE).get(courseId);
        console.log("course:", course);
        if (courseId && course.get("statu") === undefined) {
          const params = {
            include: "user",
            where: {
              objectId: props.courseId
            }
          };
          await dispatch(
            find(COURSE, params, { sceme: list(entitys[COURSE]) })
          );
        }
      });
    }
  })
)
export default class Card extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      scrollValue: new Animated.Value(0)
    };
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = props => {
    const { navigation } = props;
    const { state } = navigation;
    const { params } = state || {};

    const { gestureEnabled } = params || { gestureEnabled: true };
    return {
      //   title:params && params.title,
      headerShown: false,
      gestureEnabled
      // headerRight:params.renderRightView && params.renderRightView()
    };
  };

  // _afterDone = (key) => {
  //   DeviceEventEmitter.emit(key);
  // }

  componentDidMount() {
    // const { iCard, iUse } = this.props
    // const state = iCard.get('state')
    // this.props.navigation.setParams({ renderRightView: this.__renderRightView,
    //   title: iCard.get('title') })
  }

  __renderRightView = () => {
    const { navigation, iCard, user } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { iCardId, iUseId } = params;

    const isSelf = iCard.get("user") === user.objectId;
    return [
      isSelf && (
        <Button
          key="icon1"
          onPress={() => {
            this.props.setCircleState(iCard);
          }}
        >
          <StyledIcon
            color="black"
            style={{ marginRight: 0, marginTop: Platform.OS === "ios" ? 5 : 2 }}
            size={20}
            name="users"
          />
        </Button>
      ),
      <Button
        key="icon2"
        onPress={() => {
          this.props.navigation.navigate("cardSetting", {
            iCardId,
            iUseId
          });
        }}
      >
        <StyledIcon
          color="black"
          style={{ marginRight: 10 }}
          size={20}
          name="more-horizontal"
        />
      </Button>
    ];
  };

  render(): ReactElement<any> {
    // const params = this.props.navigation.state.params
    // const {iUse,iCard} = params

    const { iCard, iUse } = this.props;
    if (!iCard) {
      return <StyledContent />;
    }

    // const useNum = iCard.get('useNum')
    let iconAndColor = iCard.get("iconAndColor");
    iconAndColor = iconAndColor ? iconAndColor.toJS() : {};
    const color = iconAndColor.color || "";
    const title = iCard.get("title");
    // const privacy = iUse.get('privacy')
    const state = iCard.get("state");

    return (
      <StyledContent>
        <NavBar
          onBackPress={this.props.navigation.goBack}
          rightView={this.__renderRightView}
        />
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
          // tabBarInactiveTextColor={theme.mainColor}
          // tabBarActiveTextColor={theme.mainColor}
          // tabBarUnderlineStyle={{ backgroundColor: theme.mainColor }}
          // tabBarPosition ='bottom'
        >
          {/* {course && course.get('statu') === 1 && */}
          {/* <Course {...this.props} */}
          {/* tabLabel='课程'/>} */}
          {state === CircleState.open && (
            <Circle color={color} {...this.props} tabLabel="圈子" />
          )}
          <Statistical
            color={color}
            {...this.props}
            tabLabel={state === CircleState.open ? "统计" : title}
          />
        </ScrollableTabView>
      </StyledContent>
    );
  }
}
