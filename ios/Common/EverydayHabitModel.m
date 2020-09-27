//
//  EverydayHabitModel.m
//  comboTodayWidget
//
//  Created by 罗伟 on 2020/9/8.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "EverydayHabitModel.h"

@implementation EverydayHabitModel

-(void)setModelWithDic:(NSDictionary *)dic{
    NSDateFormatter *todayFormatter = [[NSDateFormatter alloc]init];
    todayFormatter.dateFormat=@"yyyy-mm-ddT";
    NSDateFormatter *formatter = [[NSDateFormatter alloc]init];
    formatter.dateFormat=@"yyyy-mm-ddThh:mm:ss";
    if (dic[@"doneDate"] && dic[@"doneDate"][@"iso"]) {
        
        NSString *todayStr =[todayFormatter stringFromDate:[NSDate new]];
        
        
        NSString *dateStr=dic[@"doneDate"][@"iso"];
        NSString *beforeDawnStr=[NSString stringWithFormat:@"%@00:00:00",todayStr];
        dateStr = [dateStr substringToIndex:19];
        NSDate *doneDate = [formatter dateFromString:dateStr];
        self.doneDate = doneDate;
        NSDate *beforeDawnDate = [formatter dateFromString:beforeDawnStr];
        if ([doneDate earlierDate:beforeDawnDate] == beforeDawnDate) {//凌晨是较早的日期 就是打卡了
            self.isDone = YES;
        }else{
            self.isDone = NO;
        }
    }
    if (dic[@"iCard"] && dic[@"iCard"][@"iconAndColor"]) {
        self.image = dic[@"iCard"][@"iconAndColor"][@"name"];
    }
    if (dic[@"iCard"] && dic[@"iCard"][@"title"]) {
        self.title = dic[@"iCard"][@"title"];
    }
    if (dic[@"iCard"] && dic[@"iCard"][@"record"]){
        NSArray *record =dic[@"iCard"][@"record"];
        if (record.count>0) {
            self.canDone = NO;
        }else{
            self.canDone = YES;
        }
    }
    if (dic[@"iCard"] && dic[@"iCard"][@"limitTimes"]) {
        NSArray *limitTimes =dic[@"iCard"][@"limitTimes"];
        if (limitTimes.count == 2) {
            NSString *startStr =limitTimes[0];
            NSString *endStr =limitTimes[1];
            NSString *todayStr =[todayFormatter stringFromDate:[NSDate new]];
            
            startStr =[NSString stringWithFormat:@"%@%@:00",todayStr,startStr];
            endStr =[NSString stringWithFormat:@"%@%@:00",todayStr,endStr];;
            NSDate *startDate = [formatter dateFromString:startStr];
            NSDate *endDate = [formatter dateFromString:endStr];
            if (self.doneDate) {
                if ([self.doneDate earlierDate:startDate] == startDate && [self.doneDate earlierDate:endDate] == self.doneDate) {
                    self.isShow = YES;
                }else{
                    self.isShow = NO;
                }
            }
        }
    }
}
@end
