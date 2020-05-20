
#import "RNAppUtil.h"

@implementation RNAppUtil

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
+ (BOOL)requiresMainQueueSetup
{
    return YES;
}



RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport {
    return @{};
}

RCT_REMAP_METHOD(getAppMetadataBy,
        key: (NSString*)key
   resolver: (RCTPromiseResolveBlock)resolve
   rejecter: (RCTPromiseRejectBlock) reject) {
    NSString* value = nil;
    value = [[NSBundle mainBundle] objectForInfoDictionaryKey: key];
    if (value) {
        resolve(value);
    } else {
        NSError *err = [NSError errorWithDomain:@"RNAppUtil"
                                           code:1
                                       userInfo:@{
                      NSLocalizedDescriptionKey:@"There is no such key"
                                       }];
        reject(@"key_not_found", @"There is no such key", err);
    }
}
@end
  
