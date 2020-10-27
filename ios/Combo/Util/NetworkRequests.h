//
//  NetworkRequests.h
//  hmyg
//  网络请求
//  Created by 罗伟 on 15/12/10.
//  Copyright © 2015年 罗伟. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@interface NetworkRequests : NSObject
#pragma mark---------代码块---------
typedef void(^ResponseBlock)(NSError *error, id dataDict);
#pragma mark---------参数---------
@property(strong,nonatomic) id obj;
@property(assign,nonatomic) int timeout;


#pragma mark-------------异步请求-------------
/**
 *  AFNetworking请求（有userId内部会判断）
 *
 *  @param urlStr     url
 *  @param param      参数
 *  @param block   返回
 */
+(void)requestObjWithUrl:(NSString *)urlStr andHeaderDic:(NSDictionary *)header andParam:(id)param withResponseBlock:(ResponseBlock)block;

+(void)requestJsonObjWithUrl:(NSString *)urlStr andHeaderDic:(NSDictionary *)header andParam:(id)param withResponseBlock:(ResponseBlock)block;
+ (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString;
@end
