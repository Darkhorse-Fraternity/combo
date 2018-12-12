/**
 * Created by lintong on 2018/1/8.
 * @flow
 */
'use strict';

// import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

const width = Dimensions.get('window').width
import {
  StyledTop,
  StyledButton,
  StyledImage,
  StyledZoomImage,
  StyledArrowView,
  StyledIcon,
  StyledBottom,
  StyledDateView,
  StyledNewTip,
  StyledDateText,
  StyledRecordText,
  StyledChatbtn,
  StyledChatBtnText,

} from './style'
//static displayName = RecordRow
@connect(
  state => ({
    //data:state.req.get()
    user: state.user.data
  }),
  dispatch => ({
    //...bindActionCreators({},dispatch),
  })
)
export default class RecordRow extends Component {
  constructor(props: Object) {
    super(props);
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
    const { commentNew, commentNum, user, objectId } = item

    return (
      <StyledChatbtn
        onPress={() => {
          this.props.navigation &&
          this.props.navigation.navigate('rcomment', { iDoID: objectId })
        }}>
        {/*<Image style={{width:20,height:20}} source={icon}/>*/}
        {commentNew && user === this.props.user.objectId
        && (<StyledNewTip/>)}
        {commentNum > 0 &&
        (<StyledChatBtnText
          numberOfLines={1}>
          {item.commentNum}
        </StyledChatBtnText>)}
        <StyledArrowView/>
        {/*<Text style={[styles.tabLinkText,{color:focused?"#0093cb":'rgb(150,150,150)'}]}>{tabInfo.label}</Text>*/}
      </StyledChatbtn>
    )
  }

  _renderDone = () => {
    return (
      <StyledIcon
        ref={this.chatBtnRef}
        name={'md-checkmark'}
        size={25}
        color={'green'}
        //backgroundColor="transparent"
        //resizeMode = 'contain'
        //source={image}
      />
    )
  }


  CNDateString(date) {
    let cn = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    let s = [];
    let YY = date.getFullYear().toString();
    for (let i = 0; i < YY.length; i++)
      if (cn[YY.charAt(i)])
        s.push(cn[YY.charAt(i)]);
      else
        s.push(YY.charAt(i));
    s.push("年");
    let MM = date.getMonth();
    if (MM < 10)
      s.push(cn[MM]);
    else if (MM < 20)
      s.push("十" );
    s.push("月");
    let DD = date.getDate();
    if (DD < 10)
      s.push(cn[DD]);
    else if (DD < 20)
      s.push("十" );
    else
      s.push("二十" );
    s.push("日");
    return s.join('');
  }


  render(): ReactElement<any> {
    const { item } = this.props
    if (!item) return null
    const img = item.imgs && item.imgs[0] || null
    const date = moment(item.createdAt).format(" dddd")
    return (
      <View>
        <StyledTop>
          <StyledDateText>
            {this.CNDateString(new Date(item.createdAt))+date}
          </StyledDateText>
          {/*{this._renderDone()}*/}
        </StyledTop>
        {!!item.recordText && <StyledRecordText>
          {item.recordText}
        </StyledRecordText>}

        {img && <StyledZoomImage
          imageUrls={[{ url: img }]}/>}
      </View>
    );
  }
}

