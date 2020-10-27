/**
 * Created by lintong on 2018/1/8.
 * @flow
 */


// import * as immutable from 'immutable';
import React, { Component, FC, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableNativeFeedback,
} from 'react-native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import {
  StyledButton,
  StyledImage,
  StyledImagesScolleView,
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
  StyledBottomBtnView
} from './style';
import ImagesViewModal from '../../../../components/ZoomImage/ImagesViewModal';

import { GetClassesIDoResponse, usePostCallIDoLike } from 'src/hooks/interface';
import { storage } from '@configure/storage';
import { useNavigation } from '@react-navigation/native';
import { useGetUserInfo } from 'src/data/data-context';
// static displayName = RecordRow

type ItemType = GetClassesIDoResponse['results'][number]

// handleViewRef = ref => this.likeView = ref;

const RenderLikes: FC<ItemType> = (props) => {
  const {
    likeNum,
    objectId
  } = props;

  const handleViewRef = useRef<Animatable.View>(null)
  const [liked, setLiked] = useState(false);
  const [num, setNum] = useState(likeNum);

  const { run, loading } = usePostCallIDoLike(item => item, { manual: true })

  useEffect(() => {
    storage.load({
      key: 'likeRecord',
      id: objectId
    }).then((liked: boolean) => {
      setLiked(liked)
    }).catch();
  }, [])

  // const { liked } = this.state;
  // const { doLike } = this.props;
  const background = TouchableNativeFeedback.SelectableBackgroundBorderless
    && TouchableNativeFeedback.SelectableBackgroundBorderless();
  return (
    <StyledChatbtn
      disabled={loading}
      activeOpacity={1}
      hitSlop={{
        top: 15, left: 25, bottom: 15, right: 5
      }}
      background={background}
      onPress={() => {
        // this.likeView.bounceIn(2000);
        // doLike(objectId, !liked, likeNum);
        // this.setState({ liked: !liked });


        handleViewRef.current?.bounceIn!(2000);
        if (!liked) {
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
        setNum(res => res + (!liked ? 1 : -1));
        run({ iDoId: objectId, addNum: !liked ? 1 : -1 });
        setLiked(res => !res);

      }}
    >
      <Animatable.View
        ref={handleViewRef as any}
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
        {num === 0 ? '' : num}
      </StyledChatBtnText>
    </StyledChatbtn>
  );
}


const RenderChatBtn: FC<ItemType> = (item) => {
  const {
    commentNew, commentNum, objectId
  } = item;

  const user = useGetUserInfo();
  const { navigate } = useNavigation()

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
        navigate('rcomment', { iDoID: objectId });
      }}
    >
      <StyledMaterialCommunityIcons
        name="chat-bubble-outline"
        size={20}
        color="#8c8c85"
      />
      {commentNew && item.user.objectId === user?.objectId
        && (<StyledNewTip />)}

      <StyledChatBtnText
        numberOfLines={1}
      >
        {commentNum === 0 ? '' : commentNum}
      </StyledChatBtnText>
    </StyledChatbtn>
  );
}



export default class RecordRow extends Component<{ item: ItemType }, { visible: boolean, index: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      index: 0
    };
  }

  render() {
    const { item } = this.props;
    const { visible, index } = this.state;
    const { imgs } = item;
    const uris = imgs && imgs.map(img => ({ url: img }));
    // const date = moment(item.createdAt).format("YYYY-MM-DD HH:mm")
    // moment.locale('zh-cn')
    const fromNow = moment(item.createdAt).fromNow();
    return (
      <StyledButton >
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
              // contentContainerStyle={{ width: (width * 0.65 + 15) * imgs.length }}
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
              <View style={{ width: 40 }} />
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
        </StyledMain>
        <StyledBottom>
          <StyledDateView>
            <StyledDateText>
              {fromNow}
            </StyledDateText>
            <StyledBottomBtnView>
              <RenderLikes {...item} />
              <RenderChatBtn {...item} />
            </StyledBottomBtnView>
          </StyledDateView>
        </StyledBottom>
      </StyledButton>
    );
  }
}
