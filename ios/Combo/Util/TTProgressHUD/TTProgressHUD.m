//
//  TTProgressHUD.m
//  QJDecoratingHeadlines
//
//  Created by 周彬 on 16/9/21.
//  Copyright © 2016年 huarangege. All rights reserved.
//

#import "TTProgressHUD.h"

MBProgressHUD* _showOnlyTextView(NSString* text, float duration_time, UIView* view) {
    [MBProgressHUD hideHUDForView:view animated:NO];
    MBProgressHUD *hud = [[MBProgressHUD alloc] initWithView:view];
    hud.mode = MBProgressHUDModeText;
    [view addSubview:hud];
    hud.label.text = text;
    
    hud.label.font = [UIFont systemFontOfSize:16];
    hud.label.textColor = [UIColor whiteColor];
    hud.label.numberOfLines = 0;
    hud.label.text = text;
    hud.detailsLabel.font = [UIFont systemFontOfSize:16];
    hud.detailsLabel.textColor = [UIColor whiteColor];
    hud.bezelView.style = MBProgressHUDBackgroundStyleSolidColor;
    hud.bezelView.color = [[UIColor blackColor] colorWithAlphaComponent:0.75];
    hud.bezelView.layer.cornerRadius = 20;

    [hud showAnimated:NO];
    if (duration_time > 0) {
        [hud hideAnimated:NO afterDelay:duration_time];
    }
    return hud;
}

@implementation TTProgressHUD

- (instancetype)initWithView:(UIView *)view {
    self = [super initWithView:view];
    if (self) {
        
    }
    return self;
}

@end
