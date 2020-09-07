//
//  TodayViewController.m
//  comboTodayWidget
//
//  Created by 罗伟 on 2020/9/2.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "TodayViewController.h"
#import <NotificationCenter/NotificationCenter.h>

@interface TodayViewController () <NCWidgetProviding>
@property (strong,nonatomic) UILabel *mianLab;
@end

@implementation TodayViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  self.extensionContext.widgetLargestAvailableDisplayMode = NCWidgetDisplayModeExpanded;
  self.mianLab = [UILabel new];
  self.mianLab.text=@"测试";
  self.mianLab.frame =CGRectMake(50, 10, 50, 20);
  [self.view addSubview:self.mianLab];
}
- (void)widgetActiveDisplayModeDidChange:(NCWidgetDisplayMode)activeDisplayMode withMaximumSize:(CGSize)maxSize {
    if (activeDisplayMode == NCWidgetDisplayModeExpanded) {
        // 设置展开的新高度
        self.preferredContentSize = CGSizeMake(0, 300);
    }else{
        self.preferredContentSize = maxSize;
    }
}
- (void)widgetPerformUpdateWithCompletionHandler:(void (^)(NCUpdateResult))completionHandler {
    // Perform any setup necessary in order to update the view.
    
    // If an error is encountered, use NCUpdateResultFailed
    // If there's no update required, use NCUpdateResultNoData
    // If there's an update, use NCUpdateResultNewData

    completionHandler(NCUpdateResultNewData);
}

@end
