/* @flow */
'use strict'

import { methodType, cacheType } from './'
import {apiHost} from '../configure/reqConfigs'
// import {LeanCloud_APP_ID,LeanCloud_APP_KEY} from '../configure/leancloud'

export function requestSmsCode(mobilePhoneNumber) {
    return {
        path: '/requestSmsCode',
        method: methodType.post,
        params: {
            mobilePhoneNumber, //必须
        }
    }

}


export function usersMe() {
    return {
        path: '/users/me',
        // head:{
        //     "Content-Type": "application/json",
        //     "X-LC-Key": LeanCloud_APP_KEY,
        //     "X-LC-Id": LeanCloud_APP_ID,
        // },
        method: methodType.get,
    }
}

/**
 * 通过手机短信来实现「忘记密码」的功能：
 * @param mobilePhoneNumber
 * @returns {{path: string, method: string, param: Arguments}}
 */
export function requestPasswordResetBySmsCode(mobilePhoneNumber: string) {
    return {
        path: '/requestPasswordResetBySmsCode',
        method: methodType.post,
        params: {
            mobilePhoneNumber
        },
    }
}

export function resetPasswordBySmsCode(password: string, code: string) {
    return {
        path: '/resetPasswordBySmsCode/' + code,
        method: methodType.put,
        params: {
            password,
        },
    }
}


//发送验证码
export function requestMobilePhoneVerify(mobilePhoneNumber) {
    return {
        path: '/requestMobilePhoneVerify',
        method: methodType.post,
        params: {
            mobilePhoneNumber,
        },
    }
}

//检验验证码
export function verifySmsCode(code) {
    return {
        path: '/verifySmsCode/' + code,
        method: methodType.post,
    }
}


/**
 * 用手机号码来注册
 * @param  {[type]} mobilePhoneNumber:string [description]
 * @param  {[type]} smsCode:string           [description]
 * @param  {[type]} password:string          [description]
 * @return {[type]}                          [description]
 */
export function requestUsersByMobilePhone(mobilePhoneNumber: string, smsCode: string, password: string): Object {
    return {
        path: '/usersByMobilePhone',
        method: methodType.post,
        params: {
            mobilePhoneNumber,//必须
            smsCode,//必须，且为六位。
            password,//不必须，要业务需求必须。
        }
    }
}

/**
 * 使用手机和密码登录
 * @param  {[type]} mobilePhoneNumber:string 注册用的手机号码
 * @param  {[type]} password:string          密码
 * @return {[type]}                          返回参数信息
 */
export function requestLogin(mobilePhoneNumber: string, password: string): Object {
    return {
        path: '/login',
        method: methodType.get,
        params: {
            mobilePhoneNumber,
            password,
        }
    }
}


/**
 * 获取用户
 * @param id 用户的ID
 * @returns {{path: string, method: string}}
 */
export function getUserByID(id: string): Object {
    return {
        path: '/users/' + id,
        method: methodType.get,
    }
}

/**
 * 给user 数据变更。
 * @param  {[type]} userID:string [description]
 * @param  {[type]} obj:Object    [description]
 * @return {[type]}               [description]
 */
export function bindingToUser(userID: string, obj: Object): Object {

    const path = '/users/' + userID;
    return {
        path: path,
        method: methodType.put,
        params: obj,
        needSession: true,
    }
}

/**
 * 使用新旧密码参数来修改密码
 * @param  {[type]} id:string             [description]
 * @param  {[type]} old_password:string   [description]
 * @param  {[type]} new_password:'string' [description]
 * @return {[type]}                       [description]
 */
export function updatePassword(id: string, old_password: string,
                               new_password: string): Object {
    return {
        path: '/users/' + id + '/updatePassword',
        method: methodType.put,
        params: {
            old_password,
            new_password,
        },
        needSession: true,
    }
}

/**
 * 跟新用户昵称
 * @param  {[type]} id:string       用户ID
 * @param  {[type]} nickname:string 更新后的名字
 * @return {[type]}                 [description]
 */
export function updateNickName(id: string, nickname: string): Object {
    return {
        path: '/users/' + id,
        method: methodType.put,
        needSession: true,
        params: {
            nickname
        }
    }
}

/**
 * 绑定文件或图片到user中。
 * @param  {[type]} userID:string [description]
 * @param  {[type]} fileID:string [description]
 * @param  {[type]} name:string   [description]
 * @return {[type]}               [description]
 */
export function bindingFileToUser(userID: string, fileID: string, name: string): Object {

    const param = {};
    param[name] = {
        "id": fileID,
        "__type": "File"
    };

    return bindingToUser(userID, param);
}


