//
//  TodayViewController.m
//  comboTodayWidget
//
//  Created by 罗伟 on 2020/9/2.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "TodayViewController.h"
#import <NotificationCenter/NotificationCenter.h>
#import "NetworkRequests.h"
#import <Masonry/Masonry.h>
#import "EverydayHabitCell.h"
#define LINEMAXHABITCOUNT  6
#define CELLHEIGTH  90
@interface TodayViewController () <NCWidgetProviding,UICollectionViewDelegate, UICollectionViewDataSource>
//无数据
@property (nonatomic,strong) UILabel *mianLab;
@property (nonatomic,strong) UIImageView *mianImageV;
@property (nonatomic,strong) UIView *mianNoDataV;
//有数据
@property (nonatomic,strong) UICollectionView *collectionView;
@property (nonatomic, strong) NSMutableArray *collectArray;

@property (nonatomic,assign) CGFloat widgetHeight;
@property (nonatomic,assign) CGFloat widgetWidth;
@property (nonatomic,assign) int habitCount;
@end

@implementation TodayViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.extensionContext.widgetLargestAvailableDisplayMode = NCWidgetDisplayModeExpanded;
  //左右边距8
  self.widgetWidth = self.view.frame.size.width-16;
  [self setupUI];
//  [self setupNoDateV];
//  self.mianLab.text = @"恭喜您完成今日所有打卡！";
//  self.mianImageV.image = [UIImage imageNamed:@"icon_finish"];
}
//有数据
-(void)setupUI{
  self.collectArray =[NSMutableArray new];
  self.habitCount =10;
  for (int i=0; i<10; i++) {
    EverydayHabitModel *model = [EverydayHabitModel new];
    model.image = @"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2477934767,102333810&fm=26&gp=0.jpg";
    model.title=@"放风筝";
    [self.collectArray addObject:model];
  }
  
  UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc]init];
  flowLayout.scrollDirection = UICollectionViewScrollDirectionVertical;
  flowLayout.itemSize = CGSizeMake(self.widgetWidth*1.0/LINEMAXHABITCOUNT, CELLHEIGTH);
  flowLayout.sectionInset = UIEdgeInsetsMake(0, 0, 0, 0);
  
  self.collectionView = [[UICollectionView alloc]initWithFrame:CGRectMake(0, 0, self.widgetWidth, (self.habitCount/LINEMAXHABITCOUNT+1)*CELLHEIGTH) collectionViewLayout:flowLayout];
  [self.view addSubview:self.collectionView];
  self.collectionView.showsHorizontalScrollIndicator = NO;
  self.collectionView.backgroundColor = [UIColor whiteColor];
  self.collectionView.delegate = self;
  self.collectionView.dataSource = self;
  [self.collectionView registerClass:[EverydayHabitCell class] forCellWithReuseIdentifier:@"EverydayHabitCell"];
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
  return self.collectArray.count;
}

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
  CGFloat width = self.widgetWidth*1.0/LINEMAXHABITCOUNT;
  return CGSizeMake(width , CELLHEIGTH);
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section {
  return 10;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section {
  return 10;
}

- (__kindof UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
  EverydayHabitCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"EverydayHabitCell" forIndexPath:indexPath];
  EverydayHabitModel *model = self.collectArray[indexPath.item];
  [cell setModel:model andIndexPath:indexPath];
    
  return cell;
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    
}

//无数据情况
-(void)setupNoDateV{
  self.mianNoDataV = [UIView new];
  [self.view addSubview:self.mianNoDataV];
  [self.mianNoDataV mas_makeConstraints:^(MASConstraintMaker *make) {
    make.edges.equalTo(self.view);
  }];
  
  self.mianImageV = [UIImageView new];
  //暂无数据，请到App里添加
  [self.mianNoDataV addSubview:self.mianImageV];
  [self.mianImageV mas_makeConstraints:^(MASConstraintMaker *make) {
    make.size.mas_equalTo(CGSizeMake(40, 40));
    make.top.equalTo(self.mianNoDataV).offset(14);
    make.centerX.equalTo(self.mianNoDataV);
  }];
  
  self.mianLab = [UILabel new];
  //暂无数据，请到App里添加
  //恭喜您完成今日所有打卡！
  self.mianLab.font=[UIFont systemFontOfSize:11];
  self.mianLab.textColor = [UIColor blackColor];
  [self.mianNoDataV addSubview:self.mianLab];
  [self.mianLab mas_makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(self.mianImageV.mas_bottom).offset(6);
    make.centerX.equalTo(self.mianNoDataV);
  }];
}
- (void)widgetActiveDisplayModeDidChange:(NCWidgetDisplayMode)activeDisplayMode withMaximumSize:(CGSize)maxSize {
  
  if (activeDisplayMode == NCWidgetDisplayModeExpanded) {
      // 设置展开的新高度
    self.preferredContentSize = CGSizeMake(0, self.collectionView.frame.size.height);
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
