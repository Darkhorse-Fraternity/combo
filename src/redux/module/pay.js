import * as WeChat from 'react-native-wechat';
// WeChat.registerApp('wx45feb9299ac8334a')
import Alipay from '@0x5e/react-native-alipay';
import * as immutable from 'immutable';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {formValueSelector} from 'redux-form/immutable';
import {userpay, payOrder} from '../../request/leanCloud';
import {req} from '../actions/req';
import {queryStringToJSON} from '../../request/useMeth';
// type: 0:wechat 1:alipay
import {update} from '../actions/user';

WeChat.registerApp('wx637e6f35f8211c6d');
const FormID = 'PayForm';
const selector = formValueSelector(FormID); // <-- same as form name

const getIp = async () => {
  const response = await fetch('https://api.ipify.org');
  return await response.text();
};

/*
  bid：受益人
 */

export function easyPay(amount, description, detail, bid, exData) {
  return dispatch =>
    dispatch(async (dispatch, getState) => {
      const state = getState();
      const userId = state.user.data.objectId;
      // 缴费。

      let radio = selector(state, 'PayRadio');
      radio = radio && radio.toJS && radio.toJS();

      if (!radio) {
        return;
      }
      const {ItemId} = radio;
      const types = {
        alipay: 'alipay_app',
        wechat: 'weixin_app',
        cash: 'cash',
      };
      return dispatch(
        pay(types[ItemId], amount, detail, description, userId, bid, exData),
      );
    });
}

export function pay(type, amount, detail, description, uid, bid, exData) {
  return async dispatch => {
    // if(__DEV__){
    //   await dispatch(req(payOrder('', tradeId)))
    //   Toast.show('支付成功')
    //   return dispatch(suc({}))
    // }

    // console.log('paypre res:', res.data);
    if (type === 'weixin_app') {
      if (!WeChat.isWXAppInstalled()) {
        Toast.show('没有安装微信~！');
        return dispatch(fail());
      }

      const ip = await getIp();

      const data = await dispatch(
        req(
          userpay(
            type,
            // tradeId,
            amount,
            detail,
            description,
            ip,
            uid,
            bid,
            exData,
          ),
        ),
      );

      if (!data) {
        Toast.show('预支付失败!');
        return dispatch(fail());
      }

      const obj = {
        // appid:'wx637e6f35f8211c6d',
        partnerId: data.partnerid, // 商家向财付通申请的商家ID
        prepayId: data.prepayid, // 预支付订单ID
        nonceStr: data.noncestr, // 随机串
        timeStamp: data.timestamp, // 时间戳
        package: data.package, // 商家根据财付通文档填写的数据和签名
        sign: data.sign, // 商家根据微信开放平台文档对数据做的签名
      };

      try {
        await WeChat.pay(obj);
        // console.log('wechatRes:', wechatRes);

        // await dispatch(req(payOrder('', tradeId)))
        Toast.show('支付成功');
        return dispatch(suc(data));
      } catch (e) {
        if (e instanceof WeChat.WechatError) {
          const errObj = {
            '-1': '普通错误类型',
            '-2': '取消支付',
            '-3': '发送失败',
            '-4': '授权失败',
            '-5': '微信不支持',
          };
          Toast.show(errObj[`${e.code}`]);
        } else {
          Toast.show(e.message);
        }
      }
    } else if (type === 'alipay_app') {
      const res = await dispatch(
        req(
          userpay(
            type,
            // tradeId,
            amount,
            detail,
            description,
            '',
            uid,
            bid,
            exData,
          ),
        ),
      );

      if (!res) {
        Toast.show('预支付失败!');
        return dispatch(fail());
      }

      const aliPayRes = await dispatch(aliPay(res.data));

      const {alipay_trade_app_pay_response} = aliPayRes;
      if (alipay_trade_app_pay_response) {
        // const { trade_no } = alipay_trade_app_pay_response;
        // console.log('aliPayRes:', aliPayRes);
        // const params = payOrder(trade_no, tradeId)
        // await dispatch(req(params))
        Toast.show('支付成功');
        // console.log('lastRes:', lastRes);
        return dispatch(suc(alipay_trade_app_pay_response));
      }
      return dispatch(fail());
    } else if (type === 'cash') {
      // const params = payOrder('', tradeId)
      // const lastRes = await dispatch(req(params))

      const cashParams = userpay(
        type,
        // tradeId,
        amount,
        detail,
        description,
        '',
        uid,
        bid,
        exData,
      );
      const lastRes = await dispatch(req(cashParams));
      if (lastRes) {
        console.log('lastRes', lastRes);

        dispatch(update()); // 更新用户数据
        Toast.show('支付成功');
        return dispatch(suc(lastRes));
      }
      Toast.show('预支付失败!');
      return dispatch(fail());
    }
  };
}

export function wechatPay(obj) {
  return dispatch => {
    try {
      return WeChat.pay(obj);
      // Toast.show(res)
      // console.log('wechat res:', res);\
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        // console.error(e.stack);
        const errObj = {
          '-1': '普通错误类型',
          '-2': '取消',
          '-3': '发送失败',
          '-4': '授权失败',
          '-5': '微信不支持',
          '-6': 'app错误签名',
        };
        console.log('e:', e.code, e.name, e.message, e);
        Toast.show(errObj[`${e.code}`]);
      } else {
        Toast.show(e.message);
        console.log(e);
      }
      return dispatch(fail());
    }
  };
}

export function aliPay(order) {
  return async dispatch => {
    try {
      const response = await Alipay.pay(order);
      // console.log('res', response);
      const {resultStatus, result, memo} = response;
      if (resultStatus === '9000') {
        return JSON.parse(result);
        // let { code, msg, app_id, out_trade_no, trade_no,
        //     total_amount, seller_id, charset, timestamp } = resJson;
      }
      Toast.show(memo);
      return dispatch(fail());

      // TODO: ...
    } catch (error) {
      Toast.show(error.message);
      console.error(error.message);
      return dispatch(fail());
    }
  };
}

export function suc(data) {
  return {
    type: PAY,
    payload: {
      statu: 'suc',
      data,
    },
  };
}

export function fail() {
  return {
    type: PAY,
    payload: {
      statu: 'fail',
      data: {},
    },
  };
}

const initialState = immutable.fromJS({
  statu: 'suc',
  data: {},
});

export const PAY = 'PAY';

export default function payState(
  state: immutable.Map<string, any> = initialState,
  action: Object,
) {
  switch (action.type) {
    case PAY: {
      // const { fromJS } = require('immutable')
      // const nested = fromJS({ a: { b: { d:{s:1,k:4}  } } })
      // const nested2 = nested.mergeDeep({ a: { b: {d:{s:2,m:3} } } })
      // console.log('nested2:', nested2.toJS());
      // { a: { b: { d:{s:2,m:3,k:4}  } } }  只会去覆盖 存在的属性，如eg

      return state.mergeDeep(action.payload);
    }
    default:
      return state;
  }
}
