//
//  EverydayHabitCell.m
//  comboTodayWidget
//
//  Created by 罗伟 on 2020/9/8.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "EverydayHabitCell.h"
#import <Masonry/Masonry.h>
#import <SDWebImage/UIImageView+WebCache.h>
@interface EverydayHabitCell ()
@property (nonatomic, strong) UIImageView *mianImageV;//图片
@property (nonatomic, strong) UILabel *titleLabel;
@end
@implementation EverydayHabitCell

- (id)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
      self.contentView.backgroundColor = [UIColor clearColor];
        self.mianImageV = [UIImageView new];
        //暂无数据，请到App里添加
        [self.contentView addSubview:self.mianImageV];
        [self.mianImageV mas_makeConstraints:^(MASConstraintMaker *make) {
          make.size.mas_equalTo(CGSizeMake(38, 38));
          make.top.equalTo(self.contentView).offset(2);
          make.centerX.equalTo(self.contentView);
        }];
        
        self.titleLabel = [[UILabel alloc]init];
        [self.contentView addSubview:self.titleLabel];
        self.titleLabel.font = [UIFont systemFontOfSize:12];
        self.titleLabel.textAlignment = NSTextAlignmentCenter;
        [self.titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(self.mianImageV.mas_bottom).offset(5);
            make.centerX.equalTo(self.contentView);
        }];
    }
    return self;
}

- (void)setModel:(EverydayHabitModel *)model andIndexPath:(NSIndexPath *)indexPath{
  self.titleLabel.text = model.title;
  [self.mianImageV sd_setImageWithURL:[NSURL URLWithString:model.image]];
}
@end
