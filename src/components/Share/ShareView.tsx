/**
 * Created by lintong on 2017/6/2.
 * @flow
 */

import * as immutable from 'immutable';
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Clipboard,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'react-native-simple-toast';
import Pop from '../Pop';
import {theme} from '../../Theme';

import {
  shareTo,
  SHARE_TO_TIMELINE,
  SHARE_TO_SESSION,
  SHARE_TO_QQ,
  Share_TO_ZONE,
} from '../../redux/actions/share';
import Button from '../Button';

import {isQQInstalled} from 'react-native-qq';

interface StateType {
  isQQInstalled: boolean;
}

@connect(
  state => ({}),
  dispatch => ({
    share: (type, params) => {
      dispatch(shareTo(type, params));
    },
  }),
)
export default class ShareView extends Component<{}, StateType> {
  constructor(props: Object) {
    super(props);
    this.state = {
      isQQInstalled: true,
    };
  }

  shouldComponentUpdate(nextProps: Object, nextState: StateType) {
    return (
      !immutable.is(this.props, nextProps) ||
      this.state.isQQInstalled !== nextState.isQQInstalled
    );
  }

  componentDidMount() {
    isQQInstalled()
      .then(() => {
        console.log('!!!');
        this.setState({isQQInstalled: true});
      })
      .catch(() => {
        this.setState({isQQInstalled: false});
      });
  }

  render(): ReactElement<any> {
    const item = (source, titel, press) => (
      <Button
        background={
          TouchableNativeFeedback.SelectableBackgroundBorderless &&
          TouchableNativeFeedback.SelectableBackgroundBorderless()
        }
        onPress={press}>
        <View style={{paddingHorizontal: 15}}>
          <Image style={styles.pop_item_image} source={source} />
          <Text style={styles.pop_item_text}>{titel}</Text>
        </View>
      </Button>
    );

    const {share, iCard, iUse} = this.props;
    const {time} = iUse;
    const url =
      (iCard.img && iCard.img.url) ||
      'http://file.icourage.cn/ace9c22b40557933858f.png';

    const shareParams = {
      title: iCard.title,
      webpageUrl: `https://icourage.cn/cardInfo?iCardId=${iCard.objectId}`,
      description: iCard.nitifyText || '加入我的卡片，和我结伴同行',
      imageUrl: url,
      thumbImage: `${url}?imageView/1/w/100/h/100/q/50`, // /1/代表center
    };

    // console.log('thumbImage:', shareParams.thumbImage);

    console.log('xx', this.state.isQQInstalled);

    return (
      <SafeAreaView style={{backgroundColor: 'white', alignItems: 'center'}}>
        <View style={styles.top}>
          <Button
            background={
              TouchableNativeFeedback.SelectableBackgroundBorderless &&
              TouchableNativeFeedback.SelectableBackgroundBorderless()
            }
            onPress={() => {
              Pop.hide();
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

        <View style={{flexDirection: 'row'}}>
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
      </SafeAreaView>
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
  pop_item_text: {
    fontSize: 13,
    marginTop: 5,
    color: 'rgb(100,100,100)',
    alignSelf: 'center',
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
