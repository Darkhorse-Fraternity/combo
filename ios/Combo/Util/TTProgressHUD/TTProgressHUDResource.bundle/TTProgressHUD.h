//
//  TTProgressHUD.h
//  QJDecoratingHeadlines
//
//  Created by 周彬 on 16/9/21.
//  Copyright © 2016年 huarangege. All rights reserved.
//

#define DURATION_SHORT (2)
#define DURATION_LONG  (3.5)

#import <MBProgressHUD/MBProgressHUD.h>
#import "IconFontCode.h"
#import "UIImage+Extensions.h"
#import "DHCoinSuccessView.h"

CG_EXTERN  MBProgressHUD* _showCostomViewForLoading(NSString* text, float duration_time, UIView* view,UIColor *bezelViewColor);
CG_EXTERN  MBProgressHUD* _showResultView(NSString* text, NSString* detailText, float duration_time, UIView* view, UIImage *image);
CG_EXTERN  MBProgressHUD* _showResultViewByIconFont(NSString* text, float duration_time, UIView* view, CGFloat fontSize,UIColor *iconColor,NSString *iconCode);
CG_EXTERN  MBProgressHUD* _showOnlyTextView(NSString* text, float duration_time, UIView* view);
CG_EXTERN  UIView * _showCoinResultView(NSString *text, NSInteger coins, float duration_time, UIView *view);
#define ShowOnlyTextHUDWithTextOnView(text, duration_time, view) _showOnlyTextView(text, duration_time, view)

#define ShowOnlyTextHUDWithDuration(text, duration)  ShowOnlyTextHUDWithTextOnView(text, duration, self.view)
#define ShowOnlyTextHUDOnView(text,view) ShowOnlyTextHUDWithTextOnView(text, DURATION_SHORT, view)
#define ShowOnlyTextHUD(text)  ShowOnlyTextHUDWithTextOnView(text, DURATION_SHORT, self.view)

// 添加金币成功
// 添加金币成功
#define ShowADDGoldSuccessHUD(text, coins, view)  _showCoinResultView(text, coins, DURATION_SHORT, view);
// 错误提示
#define ShowRequestErrorHUD(text, duration, view)  _showResultView(text, @"", duration, view, [UIImage imageNamed:@"TTProgressHUDResource.bundle/hud_error"]);

// 警告提示
#define ShowRequestWarnHUD(text, duration, view)  _showResultView(text, @"", duration, view, [UIImage imageNamed:@"TTProgressHUDResource.bundle/hud_warn"]);

// 成功提示
#define ShowRequestSuccessHUD(text, duration, view) _showResultView(text, @"", duration, view, [UIImage imageNamed:@"TTProgressHUDResource.bundle/hud_success"]);

#define ShowRequestSuccessDETAILHUD(text,detailText, duration, view) _showResultView(text, detailText, duration, view, [UIImage imageNamed:@"TTProgressHUDResource.bundle/hud_success"]);

// 已收藏
#define ShowCollectedHUD(text, duration, view) _showResultView(text, @"", duration, view, [[UIImage imageNamed:@"TTProgressHUDResource.bundle/hud_collect"] imageWithTintColor:RGBA(255, 255, 255, 255)]);

// 取消收藏
#define ShowCollectCancelHUD(text, duration, view) _showResultView(text, @"", duration, view, [[UIImage imageNamed:@"TTProgressHUDResource.bundle/hud_collect_cancle"] imageWithTintColor:RGBA(255, 255, 255, 255)]);

#define ShowCostomLoadingHUDTextInView(text, duration_time, view)  _showCostomViewForLoading(text, duration_time, view, [UIColor clearColor])

#define ShowCostomLoadingHUDTextInViewTranslucent(text, duration_time, view)  _showCostomViewForLoading(text, duration_time, view, nil)

#define ShowCostomLoadingHUDText(text)   ShowCostomLoadingHUDTextInView(text,0,self.view)
#define ShowCostomLoadingHUD()  ShowCostomLoadingHUDText(@"")

#define HideHUDOnSelfView [MBProgressHUD hideHUDForView:self.view animated:NO];
#define HideHUDOnKeyWindow [MBProgressHUD hideHUDForView:[UIApplication sharedApplication].keyWindow animated:NO];
#define HideHUDOnView(view)      [MBProgressHUD hideHUDForView:view animated:NO];

 
@interface TTProgressHUD : MBProgressHUD

@end