/**
 * 连接第三方用户
 */
export function bindingAuthDataToUser(userID: string,
                                      key: string,
                                      authData: object,
                                      exData: obejct): Object {
    return bindingToUser(userID, {
        authData: {
            [key]: authData
        },
        ...exData
    });
}

export function thirdLogin(key, authData) {
    return {
        path: '/users',
        method: methodType.post,
        params: {
            authData: {
                [key]: authData
            }
        },
    }

}


/**
 * 删除文件
 * @param  {[type]} fileID:string 文件的ID，
 * @return {[type]}               [description]
 */
export function deleteFile(fileID: string): Object {
    const path = '/files/' + fileID
    return {
        path: path,
        method: methodType.delete,
    }
}

export function feedbackParam(content: string, contact: string): Object {
    return {
        path: '/feedback',
        method: methodType.post,
        params: {
            status: 'open',
            content,
            contact,
        }
    }
}

//Object

/**
 * 基础查询,含有id 的时候则为具体值。
 * @param  {[type]} className:string 查询的类名
 * @param  {[type]} id:string        =“” 可选，具体的id
 * @return {[type]}                  [description]
 */
export function classIDSearch(className: string, id: string = ''): Object {
    return {
        path: '/classes/' + className + '/' + id,
        method: methodType.get
    }
}

export function classSearch(className: string, params: Object) {
    return {
        path: '/classes/' + className,
        method: methodType.get,
        params
    }
}

export function limitSearch(className: string, page: Number = 0,
                            limit: Number = 40, other: Object = {}, callPath: string): Object {
    const skip = page * limit;
    return {
        path: !callPath ? '/classes/' + className : '/call/' + callPath,
        method: !callPath ? methodType.get : methodType.post,
        params: {
            skip: skip + '',
            limit: limit + '',
            order: '-createdAt',//降序
            ...other
        }
    }
}

export function existSearch(className: string, other: Object = {}) {

    return {
        path: '/classes/' + className,
        method: methodType.get,
        params: {
            count: 1,
            limit: 0,
            ...other
        }
    }
}

/**
 * 增加
 * @param  {[type]} className:string 类名
 * @param  {[type]} params:Object    参数
 * @return {[type]}                  [description]
 */
export function classCreatNewOne(className: string, params: Object): Object {
    return {
        path: '/classes/' + className,
        method: methodType.post,
        params,
    }
}

/**
 * 修改leancloud 对象
 * @param  {[type]} className:string 类名
 * @param  {[type]} objectId:string  对象id
 * @param  {[type]} params:Object    参数
 * @return {[type]}                  [description]
 */
export function classUpdate(className: string, objectId: string, params: Object): Object {
    return {
        path: '/classes/' + className + '/' + objectId,
        method: methodType.put,
        params,
    }
}

/**
 * 删除对象
 * 你也可以在一个对象中删除一个字段，通过 Delete 操作（注意：这时候 HTTP Method 还是 PUT）：
 * @param  {[type]} className:string [description]
 * @param  {[type]} objectId:string  [description]
 * @param  {[type]} params:Object    [description]
 * @return {[type]}                  [description]
 */
export function classDelete(className: string, objectId: string, params: Object): Object {
    return {
        path: '/classes/' + className + '/' + objectId,
        method: methodType.delete,
        params,
    }
}

export function classBatch(requests: [Object]): Object {
    const newRequests = requests.map((request, i) => {
        return {
            path: '/1.1' + request.path,
            method: request.method,
            body: request.params,
        }
    });
    return {
        path: '/batch',
        method: methodType.post,
        params: { requests: newRequests },
    }
}


//关注
export function friendshipAdd(userId: string, friendshipId: string): Object {
    return {
        path: '/users/' + userId + "/friendship/" + friendshipId,
        method: methodType.post,
        params: {},
    }
}

//取消关注
export function friendshipDelete(userId: string, friendshipId: string): Object {
    return {
        path: '/users/' + userId + "/friendship/" + friendshipId,
        method: methodType.delete,
        params: {},
    }
}

export function friendNum(userId: string): Object {
    return {
        path: '/users/' + userId + "/followersAndFollowees",
        method: methodType.get,
        params: {
            count: 1,
            limit: 0
        },
    }
}

//查询关注的人
export function followeeList(userId: string, page: number = 0) {
    const limit = 20;
    const skip = page * limit;
    return {
        path: '/users/' + userId + "/followees",
        method: methodType.get,
        params: {
            include: "followee",
            skip: skip + '',
            limit: limit + '',
            order: '-createdAt',//降序
        },
    }
}

