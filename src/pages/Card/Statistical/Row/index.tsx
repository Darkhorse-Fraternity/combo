/**
 * Created by lintong on 2018/1/8.
 * @flow
 */

// import * as immutable from 'immutable';
import React, { Component } from 'react';
import moment from 'moment';
import {
  StyledButton,
  StyledImage,
  StyledImageButton,
  StyledImagesScolleView,
  StyledRecordText,
  StyledMain,
  StyledDateView,
  StyledDateTextBig,
  StyledDateTextSmall,
} from './style';
import ImagesViewModal from '../../../../components/ZoomImage/ImagesViewModal';
import { UserType } from 'src/data/data-context/interface';
import { GetClassesIDoResponse } from 'src/hooks/interface';

type ItemType = GetClassesIDoResponse['results'][number];
interface RecordRowProps {
  color: string;
  onPress: () => void;
  user: UserType;
  item: ItemType;
}

export default class RecordRow extends Component<
  RecordRowProps,
  { visible: boolean; index: number }
> {
  constructor(props: RecordRowProps) {
    super(props);
    this.state = {
      visible: false,
      index: 0,
    };
  }

  // shouldComponentUpdate(nextProps: Object) {
  //     return !immutable.is(this.props, nextProps)
  // }

  render() {
    const { item, onPress, color } = this.props;
    if (!item) return null;
    const { visible, index } = this.state;
    const { imgs } = item;
    const uris = imgs && imgs.map((img) => ({ url: img }));
    // const date = moment(item.createdAt).format("YYYY-MM-DD HH:mm")
    // moment.locale('zh-cn')
    // const fromNow = moment(item.createdAt).fromNow()
    const { createdAt, doneDate } = item;
    const time = doneDate ? doneDate.iso : createdAt;
    return (
      <StyledButton activeOpacity={1} onPress={onPress}>
        <StyledDateView color={color}>
          <StyledDateTextBig color={color}>
            {moment(time).format('DD')}
          </StyledDateTextBig>
          <StyledDateTextSmall color={color}>
            {moment(time).format('MMM ')}
          </StyledDateTextSmall>
        </StyledDateView>
        <StyledMain>
          {!!item.recordText && (
            <StyledRecordText numberOfLines={3}>
              {item.recordText}
            </StyledRecordText>
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
                  <StyledImage source={{ uri: img }} />
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
        </StyledMain>
      </StyledButton>
    );
  }
}
