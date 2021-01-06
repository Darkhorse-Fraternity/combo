/**
 * Created by lintong on 2017/6/2.
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';
import { theme } from '../../Theme';

import {
  shareTo as share,
  SHARE_TO_TIMELINE,
  SHARE_TO_SESSION,
  SHARE_TO_QQ,
  Share_TO_ZONE,
  ShareParamsType,
} from '../../redux/actions/share';
import Button from '../Button';
// @ts-ignore: Unreachable code error
import { isQQInstalled } from 'react-native-qq';
import Modal from 'react-native-modal';
import { IUseType } from 'src/data/data-context/interface';
import { StyledPopItemText, StyledSafeAreaView } from './style';
// import { ShareMetadata } from 'react-native-wechat';

interface ShareModal {
  iCard: IUseType['iCard'];
  iUse: IUseType;
  isVisible: boolean;
  onClose: () => void;
}

export const ShareModal = (props: ShareModal) => {
  const { isVisible } = props;
  return (
    <Modal
      useNativeDriver
      animationIn={'fadeInUp'}
      isVisible={isVisible}
      style={{
        justifyContent: 'flex-end',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      animationOut={'fadeOutDown'}>
      <ShareView {...props} />
    </Modal>
  );
};

interface StateType {
  isQQInstalled: boolean;
}

const item = (
  source: ImageSourcePropType,
  titel: string,
  press?: (event: GestureResponderEvent) => void,
) => (
  <Button
    background={
      TouchableNativeFeedback.SelectableBackgroundBorderless &&
      TouchableNativeFeedback.SelectableBackgroundBorderless()
    }
    onPress={press}>
    <View style={{ paddingHorizontal: 15 }}>
      <Image style={styles.pop_item_image} source={source} />
      <StyledPopItemText>{titel}</StyledPopItemText>
    </View>
  </Button>
);

export default class ShareView extends Component<ShareModal, StateType> {
  constructor(props: ShareModal) {
    super(props);
    this.state = {
      isQQInstalled: true,
    };
  }

  // shouldComponentUpdate(nextProps: ShareModal, nextState: StateType) {
  //   return (
  //     !immutable.is(this.props, nextProps) ||
  //     this.state.isQQInstalled !== nextState.isQQInstalled
  //   );
  // }

  componentDidMount() {
    isQQInstalled()
      .then(() => {
        this.setState({ isQQInstalled: true });
      })
      .catch(() => {
        this.setState({ isQQInstalled: false });
      });
  }

  render() {
    const { iCard } = this.props;
    const url =
      (iCard.img && iCard.img.url) ||
      'http://file.icourage.cn/ace9c22b40557933858f.png';

    const shareParams: ShareParamsType = {
      title: iCard.title,
      webpageUrl: `https://icourage.cn/cardInfo?iCardId=${iCard.objectId}`,
      description: iCard.notifyText || '加入我的卡片，和我结伴同行',
      imageUrl: url,
      thumbImage: `${url}?imageView/1/w/100/h/100/q/50`, // /1/代表center
    };

    // console.log('thumbImage:', shareParams.thumbImage);

    // console.log('xx', this.state.isQQInstalled);

    return (
      <StyledSafeAreaView>
        <View style={styles.top}>
          <Button
            background={
              TouchableNativeFeedback.SelectableBackgroundBorderless &&
              TouchableNativeFeedback.SelectableBackgroundBorderless()
            }
            onPress={() => {
              this.props.onClose && this.props.onClose();
            }}
            hitSlop={{
              top: 15,
              left: 25,
              bottom: 15,
              right: 15,
            }}>
            <Image
              style={styles.delImg}
              source={require('../../../source/img/visitor/visitor_delete.png')}
            />
          </Button>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.pop_item}>
            {item(
              require('../../../source/img/icon/circleShare.png'),
              '朋友圈',
              () => {
                share(SHARE_TO_TIMELINE, shareParams);
              },
            )}
          </View>
          <View style={styles.pop_item}>
            {item(
              require('../../../source/img/icon/friendShare.png'),
              '微信好友',
              () => {
                share(SHARE_TO_SESSION, shareParams);
              },
            )}
          </View>
          {this.state.isQQInstalled && (
            <View style={styles.pop_item}>
              {item(
                require('../../../source/img/icon/QzoneShare.png'),
                'Q-Zone',
                () => {
                  share(Share_TO_ZONE, shareParams);
                },
              )}
            </View>
          )}
          {this.state.isQQInstalled && (
            <View style={styles.pop_item}>
              {item(
                require('../../../source/img/icon/QQShare.png'),
                'QQ',
                () => {
                  share(SHARE_TO_QQ, shareParams);
                },
              )}
            </View>
          )}
        </View>
      </StyledSafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  top: {
    marginVertical: 20,
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  delImg: {
    width: 20,
    height: 20,
  },
  pop_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  pop_item_image: {
    width: 50,
    height: 50,
  },

  pwd: {
    marginTop: 10,
    color: theme.mainColor,
    fontSize: 56,
  },
  des: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 17,
  },
});
