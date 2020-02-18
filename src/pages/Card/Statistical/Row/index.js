/**
 * Created by lintong on 2018/1/8.
 * @flow
 */


// import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  StyledButton,
  StyledImage,
  StyledZoomImage,
  StyledImageButton,
  StyledImagesScolleView,
  StyledArrowView,
  StyledIcon,
  StyledBottom,
  StyledNewTip,
  StyledDateText,
  StyledRecordText,
  StyledChatbtn,
  StyledChatBtnText,
  StyledMain,
  StyledDateView,
  StyledDateTextBig,
  StyledDateTextSmall
} from './style';
import ImagesViewModal from '../../../../components/ZoomImage/ImagesViewModal';

// static displayName = RecordRow
@connect(
  state => ({
    // data:state.req.get()
    user: state.user.data
  }),
  dispatch => ({
    // ...bindActionCreators({},dispatch),
  })
)
export default class RecordRow extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
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

  chatBtnRef = 0

  _renderChatBtn = (item) => {
    const {
      commentNew, commentNum, user, objectId
    } = item;

    return (
      <StyledChatbtn
        onPress={() => {
          this.props.navigation
          && this.props.navigation.navigate('rcomment', { iDoID: objectId });
        }}
      >
        {/* <Image style={{width:20,height:20}} source={icon}/> */}
        {commentNew && user === this.props.user.objectId
        && (<StyledNewTip />)}
        {commentNum > 0
        && (
        <StyledChatBtnText
          numberOfLines={1}
        >
          {item.commentNum}
        </StyledChatBtnText>
        )}
        <StyledArrowView />
        {/* <Text style={[styles.tabLinkText,{color:focused?"#0093cb":'rgb(150,150,150)'}]}>{tabInfo.label}</Text> */}
      </StyledChatbtn>
    );
  }

  _renderDone = () => (
    <StyledIcon
      ref={this.chatBtnRef}
      name="md-checkmark"
      size={25}
      color="green"
    />
  )

  render(): ReactElement<any> {
    const {
      item, onPress, color
    } = this.props;
    if (!item) return null;
    const { visible, index } = this.state;
    const { imgs } = item;
    const uris = imgs && imgs.map(img => ({ url: img }));
    // const date = moment(item.createdAt).format("YYYY-MM-DD HH:mm")
    // moment.locale('zh-cn')
    // const fromNow = moment(item.createdAt).fromNow()
    const { createdAt, doneDate } = item;
    const time = doneDate ? doneDate.iso : createdAt;
    return (
      <StyledButton
        activeOpacity={1}
        onPress={onPress}
        style={this.props.style}
      >

        <StyledDateView color={color}>
          <StyledDateTextBig color={color}>
            {moment(time).format('DD')}
          </StyledDateTextBig>
          <StyledDateTextSmall color={color}>
            {moment(time).format('MMM ')}
          </StyledDateTextSmall>
        </StyledDateView>
        <StyledMain>
          {!!item.recordText
          && (
          <StyledRecordText numberOfLines={3}>
            {item.recordText}
          </StyledRecordText>
          )}
          {imgs && (
            <StyledImagesScolleView
              scrollEnabled={imgs.length > 1}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
            >
              {imgs.map((img, i) => (
                <StyledImageButton
                  onPress={() => {
                    this.setState({ visible: true, index: i });
                  }}
                  key={img}
                >
                  <StyledImage
                    source={{ uri: img }}
                  />
                </StyledImageButton>
              ))}
            </StyledImagesScolleView>
          )}
          {uris &&  uris.length > 0 && (
            <ImagesViewModal
              visible={visible}
              closeCallBack={() => {
                this.setState({ visible: false });
              }}
              index={index}
              imageUrls={uris}
            />
          )}
        </StyledMain>
        {/* <StyledBottom> */}
        {/* <StyledDateView> */}
        {/* <StyledDateText> */}
        {/* {fromNow} */}
        {/* </StyledDateText> */}
        {/* {this.props.showChat ? */}
        {/* this._renderChatBtn(item) : */}
        {/* this._renderDone()} */}
        {/* </StyledDateView> */}
        {/* </StyledBottom> */}
      </StyledButton>
    );
  }
}
