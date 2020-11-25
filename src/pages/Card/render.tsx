/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC, PureComponent, useEffect } from 'react';
import { Animated, Platform } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-simple-toast';
import { StyledHeaderRight, StyledIcon } from './style';

import TitleTabBar from '../../components/Groceries/TitleTabBar';
import Statistical from './Statistical';
import Circle from './Circle/index';
import Button from '../../components/Button/index';
import { CircleState } from '../../configure/enum';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import {
  GetClassesIUseIdResponse,
  putClassesICardId,
} from 'src/hooks/interface';
import { useNavigation } from '@react-navigation/native';
import { LoadAnimation } from '@components/Load';
import { useGetUserInfo } from 'src/data/data-context';
import { useGetIuseData, useMutateICardData } from 'src/data/data-context/core';

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

class Main extends PureComponent<{
  iCard: GetClassesIUseIdResponse['iCard'];
}> {
  scrollValue = new Animated.Value(0);
  render() {
    const { iCard, children } = this.props;
    let { iconAndColor = {} } = iCard;
    // const color = iconAndColor.color || '';
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
          // const containerWidthAnimatedValue = new Animated.Value(x);
          this.scrollValue.setValue(x);
          // }
        }}
        renderTabBar={(...props) => (
          <TitleTabBar
            {...props}
            // underlineColor={color}
            // title={title}
            // tabUnderlineWidth={35}
            scrollValueWithOutNative={this.scrollValue}
            // rightView={this.__renderRightView}
          />
        )}
        prerenderingSiblingsNumber={0}>
        {children}
      </ScrollableTabView>
    );
  }
}

const Card: FC<{}> = (props) => {
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.recordDetail>();
  // const { data, run } = useGetClassesIUseId({
  //   include: 'iCard',
  //   id: iUseId,
  // });
  const { data } = useGetIuseData(iUseId);
  const { update } = useMutateICardData();
  const { setOptions, navigate } = useNavigation();
  const user = useGetUserInfo();
  const { iCard } = data || {};

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
                  update({ state, circleState, objectId: iCard.objectId });
                  Toast.show(
                    iCard.state === CircleState.close ? '多人模式' : '单人模式',
                  );
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
  }, [iCard, iUseId, navigate, setOptions, update, user?.objectId]);

  if (!iCard) {
    return <LoadAnimation />;
  }
  const { title, state } = iCard;
  return (
    <Main {...props} iCard={iCard}>
      {state === CircleState.open && (
        <Circle iUse={data!} iCard={iCard!} {...props} tabLabel="圈子" />
      )}
      <Statistical
        {...props}
        iUse={data!}
        iCard={iCard!}
        tabLabel={state === CircleState.open ? '统计' : title}
      />
    </Main>
  );
};
export default Card;
