//
//  TodayViewController.m
//  comboUnFinished
//
//  Created by 罗伟 on 2020/10/27.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "TodayViewController.h"
#import <NotificationCenter/NotificationCenter.h>
#import "NetworkRequests.h"
#import <Masonry/Masonry.h>
#import "EverydayHabitCell.h"
#import "TTProgressHUD.h"

#define isIpad (([[UIDevice currentDevice] respondsToSelector:@selector(userInterfaceIdiom)] ? [[UIDevice currentDevice] userInterfaceIdiom] : UIUserInterfaceIdiomPhone)== UIUserInterfaceIdiomPad)
#define LINEMAXHABITCOUNT  (isIpad ? 4 : 5)
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

@property (nonatomic,strong) NSDictionary *myData;
@end

@implementation TodayViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSString *myDataStr =[[[NSUserDefaults alloc] initWithSuiteName:@"group.com.winlong.xiamen.Bear"] valueForKey:@"NET_FOR_NATIVE"];
    NSDictionary *myData = [NetworkRequests dictionaryWithJsonString:myDataStr];
    if (myData) {
        self.myData = myData;
        [self iUseList3];
    }
    
    self.extensionContext.widgetLargestAvailableDisplayMode = NCWidgetDisplayModeExpanded;
  

}
//用户列表

-(void)iUseList3{
    NSString *url = [NSString stringWithFormat:@"https://%@/call/iUseList3",self.myData[@"host"]];
    [NetworkRequests requestObjWithUrl:url andHeaderDic:self.myData[@"header"] andParam:nil withResponseBlock:^(NSError *error, id dataDict) {
      if (!error && dataDict && dataDict[@"result"] && dataDict[@"result"][@"iUseList"]) {
          NSMutableArray *arrayList = [NSMutableArray new];
          NSArray *dicArray = dataDict[@"result"][@"iUseList"];
          for (NSDictionary *dic in dicArray) {
              EverydayHabitModel *model = [EverydayHabitModel new];
              [model setModelWithDic:dic];
              if(model.canDone && !model.isDone){//能打卡并且未打卡
                  [arrayList addObject:model];
              }
              
          }
          if (arrayList.count>0) {
            self.habitCount = (int)arrayList.count;
            self.collectArray = [[NSMutableArray alloc] initWithArray:[arrayList copy]];
            [self setupUI];
          }else{
            [self setupNoDateV];
          }
      }
    }];
}
//打卡
-(void)classesIDo:(EverydayHabitModel *)model{
    NSString * iCard_objectId = model.iCard_objectId?:@"";
    NSString * iUse_objectId = model.iUse_objectId?:@"";
    NSString * User_objectId = model.User_objectId?:@"";
    self.habitCount--;
    if (self.habitCount>0) {
        [self.collectArray removeObject:model];
        [self setupUI];
    }else{
        [self setupNoDateV];
        self.mianLab.text = @"恭喜您完成今日所有打卡！";
        self.mianImageV.image = [UIImage imageNamed:@"icon_finish"];
    }
    
    
    NSDateFormatter* dateFormatter = [[NSDateFormatter alloc] init] ;
    dateFormatter.dateFormat = @"yyyy-MM-dd'T'HH:mm:ss.000'Z'";
    
    NSString *url = [NSString stringWithFormat:@"https://%@/classes/iDo",self.myData[@"host"]];
    NSMutableDictionary *param = [NSMutableDictionary new];
    param[@"doneDate"]=@{@"__type":@"Date",@"iso":[dateFormatter stringFromDate:[NSDate new]]};
    param[@"iCard"]=@{@"__type":@"Pointer",@"className":@"iCard",@"objectId":iCard_objectId};
    param[@"iUse"]=@{@"__type":@"Pointer",@"className":@"iUse",@"objectId":iUse_objectId};
    param[@"user"]=@{@"__type":@"Pointer",@"className":@"_User",@"objectId":User_objectId};
    param[@"type"]=@0;
    
    [NetworkRequests requestJsonObjWithUrl:url andHeaderDic:self.myData[@"header"] andParam:param withResponseBlock:^(NSError *error, id dataDict) {
      if (!error && dataDict) {
          if (dataDict[@"createdAt"]) {
              
          }
          NSLog(@"%@,dataDict",dataDict);
      }
    }];
}
//有数据
-(void)setupUI{
    if (self.mianNoDataV) {
        self.mianNoDataV.hidden = YES;
    }
    int rowNumber = self.habitCount/LINEMAXHABITCOUNT+((self.habitCount%LINEMAXHABITCOUNT)>0?1:0);
    if(self.collectionView && [self.collectionView superview]){
        self.collectionView.hidden = NO;
        self.collectionView.frame = CGRectMake(0, 20, self.widgetWidth, rowNumber*CELLHEIGTH);
        [self.collectionView reloadData];
        return;
    }
    UICollectionViewFlowLayout *flowLayout = [[UICollectionViewFlowLayout alloc]init];
    flowLayout.scrollDirection = UICollectionViewScrollDirectionVertical;
    flowLayout.itemSize = CGSizeMake(self.widgetWidth*1.0/LINEMAXHABITCOUNT, CELLHEIGTH);
    flowLayout.sectionInset = UIEdgeInsetsMake(0, 0, 0, 0);
    
    self.collectionView = [[UICollectionView alloc]initWithFrame:CGRectMake(0, 20, self.widgetWidth, rowNumber*CELLHEIGTH) collectionViewLayout:flowLayout];
    [self.view addSubview:self.collectionView];
    self.collectionView.backgroundColor = [UIColor clearColor];
    self.collectionView.showsHorizontalScrollIndicator = NO;
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
    return 0;
}

- (__kindof UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    EverydayHabitCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"EverydayHabitCell" forIndexPath:indexPath];
    EverydayHabitModel *model = self.collectArray[indexPath.item];
    [cell unFinishedSetModel:model andIndexPath:indexPath withTapBlock:^(EverydayHabitModel * _Nonnull model) {
        
        if (model.canDone) {//能打卡
            if (model.isDone) {//已打卡的
                NSString *text =[NSString stringWithFormat:@"【%@】此项已打卡",model.title];
                ShowOnlyTextHUD(text);
                
                return;
            }
            [self classesIDo:model];
        }else{//不能打卡去首页
            NSString *url = [NSString stringWithFormat: @"combo://combo/done?iUseId=%@",model.iUse_objectId];
            [self.extensionContext openURL:[NSURL URLWithString:url] completionHandler:nil];
        }
        
    }];
      
    return cell;
}
- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    
}

//无数据情况
-(void)setupNoDateV{
    if (self.collectionView) {
        self.collectionView.hidden = YES;
    }
    if (self.mianNoDataV) {
        self.mianNoDataV.hidden = NO;
        return ;
    }
    
    
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
    self.mianLab.text = @"恭喜您完成今日所有打卡！";
    self.mianImageV.image = [UIImage imageNamed:@"icon_finish"];
}
- (void)widgetActiveDisplayModeDidChange:(NCWidgetDisplayMode)activeDisplayMode withMaximumSize:(CGSize)maxSize {
    self.widgetWidth = maxSize.width;
    if (activeDisplayMode == NCWidgetDisplayModeExpanded) {
        // 设置展开的新高度
        CGFloat preferredContentH = 0;
        if (self.habitCount > 0) {
            preferredContentH = self.collectionView.frame.size.height+self.collectionView.frame.origin.y;
        }else{
            preferredContentH = 110;
        }
        self.preferredContentSize = CGSizeMake(0, preferredContentH);
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
