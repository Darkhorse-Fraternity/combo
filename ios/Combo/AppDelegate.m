/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLog.h>
#import <React/RCTLinkingManager.h>
#import "AppearanceConfig.h"
#import "Orientation.h"
#import "RNSplashScreen.h"
#import "RNUMConfigure.h"
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>




#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  #ifdef FB_SONARKIT_ENABLED
     InitializeFlipper(application);
  #endif
  
  NSURL *jsCodeLocation;

  
    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif


  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Combo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  
  
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [AppearanceConfig appearanceConfig];
  
  [RNUMConfigure initWithAppkey:@"5cfe13734ca357b73e00053f" channel:@"appStore"];

  
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  
#ifdef DEBUG
  
#else
//  [RNSplashScreen show];
#endif
 [self gdtAd];
  return YES;
}

// gdtad
-(void)gdtAd{
//  [GDTSplashAd preloadSplashOrderWithAppId:@"1108555154"  placementId:@"7021515378125473"];
  GDTSplashAd *splash = [[GDTSplashAd alloc] initWithAppId:@"1110576976" placementId:@"3061711534698128"];
  self.splash = splash;
  splash.delegate = self; //设置代理
  //根据iPhone设备不同设置不同背景图
//  if ([[UIScreen mainScreen] bounds].size.height >= 568.0f) {
//   splash.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"LaunchImage-568h"]];
//  } else {
//   splash.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"LaunchImage"]];
//  }
  splash.fetchDelay = 3; //开发者可以设置开屏拉取时间，超时则放弃展示
  //设置开屏底部自定义LogoView，展示半屏开屏广告
  _bottomView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, [[UIScreen mainScreen] bounds].size.width, 100)];
  UIImageView *logo = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"logo-horizontal-0"]];
  [logo setFrame:CGRectMake(0, -10,189, 54)];
  [_bottomView addSubview:logo];
  logo.center = _bottomView.center;
    
    
  if (@available(iOS 13.0, *)) {
    _bottomView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
        _bottomView.backgroundColor = [UIColor whiteColor];
    }
  [splash loadAdAndShowInWindow:self.window withBottomView:_bottomView];
}

- (void)splashAdFailToPresent:(GDTSplashAd *)splashAd withError:(NSError *)error
{
  NSLog(@"splashAdFailToPresentwithError:%@",error.userInfo.allValues[0] );
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{

  //js 加载需要时间啊，不知道在release 中如何。

    [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];

}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  {
    [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
  }
}

// Optionally implement this method over the previous to receive remote notifications. However
// implement the application:didReceiveRemoteNotification:fetchCompletionHandler: method instead of this one whenever possible.
// If your delegate implements both methods, the app object calls the `application:didReceiveRemoteNotification:fetchCompletionHandler:` method
// Either this method or `application:didReceiveRemoteNotification:fetchCompletionHandler:` is required in order to receive remote notifications.
//
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for the notification event.

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  completionHandler();
}

// IOS 4-10 Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
 [RNCPushNotificationIOS didReceiveLocalNotification:notification];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

// iOS 8.x or older
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

// iOS 9.x or newer
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<NSString*, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}



@end
