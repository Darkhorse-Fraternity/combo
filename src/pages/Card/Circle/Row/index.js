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
import * as Animatable from 'react-native-animatable';
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
  StyledMaterialCommunityIcons,
  StyledLikeIcon,
  StyledBottomBtnView
} from './style';
import ImagesViewModal from '../../../../components/ZoomImage/ImagesViewModal';
import { addNormalizrEntity } from '../../../../redux/module/normalizr';
import { IDO } from '../../../../redux/reqKeys';
import { likeAdd } from '../../../../request/leanCloud';
import { get } from '../../../../redux/actions/req';
import { dataStorage } from '../../../../redux/actions/util';
// static displayName = RecordRow
@connect(
  state => ({
    // data:state.req.get()
    user: state.user.data
  }),
  dispatch => ({
    // ...bindActionCreators({},dispatch),
    doLike: (objectId, like, likeNum) => {
      let num = 1;
      if (likeNum !== 0) {
        num = like ? 1 : -1;
      }
      const params = likeAdd(objectId, num);
      get(params);

      dispatch(addNormalizrEntity(IDO, {
        objectId,
        likeNum: likeNum + num
      }));

      if (num > 0) {
        storage.save({
          key: 'likeRecord',
          id: objectId, // 注意:请不要在key中使用_下划线符号!
          data: true,
        });
      } else {
        storage.remove({
          key: 'likeRecord',
          id: objectId, // 注意:请不要在key中使用_下划线符号!
        });
      }


      // 点过赞的 在本地做一个记录
    }
  })
)
export default class RecordRow extends Component {
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

  chatBtnRef = 0

  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      liked: false
    };

    const { item } = props;

    storage.load({
      key: 'likeRecord',
      id: item.objectId,
    }).then((liked) => {
      this.setState({
        liked,
      });
    }).catch();
  }


  // shouldComponentUpdate(nextProps: Object) {
  //     return !immutable.is(this.props, nextProps)
  // }


  _renderChatBtn = (item) => {
    const {
      commentNew, commentNum, user, objectId
    } = item;
    const background = TouchableNativeFeedback.SelectableBackgroundBorderless
    && TouchableNativeFeedback.SelectableBackgroundBorderless();
    return (
      <StyledChatbtn
        hitSlop={{
          top: 15, left: 5, bottom: 15, right: 25
        }}
        disabled
        background={background}
        onPress={() => {
          this.props.navigation
          && this.props.navigation.navigate('rcomment', { iDoID: objectId });
        }}
      >
        <StyledMaterialCommunityIcons
          name="chat-bubble-outline"
          size={20}
          color="#8c8c85"
        />
        {commentNew && user === this.props.user.objectId
        && (<StyledNewTip />)}

        <StyledChatBtnText
          numberOfLines={1}
        >
          {commentNum === 0 ? '' : commentNum}
        </StyledChatBtnText>


        {/* <Text style={[styles.tabLinkText,{color:focused?"#0093cb":'rgb(150,150,150)'}]}>{tabInfo.label}</Text> */}
      </StyledChatbtn>
    );
  }

   handleViewRef = ref => this.likeView = ref;

    renderLikes = (item) => {
      const {
        likeNum,
        objectId
      } = item;
      const { liked } = this.state;
      const { doLike } = this.props;
      const background = TouchableNativeFeedback.SelectableBackgroundBorderless
    && TouchableNativeFeedback.SelectableBackgroundBorderless();
      return (
        <StyledChatbtn
          activeOpacity={1}
          hitSlop={{
            top: 15, left: 25, bottom: 15, right: 5
          }}
          background={background}
          onPress={() => {
            this.likeView.bounceIn(2000);
            doLike(objectId, !liked, likeNum);
            this.setState({ liked: !liked });
          }}
        >
          <Animatable.View
            ref={this.handleViewRef}
          >
            <StyledMaterialCommunityIcons
              name={liked ? 'favorite' : 'favorite-border'}
              size={20}
              color={liked ? '#fd696a' : '#8c8c85'}
            />
          </Animatable.View>
          <StyledChatBtnText
            numberOfLines={1}
          >
            {likeNum === 0 ? '' : likeNum}
          </StyledChatBtnText>
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
            { uris && uris.length > 0 && (
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
              <StyledBottomBtnView>
                {this.renderLikes(item)}
                {this._renderChatBtn(item)}
              </StyledBottomBtnView>
            </StyledDateView>
          </StyledBottom>
        </StyledButton>
      );
    }
}
