/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC, PureComponent, useEffect } from 'react';
import { Animated, Platform, DeviceEventEmitter } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-simple-toast';
import { StyledHeaderRight, StyledIcon } from './style';

import TitleTabBar from '../../components/Groceries/TitleTabBar';
import Statistical from './Statistical';
import Circle from './Circle/index';
import Button from '../../components/Button/index';
import { CircleState, DeviceEventEmitterKey } from '../../configure/enum';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import {
  GetClassesICardIdResponse,
  GetClassesIUseIdResponse,
  putClassesICardId,
  useGetClassesIUseId,
} from 'src/hooks/interface';
import { useNavigation } from '@react-navigation/native';
import { LoadAnimation } from '@components/Load';
import { useGetUserInfo } from 'src/data/data-context';

interface RenderHeaderRightProps {
  isSelf: boolean;
  onPress: (type: 'log' | 'setting') => void;
}

const RenderHeaderRight: FC<RenderHeaderRightProps> = ({ isSelf, onPress }) => {
  return (
    <StyledHeaderRight>
      {isSelf && (
        <Button onPress={onPress.bind(undefined, 'log')}>
          <StyledIcon
            color="black"
            style={{ marginRight: 0, marginTop: Platform.OS === 'ios' ? 5 : 2 }}
            size={20}
            name="users"
          />
        </Button>
      )}
      <Button onPress={onPress.bind(undefined, 'setting')}>
        <StyledIcon
          color="black"
          style={{ marginRight: 10 }}
          size={20}
          name="more-horizontal"
        />
      </Button>
    </StyledHeaderRight>
  );
};

class Main extends PureComponent<
  { iUse: GetClassesIUseIdResponse; iCard: GetClassesICardIdResponse },
  { scrollValue: Animated.Value; page: number }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      scrollValue: new Animated.Value(0),
      page: 0,
    };
  }
  render() {
    const { iCard, iUse, ...other } = this.props;

    const iCardM = iCard;
    const iUseM = iUse;
    // const useNum = iCard.get('useNum')
    let { iconAndColor = {} } = iCard;
    const color = iconAndColor.color || '';
    const title = iCard.title;
    // const privacy = iUse.get('privacy')
    const state = iCard.state;

    return (
      <ScrollableTabView
        // ref="ScrollableTabView"
        // page={this.state.page}
        locked={state !== CircleState.open}
        // onChangeTab={({ i }) => {
        //   this.props.navigation.setParams({ gestureEnabled: i === 0 });
        //   // this.setState({ page: i })
        // }}
        onScroll={(x) => {
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
            // title={title}
            // tabUnderlineWidth={35}
            scrollValueWithOutNative={this.state.scrollValue}
            // rightView={this.__renderRightView}
          />
        )}
        prerenderingSiblingsNumber={0}>
        {state === CircleState.open && (
          <Circle iUse={iUseM} iCard={iCardM} {...other} tabLabel="圈子" />
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

const Card: FC<{}> = (props) => {
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.recordDetail>();
  const { data, loading, run } = useGetClassesIUseId({
    include: 'iCard',
    id: iUseId,
  });
  const { setOptions, navigate } = useNavigation();
  const user = useGetUserInfo();
  const { iCard } = data || {};
  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.iUse_reload,
      () => {
        run();
      },
    );
    return () => {
      deEmitter.remove();
    };
  }, [run]);

  useEffect(() => {
    if (iCard) {
      const isSelf = iCard.user?.objectId === user?.objectId;
      // const headerRight = () => (
      //   <TouchableItem
      //     style={{ marginRight: 20, backgroundColor: color, padding: 7, paddingHorizontal: 10, borderRadius: 8 }}
      //     onPress={() => {
      //       navigate('cardInfo', {
      //         iCardId: iCard?.objectId,
      //       });
      //     }}>
      //     {/* <StyledIcon size={20} color="black" name="search" /> */}

      //     <StyledHeaderText color={'black'}>加入</StyledHeaderText>
      //   </TouchableItem>
      // )
      setOptions({
        headerRight: () => (
          <RenderHeaderRight
            isSelf={isSelf}
            onPress={async (type) => {
              if (type === 'log') {
                // this.props.setCircleState(iCard);
                const circleState =
                  iCard.state === CircleState.close
                    ? CircleState.open
                    : CircleState.close;
                const state =
                  iCard.state === CircleState.close
                    ? CircleState.open
                    : CircleState.close;
                const { objectId } = await putClassesICardId({
                  id: iCard.objectId,
                  circleState,
                  state,
                });
                if (objectId) {
                  Toast.show(
                    iCard.state === CircleState.close ? '多人模式' : '单人模式',
                  );
                  DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload);
                }
              } else {
                navigate('cardSetting', {
                  iCardId: iCard.objectId,
                  iUseId: iUseId,
                });
              }
            }}
          />
        ),
      });
    }
  }, [iCard, iUseId, navigate, setOptions, user?.objectId]);

  if (!iCard) {
    return <LoadAnimation />;
  }

  return (
    <Main {...props} iUse={data!} iCard={iCard as GetClassesICardIdResponse} />
  );
};
export default Card;