//查询粉丝
export function followerList(userId: string, page: number = 0) {
    const limit = 20;
    const skip = page * limit;
    return {
        path: '/users/' + userId + "/followers",
        method: methodType.get,
        params: {
            include: "follower",
            skip: skip + '',
            limit: limit + '',
            order: '-createdAt',//降序
        },
    }
}

//判断是否已经关注或者被关注
//这边有点奇怪，并没有加include，然后却返回了followee的完全值
export function friendExist(userId: string, followId: string) {
    return {
        path: '/users/' + userId + "/followees",
        method: methodType.get,
        params: {
            where: {
                followee: {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": followId
                },
            },
            count: 1,
            limit: 0,
        }
    }
}

export function pushInstallation(OS: String, token: string) {
    let installationId = OS === 'ios' ? { "deviceToken": token } : { "installationId": token }
    // const LeanCloud_APP_ID = 'q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt';
    // const LeanCloud_APP_KEY = 'y6ffzv6mq705pya2pd6kgl1ni1vwlppesis7f1qi19afg5nn';
    return {
        scheme: 'https',
        host: 'leancloud.cn/1.1',
        path: '/installations',
        method: methodType.post,
        // head:{
        //     "Content-Type": "application/json",
        //     "X-LC-Key": LeanCloud_APP_KEY,
        //     "X-LC-Id": LeanCloud_APP_ID,
        // },
        params: {
            "deviceType": OS,
            ...installationId,
            "channels": [
                "public", "protected", "private"
            ],
        },
    }
}

export function updateInstallation(id: String, params) {
    return {
        scheme: 'https',
        host: 'leancloud.cn/1.1',
        path: '/installations/' + id,
        method: methodType.put,
        // head:{
        //     "Content-Type": "application/json",
        //     "X-LC-Key": LeanCloud_APP_KEY,
        //     "X-LC-Id": LeanCloud_APP_ID,
        // },
        params
    }
}

//统计数据API
export function openCollet(params) {
    return {
        scheme: 'https',
        host: 'leancloud.cn/1.1',
        path: '/stats/open/collect',
        method: methodType.post,
        // head:{
        //     "Content-Type": "application/json",
        //     "X-LC-Key": LeanCloud_APP_KEY,
        //     "X-LC-Id": LeanCloud_APP_ID,
        // },
        params
    }
}

//获取微信OPENID
export function wechatInfo(appid, secret, code) {
    return {
        scheme: 'https',
        host: 'api.weixin.qq.com',
        path: '/sns/oauth2/access_token',
        method: methodType.get,
        head: {},
        params: {
            appid,
            secret,
            code,
            grant_type: 'authorization_code'
        }
    }
}

//获取微信用户信息
export function wechatUserInfo(access_token, openid) {
    return {
        scheme: 'https',
        host: 'api.weixin.qq.com',
        path: '/sns/userinfo',
        method: methodType.get,
        head: {},
        params: {
            access_token,
            openid,
        }
    }
}

//获取QQ用户信息
export function QQUserInfo(access_token, oauth_consumer_key, openid) {
    return {
        scheme: 'https',
        host: 'graph.qq.com',
        path: '/user/get_user_info',
        method: methodType.get,
        head: {},
        params: {
            access_token,
            oauth_consumer_key,
            openid
        }
    }
}


/*
 *  用户支付
 *  @userId 用户id
 *  @orderId 订单号
 *  @money 金额
 *  @type  0 微信 1 支付宝
 */

export function userpay(type,tradeId,amount,detail,description,ip) {
    return {
        host: apiHost,
        path: '/getPrePay/',
        method: methodType.post,
        params: {
            amount,
            type,
            detail,
            tradeId,
            description,
            ip,
        }
    }
}


/*
 * 获取android 升级配置
 */



export function appUpdateInfo():Object{
    return {
        path : '/call/appUpdateInfo',
        method :methodType.post,
        params :{
        }
    }
}


export function userExsitJudge(type,id) :Object{
  return {
    path : '/call/userExsitJudge',
    method :methodType.post,
    params :{
      type,
      id
    }
  }
}

/*
 *  支付的最后一步流程
 */


export function payOrder(payId,tradeId) {
    return {
        path : '/call/payOrder',
        method :methodType.post,
        params :{
            payId,
            tradeId
        }
    }
}

export function courseReadNumAdd(courseId) {
  return {
    path : '/call/courseReadNumAdd',
    method :methodType.post,
    params :{
      courseId,
    }
  }
}