/* @flow */

import React, { FC } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Button, { ButtonType } from '../../components/Button/index';

import {
  StyledContent,
  StyleHeader,
  StyledHeaderTop,
  StyledHeaderName,
  StyledAvatarView,
  StyledInnerContent,
  StyledRowText,
  StyledDescription,
} from './style';

import Avatar from '../../components/Avatar';
import { marketRate } from '@helps/rate';
import { useGetUserInfo } from 'src/data/data-context';
import { useNavigation } from '@react-navigation/native';
import { RouteKey } from '@pages/interface';

const RenderRow: FC<ButtonType & { title: string; description?: string }> = ({
  title,
  description,
  style,
  ...other
}) => {
  return (
    <Button key={title} style={[styles.row, style]} {...other}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Image
                       resizeMode='contain'
                       source={source}
                       style={styles.imageNail}
                       /> */}
        <StyledRowText>{title}</StyledRowText>
      </View>
      <View style={styles.row2}>
        {description ? (
          <StyledDescription>{description}</StyledDescription>
        ) : null}
      </View>
    </Button>
  );
};

const RenderMain: FC<{}> = () => {
  const { navigate } = useNavigation();
  const user = useGetUserInfo();

  const { isTourist } = user;
  return (
    <>
      <RenderRow
        title="已暂停习惯"
        onPress={() => {
          navigate('record', { statu: 'stop' });
        }}
      />
      <RenderRow
        title="习惯提醒"
        onPress={() => {
          navigate('remind');
        }}
      />
      <RenderRow
        title="我的道具"
        style={{ marginBottom: isTourist ? 20 : 0 }}
        onPress={() => {
          navigate('tool');
        }}
      />
      {!isTourist && (
        <RenderRow
          title="我的钱包"
          style={{ marginBottom: 20 }}
          onPress={() => {
            navigate('earnings');
          }}
        />
      )}
      {!isTourist && (
        <RenderRow
          title="粉丝查看"
          onPress={() => {
            navigate('follow', { userId: user?.objectId });
          }}
        />
      )}
      <RenderRow title="好评鼓励" onPress={marketRate} />

      <RenderRow
        title="意见反馈"
        onPress={() => {
          navigate(RouteKey.feedback);
        }}
      />

      <RenderRow
        title="小改变微博"
        onPress={() => {
          Linking.canOpenURL('sinaweibo://').then((supported) => {
            // weixin://  alipay://
            if (supported) {
              Linking.openURL('sinaweibo://userinfo?uid=6861885697');
            } else {
              navigate('web', {
                url: 'https://www.weibo.com/u/6861885697',
                // title: '小改变的微博',
              });
            }
          });
        }}
      />
    </>
  );
};
const RenderHeadRow = () => {
  const { navigate } = useNavigation();
  const user = useGetUserInfo();
  const { isTourist, ...data } = user!;
  const name = isTourist ? '点击登录' : data.nickname || '匿名';

  return (
    <StyleHeader>
      <StyledHeaderTop
        onPress={() => {
          if (isTourist) {
            navigate(RouteKey.login);
          } else {
            navigate(RouteKey.account);
          }
        }}>
        <StyledAvatarView>
          <Avatar user={user!} />
        </StyledAvatarView>
        <View>
          <StyledHeaderName>{name}</StyledHeaderName>
        </View>
      </StyledHeaderTop>

      {/* {this._renderFunction()} */}
    </StyleHeader>
  );
};

export const More = () => {
  return (
    <StyledContent>
      <StyledInnerContent>
        {/* {this.__renderLoginRow()} */}
        <RenderHeadRow />
        <RenderMain />
      </StyledInnerContent>
    </StyledContent>
  );
};

export default More;

const styles = StyleSheet.create({
  head: {
    marginBottom: 7,
    flexDirection: 'row',
    height: 170,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  emptyPageText: {
    margin: 10,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4e4e4',
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageNail: {
    // marginTop: 13,
    // marginBottom: 13,
    marginLeft: 10,
    width: 20,
    height: 20,
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowNote: {
    fontSize: 17,
  },
  rowText: {
    marginLeft: 10,
    fontSize: 17,
    // fontWeight: '500',
    // color: '#333333',
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

  headerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  description: {
    marginRight: 12,
    fontSize: 13,
    color: '#333333',
  },

  headViewText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headViewSubText: {
    marginTop: 10,
    fontSize: 13,
  },
});
