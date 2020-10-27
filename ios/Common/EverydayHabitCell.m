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
#define RGBHexColor(hexValue, alphaValue) [UIColor colorWithRed:((float)((hexValue & 0xFF0000) >> 16))/255.0 green:((float)((hexValue & 0xFF00) >> 8))/255.0 blue:((float)(hexValue & 0xFF))/255.0 alpha:alphaValue]
@interface EverydayHabitCell ()
@property (nonatomic, strong) UIView *mianImageBgV;//图片
@property (nonatomic, strong) UIImageView *mianImageV;//图片
@property (nonatomic, strong) UIImageView *doneImageV;//完成图片
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) EverydayHabitModel *model;
@property (nonatomic, strong) TapBlock tapBlock;
@end
@implementation EverydayHabitCell

- (id)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.contentView.backgroundColor = [UIColor clearColor];
        UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tapView:)];
        
        //设置轻拍次数
        tap.numberOfTapsRequired = 1;
        //设置手指字数
        tap.numberOfTouchesRequired = 1;
        //别忘了添加到testView上
        [self.contentView addGestureRecognizer:tap];
        
        self.mianImageBgV = [UIView new];
        self.mianImageBgV.layer.cornerRadius = 19;
        self.mianImageBgV.layer.borderWidth = 1;
        self.mianImageBgV.layer.borderColor = RGBHexColor(0x45AB53, 1).CGColor;
        self.mianImageBgV.layer.backgroundColor = RGBHexColor(0xA1D5A9, 1).CGColor;
        [self.mianImageBgV setClipsToBounds:YES];
        //暂无数据，请到App里添加
        [self.contentView addSubview:self.mianImageBgV];
        [self.mianImageBgV mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(38, 38));
            make.top.equalTo(self.contentView).offset(2);
            make.centerX.equalTo(self.contentView);
        }];
        self.mianImageV = [UIImageView new];
        [self.mianImageBgV addSubview:self.mianImageV];
        [self.mianImageV mas_makeConstraints:^(MASConstraintMaker *make) {
          make.size.mas_equalTo(CGSizeMake(24, 24));
          make.center.equalTo(self.mianImageBgV);
        }];
        self.titleLabel = [[UILabel alloc]init];
        [self.contentView addSubview:self.titleLabel];
        self.titleLabel.font = [UIFont systemFontOfSize:11];
        self.titleLabel.textAlignment = NSTextAlignmentCenter;
        [self.titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(self.mianImageBgV.mas_bottom).offset(5);
            make.centerX.equalTo(self.contentView);
        }];
        
        
        self.doneImageV= [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"完成"]];
        [self.contentView addSubview:self.doneImageV];
        [self.doneImageV mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(15, 15));
            make.top.equalTo(self.mianImageBgV.mas_top).offset(-2);
            make.right.equalTo(self.mianImageBgV.mas_right).offset(2);
        }];
    }
    return self;
}

- (void)setModel:(EverydayHabitModel *)model andIndexPath:(NSIndexPath *)indexPath withTapBlock:(TapBlock)block{
    self.model=model;
    self.doneImageV.hidden = !model.isDone;
    self.tapBlock = block;
    self.titleLabel.text = model.title;
    if ([model.image containsString:@"http"]) {
      [self.mianImageV sd_setImageWithURL:[NSURL URLWithString:model.image]];
    }else if(model.image.length==0){
      self.mianImageV.image = [UIImage imageNamed:@"sun"];
    }else{
      self.mianImageV.image = [UIImage imageNamed:model.image];
    }
}
-(void)tapView:(UITapGestureRecognizer *)sender{
    [UIView animateWithDuration:1.0 animations:^{
        //CALayer的3D旋转
        CATransform3D turnTrans = CATransform3DMakeRotation(M_PI, 0, 1, 0);
        self.mianImageBgV.layer.transform = turnTrans;
    }completion:^(BOOL finished) {
        if (self.tapBlock) {
            self.tapBlock(self.model);
        }
        CATransform3D turnTrans = CATransform3DMakeRotation(0, 0, 1, 0);
        self.mianImageBgV.layer.transform = turnTrans;
    }];
}

@end
