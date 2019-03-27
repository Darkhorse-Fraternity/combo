/**
 * Created by lintong on 2018/1/8.
 * @flow
 */


// import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  StyledButton,
  StyledImage,
  StyledZoomImage,
  StyledImagesScolleView,
  StyledArrowView,
  StyledIcon,
  StyledBottom,
  StyledDateView,
  StyledNewTip,
  StyledDateText,
  StyledRecordText,
  StyledChatbtn,
  StyledChatBtnText,
  StyledMain,
  StyledImageButton,
  StyledMaterialCommunityIcons
} from './style';
import ImagesViewModal from '../../../../components/ZoomImage/ImagesViewModal';

const { width } = Dimensions.get('window');
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
    const background = TouchableNativeFeedback.SelectableBackgroundBorderless
    && TouchableNativeFeedback.SelectableBackgroundBorderless();
    return (
      <StyledChatbtn
        hitSlop={{
          top: 15, left: 25, bottom: 15, right: 15
        }}
        background={background}
        onPress={() => {
          this.props.navigation
          && this.props.navigation.navigate('rcomment', { iDoID: objectId });
        }}
      >
        <StyledMaterialCommunityIcons
          name="chat"
          size={20}
          color="#8c8c85"
        />
        {commentNew && user === this.props.user.objectId
        && (<StyledNewTip />)}

        <StyledChatBtnText
          numberOfLines={1}
        >
          {item.commentNum === 0 ? '' : item.commentNum}
        </StyledChatBtnText>


        {/* <Text style={[styles.tabLinkText,{color:focused?"#0093cb":'rgb(150,150,150)'}]}>{tabInfo.label}</Text> */}
      </StyledChatbtn>
    );
  }

  // _renderDone = () => (
  //   <StyledIcon
  //     ref={this.chatBtnRef}
  //     name="md-checkmark"
  //     size={25}
  //     color="green"
  //   />
  // )

  render(): ReactElement<any> {
    const { item, showImage } = this.props;
    const { visible, index } = this.state;
    if (!item) return null;
    const { imgs } = item;
    const uris = imgs && imgs.map(img => ({ url: img }));
    // const date = moment(item.createdAt).format("YYYY-MM-DD HH:mm")
    // moment.locale('zh-cn')
    const fromNow = moment(item.createdAt).fromNow();
    return (
      <StyledButton
        activeOpacity={1}
        disabled={!this.props.navigation}
        onPress={() => {
          this.props.navigation
          && this.props.navigation.navigate('rcomment',
            { iDoID: item.objectId });
        }}
        style={this.props.style}
      >
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
          { uris.length > 0 && (
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
        <StyledBottom>
          <StyledDateView>
            <StyledDateText>
              {fromNow}
            </StyledDateText>

            {this._renderChatBtn(item)}
          </StyledDateView>
        </StyledBottom>
      </StyledButton>
    );
  }
}
