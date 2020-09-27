//
//  EverydayHabitModel.h
//  comboTodayWidget
//
//  Created by 罗伟 on 2020/9/8.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface EverydayHabitModel : NSObject
@property (nonatomic,copy) NSString *image;//图片
@property (nonatomic,copy) NSString *title;//标题
@property (nonatomic,assign) BOOL isDone;//是否打卡

@property (nonatomic,assign) BOOL canDone;//是否能打卡

@property (nonatomic,assign) BOOL isShow;//是否展示（在时间限制内就展示）
@property (nonatomic,copy) NSDate *doneDate;
-(void)setModelWithDic:(NSDictionary *)dic;
@end

