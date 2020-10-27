/**
 * Created by lintong on 2018/1/8.
 * @flow
 */

// import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  StyledTop,
  StyledButton,
  StyledImage,
  StyledZoomImage,
  StyledArrowView,
  StyledIcon,
  StyledBottom,
  StyledDateView,
  StyledImagesScolleView,
  StyledNewTip,
  StyledDateText,
  StyledRecordText,
  StyledChatbtn,
  StyledChatBtnText,
  StyledImageButton,
} from './style';
import ImagesViewModal from '../../../components/ZoomImage/ImagesViewModal';

const { width } = Dimensions.get('window');
// static displayName = RecordRow
@connect(
  (state) => ({
    // data:state.req.get()
    user: state.user.data,
  }),
  (dispatch) => ({
    // ...bindActionCreators({},dispatch),
  }),
)
export default class RecordRow extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      like: false,
    };
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    navigation: PropTypes.object,
    showChat: PropTypes.bool,
    showImage: PropTypes.bool,
  };

  static defaultProps = {
    showChat: true,
    showImage: false,
  };

  // shouldComponentUpdate(nextProps: Object) {
  //     return !immutable.is(this.props, nextProps)
  // }

  chatBtnRef = 0;

  _renderChatBtn = (item) => {
    const { commentNew, commentNum, user, objectId } = item;

    return (
      <StyledChatbtn
        onPress={() => {
          this.props.navigation &&
            this.props.navigation.navigate('rcomment', { iDoID: objectId });
        }}>
        {/* <Image style={{width:20,height:20}} source={icon}/> */}
        {commentNew && user === this.props.user.objectId && <StyledNewTip />}
        {commentNum > 0 && (
          <StyledChatBtnText numberOfLines={1}>
            {item.commentNum}
          </StyledChatBtnText>
        )}
        <StyledArrowView />
        {/* <Text style={[styles.tabLinkText,{color:focused?"#0093cb":'rgb(150,150,150)'}]}>{tabInfo.label}</Text> */}
      </StyledChatbtn>
    );
  };

  CNDateString(date) {
    const cn = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const s = [];
    const YY = date.getFullYear().toString();
    for (let i = 0; i < YY.length; i++) {
      if (cn[YY.charAt(i)]) {
        s.push(cn[YY.charAt(i)]);
      } else {
        s.push(YY.charAt(i));
      }
    }
    s.push('年');
    const MM = date.getMonth() + 1;
    if (MM < 10) {
      s.push(cn[MM]);
    } else if (MM < 20) {
      s.push(`十${cn[MM % 10]}`);
    }
    s.push('月');
    const DD = date.getDate();
    if (DD < 10) {
      s.push(cn[DD]);
    } else if (DD < 20) {
      s.push(`十${cn[DD % 10]}`);
    } else {
      s.push(`二十${cn[DD % 10]}`);
    }
    s.push('日');
    return s.join('');
  }

  render() {
    const { item } = this.props;
    if (!item) return null;
    const { visible, index } = this.state;
    const { imgs } = item;
    const date = moment(item.createdAt).format(' dddd');
    const uris = imgs && imgs.map((img) => ({ url: img }));
    return (
      <View>
        <StyledTop>
          <StyledDateText>
            {this.CNDateString(new Date(item.createdAt)) + date}
          </StyledDateText>
          {/* {this._renderDone()} */}
        </StyledTop>
        {!!item.recordText && (
          <StyledRecordText>{item.recordText}</StyledRecordText>
        )}

        {imgs && (
          <StyledImagesScolleView
            scrollEnabled={imgs.length > 1}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal>
            {imgs.map((img, i) => (
              <StyledImageButton
                onPress={() => {
                  this.setState({ visible: true, index: i });
                }}
                key={img}>
                <StyledImage
                  key={img}
                  // easingFunc={Easing.bounce}
                  source={{ uri: img }}
                />
              </StyledImageButton>
            ))}
          </StyledImagesScolleView>
        )}
        {uris && uris.length > 0 && (
          <ImagesViewModal
            visible={visible}
            closeCallBack={() => {
              this.setState({ visible: false });
            }}
            index={index}
            imageUrls={uris}
          />
        )}
      </View>
    );
  }
}
