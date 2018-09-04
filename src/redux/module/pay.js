import * as WeChat from 'react-native-wechat';
// WeChat.registerApp('wx45feb9299ac8334a')
import Alipay from '@0x5e/react-native-alipay';
import * as immutable from 'immutable';
import { userpay } from '../../request/leanCloud'
import { req } from '../actions/req'
import { queryStringToJSON } from '../../request/useMeth'
import Toast from 'react-native-simple-toast'
//type: 0:wechat 1:alipay
import DeviceInfo from 'react-native-device-info'

WeChat.registerApp('wx637e6f35f8211c6d')


const getIp = async () => {
    const response = await fetch('https://api.ipify.org');
    return await response.text();
}

export function pay(type, tradeId, amount, detail, description) {


    return async dispatch => {

        // console.log('paypre res:', res.data);
        if (type === 'weixin_app') {

            if (!WeChat.isWXAppInstalled()) {
                Toast.show('没有安装微信~！')
                return;
            }

            const ip = await getIp()

            const data = await  req(userpay(type,
                tradeId,
                amount * 100,
                detail,
                description,
                ip))


            const obj = {
                // appid:'wx637e6f35f8211c6d',
                partnerId: data.partnerid,//商家向财付通申请的商家ID
                prepayId: data.prepayid,//预支付订单ID
                nonceStr: data.noncestr,//随机串
                timeStamp: data.timestamp,//时间戳
                package: data.package,//商家根据财付通文档填写的数据和签名
                sign: data.sign,//商家根据微信开放平台文档对数据做的签名
            }


            // console.log('obj:', obj);

            return dispatch(wechatPay(obj))
        } else if (type === 'alipay_app') {
            const res = await req(userpay(
                type,
                tradeId,
                amount,
                detail,
                description))
            // console.log('res:', res);
            // const data = queryStringToJSON(res.data)
            return dispatch(aliPay(res.data))
        } else {

        }
    }

}


export function wechatPay(obj) {
    return async dispatch => {
        try {
            const res = await WeChat.pay(obj)
            // Toast.show(res)
            console.log('wechat res:', res);
            if (res.errCode === 0 && res.type === 'PayReq.Resp') {
                Toast.show('支付成功')


                return dispatch(suc(res))
            }
        } catch (e) {

            if (e instanceof WeChat.WechatError) {
                // console.error(e.stack);
                const errObj = {
                    '-1': '普通错误类型',
                    '-2': '支付取消',
                    '-3': '发送失败',
                    '-4': '授权失败',
                    '-5': '微信不支持',
                    '-6': 'app错误签名',
                }
                console.log('e:', e.code, e.name, e.message, e);
                Toast.show(errObj[e.code + ""])
            } else {
                Toast.show(e.message)
                console.log(e);
            }
            return dispatch(fail())

        }


    }
}


export function aliPay(order) {
    return async dispatch => {
        try {
            let response = await Alipay.pay(order);
            console.log('res', response);
            let { resultStatus, result, memo } = response;


            console.log('result:', response);

            if (resultStatus === '9000') {
                Toast.show('支付成功');
                let resJson = JSON.parse(result);
                // let { code, msg, app_id, out_trade_no, trade_no,
                //     total_amount, seller_id, charset, timestamp } = resJson;
                return dispatch(suc(resJson))

            } else {
                Toast.show(memo)
                return dispatch(fail())
            }

            // TODO: ...

        } catch (error) {
            Toast.show(error.message)
            console.error(error.message);
            return dispatch(fail())
        }
    }
}

export function suc(data) {
    return {
        type: PAY,
        payload: {
            statu: 'suc',
            data: data,
        },
    }
}

export function fail() {

    return {
        type: PAY,
        payload: {
            statu: 'fail',
            data: {},
        },
    }
}

const initialState = immutable.fromJS({
    statu: 'suc',
    data: {}
});

export const PAY = 'PAY'

export default function payState(state: immutable.Map<string, any> = initialState, action: Object) {
    switch (action.type) {

        case PAY: {

            // const { fromJS } = require('immutable')
            // const nested = fromJS({ a: { b: { d:{s:1,k:4}  } } })
            // const nested2 = nested.mergeDeep({ a: { b: {d:{s:2,m:3} } } })
            // console.log('nested2:', nested2.toJS());
            // { a: { b: { d:{s:2,m:3,k:4}  } } }  只会去覆盖 存在的属性，如eg

            return state.mergeDeep(action.payload)
        }
        default:
            return state
    }

}