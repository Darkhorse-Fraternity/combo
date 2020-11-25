/**
 * Created by lintong on 2018/2/27.
 * @flow
 */
'use strict';

import React, { FC, useState } from 'react';
import { ImageSourcePropType, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import {
  StyledContent,
  StyledPriceText,
  StyleRadio,
  StyleRadioText,
  RadioIcon,
  RadioImage,
  StyledRadioInnner,
  StyledBuyButton,
  RadioPlacehold,
  RadioPlaceholdText,
  StyledHeaderView,
  StyledHeaderTitle,
  StyledIconAwesome,
  StyledActivityIndicator,
} from './style';
// import { Radio } from '../../Form/Select';
import Button from '../../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PayFormProps {
  balance: number;
  price: number;
  load: boolean;
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (type: string) => void;
}

interface ItemProps {
  name: string;
  source?: ImageSourcePropType;
  selected: boolean;
}

const option = [
  {
    id: 'alipay_app',
    name: '支付宝',
    source: require('../../../../source/img/icon/alipay.png'),
  },
  {
    id: 'weixin_app',
    name: '微信',
    source: require('../../../../source/img/icon/wechatpay.png'),
  },
];

const RenderRadioItem: FC<ItemProps> = ({ name, source, selected }) => {
  //   const { name, ItemId, source } = item;

  // console.log('test:', ItemId,selItem);

  return (
    <StyleRadio>
      <StyledRadioInnner>
        {source ? (
          <RadioImage source={source} />
        ) : (
          <RadioPlacehold>
            <RadioPlaceholdText>￥</RadioPlaceholdText>
          </RadioPlacehold>
        )}
        <StyleRadioText>{name}</StyleRadioText>
      </StyledRadioInnner>
      <RadioIcon
        size={20}
        name={selected ? 'ios-radio-button-on' : 'ios-radio-button-off'}
      />
    </StyleRadio>
  );
};

const PayForm: FC<PayFormProps> = (props) => {
  const {
    //   disabled,
    price,
    //   pristine,
    load,
    balance,
    //   enableSumbmit,
    //   onClose,
    onClose,
    isVisible,
    onSubmit,
  } = props;
  // let { submitting, invalid } = rest;
  const [selectId, setSelectId] = useState('alipay');

  const myOption = [
    ...option,
    {
      id: 'cash',
      name: `账户余额: ${(balance / 100).toFixed(1)}元`,
    },
  ];

  const onPress = (id: string) => setSelectId(id);

  const submitDisabled = false;

  return (
    <Modal
      animationIn={'fadeInUp'}
      useNativeDriver
      style={styles.modal}
      animationOut={'fadeOutDown'}
      isVisible={isVisible}>
      <StyledContent>
        <StyledHeaderView>
          <View />
          <StyledHeaderTitle>选择支付方式</StyledHeaderTitle>
          <Button
            hitSlop={{ top: 20, left: 20, bottom: 10, right: 20 }}
            onPress={onClose}>
            <StyledIconAwesome size={30} name={'close'} />
          </Button>
        </StyledHeaderView>
        {/* <Radio
          name="PayRadio"
          keyName="ItemId"
          options={myOption}
          renderItem={this.__renderRadioItem}
        /> */}
        {myOption.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={onPress.bind(undefined, item.id)}>
            <RenderRadioItem {...item} selected={selectId === item.id} />
          </TouchableOpacity>
        ))}
        <StyledBuyButton
          //   {...rest}
          style={{ backgroundColor: submitDisabled ? '#f6f7f9' : '#1ac305' }}
          //   disabled={submitDisabled || submitting}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={onSubmit.bind(undefined, selectId)}>
          {!load ? (
            <StyledPriceText submitDisabled={false}>
              立即支付：￥{price.toFixed(1)}
            </StyledPriceText>
          ) : (
            <StyledActivityIndicator color={'white'} />
          )}
        </StyledBuyButton>
      </StyledContent>
    </Modal>
  );
};

export default PayForm;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});
