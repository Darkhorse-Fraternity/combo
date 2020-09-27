//
//  EverydayHabitCell.h
//  comboTodayWidget
//
//  Created by 罗伟 on 2020/9/8.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "EverydayHabitModel.h"
NS_ASSUME_NONNULL_BEGIN

@interface EverydayHabitCell : UICollectionViewCell
typedef void(^TapBlock)(EverydayHabitModel *model);

- (void)setModel:(EverydayHabitModel *)model andIndexPath:(NSIndexPath *)indexPath withTapBlock:(TapBlock)block;
@end

NS_ASSUME_NONNULL_END
