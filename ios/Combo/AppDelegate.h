/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
 #import "GDTSplashAd.h"
@interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate,GDTSplashAdDelegate>

@property (nonatomic, strong) UIWindow *window;

@property (strong, nonatomic) GDTSplashAd *splash;
@property (retain, nonatomic) UIView *bottomView;

@end
