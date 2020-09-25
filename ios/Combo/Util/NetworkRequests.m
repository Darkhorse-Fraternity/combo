//
//  NetworkRequests.m
//  hmyg
//
//  Created by 罗伟 on 15/12/10.
//  Copyright © 2015年 罗伟. All rights reserved.
//

#import "NetworkRequests.h"
#import <AFNetworking/AFNetworking.h>

//1、创建一个全局实例,并且初始化为nil
static AFHTTPSessionManager *manager = nil;
@interface NetworkRequests()

@end

@implementation NetworkRequests

+(AFHTTPSessionManager *)shareAFManagerHandel{
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if(manager == nil){
            manager = [AFHTTPSessionManager manager];
            
            //为afn manager设置后台需要的值
            [self afnManagerSetValue:manager];
        }
    });
    
    return manager;
}
-(NSString *)getHmygToken{
  return @"111";
}
#pragma mark-------------AFNetworking请求-------------
/**
 *  AFNetworking请求
 *
 *  @param urlStr     url
 *  @param param      参数
 *  @param addHudView 添加hud的页面
 */
+(void)requestObjWithUrl:(NSString *)urlStr andHeaderDic:(NSDictionary *)header andParam:(NSDictionary *)param withResponseBlock:(ResponseBlock)block{
    
    __block id obj;
    
    AFHTTPSessionManager *session = [NetworkRequests shareAFManagerHandel];
    if (header) {
      for (NSString *key in header.allKeys) {
        NSString *value =header[key];
        [manager.requestSerializer setValue:value forHTTPHeaderField:key];//type

      }
    }
    if (!param) {
      param = [NSDictionary new];
    }
    session.responseSerializer.acceptableContentTypes=[NSSet setWithObject:@"application/json"];
    [session POST:urlStr parameters:param
         progress:^(NSProgress * _Nonnull uploadProgress) {
             
         } success:^(NSURLSessionDataTask *task, id responseObject) {
             //NSLog(@"成功");
             
             obj=(NSMutableDictionary *)responseObject;
             if(block){
                 block(nil,obj);
             }
         } failure:^(NSURLSessionDataTask *task, NSError *error) {
             //NSLog(@"失败");
             
             if(block){
                 block(error,nil);
             }
         }];
}
/**
 为afn manager设置后台需要的值

 @param manager
 */
+(void)afnManagerSetValue:(AFHTTPSessionManager *)manager{

    [manager.requestSerializer setValue:@"IOS" forHTTPHeaderField:@"type"];//type
}
+ (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString {
    if (jsonString == nil) {
        return nil;
    }
    
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingMutableContainers
                                                          error:&err];
    if(err) {
        NSLog(@"json解析失败：%@",err);
        return nil;
    }
    return dic;
}
@end

