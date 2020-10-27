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

CG_EXTERN  MBProgressHUD* _showOnlyTextView(NSString* text, float duration_time, UIView* view);
#define ShowOnlyTextHUDWithTextOnView(text, duration_time, view) _showOnlyTextView(text, duration_time, view)

#define ShowOnlyTextHUDWithDuration(text, duration)  ShowOnlyTextHUDWithTextOnView(text, duration, self.view)
#define ShowOnlyTextHUDOnView(text,view) ShowOnlyTextHUDWithTextOnView(text, DURATION_SHORT, view)
#define ShowOnlyTextHUD(text)  ShowOnlyTextHUDWithTextOnView(text, DURATION_SHORT, self.view)
 
@interface TTProgressHUD : MBProgressHUD

@end

