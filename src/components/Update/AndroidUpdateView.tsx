import React, { Component } from 'react';
import {
  NativeModules,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Linking,
  ToastAndroid,
  ImageSourcePropType,
} from 'react-native';
import Pop from '../Pop';

const { RNUpdateApp } = NativeModules;
import RNFS from 'react-native-fs';
import { PostCallAppUpdateInfoResponse } from 'src/hooks/interface';

// const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

interface RNUpdateProps {
  bannerImage: ImageSourcePropType;
  fetchRes: PostCallAppUpdateInfoResponse['result'];
  progressBarColor?: string;
  updateBoxWidth?: number;
  bannerWidth?: number;
  bannerHeight?: number;
}

interface RNUpdateState {
  progress: number;
  modalVisible: boolean;
  desc: string[];
  fileSize: number;
}

export default class RNUpdate extends Component<RNUpdateProps, RNUpdateState> {
  // 定义默认属性
  static defaultProps = {
    progressBarColor: '#f50',
    updateBoxWidth: 250,
    updateBoxHeight: 250,
    updateBtnHeight: 38,
    updateBtnText: '立即更新',
    theme: 1,
    bannerWidth: 60,
    bannerHeight: 60,
    bannerResizeMode: 'contain',
    successTips: '', // 包下载成功的提示
    errorTips: '', // 下载发生错误的提示
    CancelTips: '', // 用户取消升级的提示
  };
  filePath: string;
  jobId: number;
  loading: boolean;

  constructor(props: RNUpdateProps) {
    super(props);
    this.state = {
      progress: 0,
      modalVisible: false,
      desc: [], // 更新说明
      fileSize: -1,
    };

    this.jobId = 0; // 下载任务的id，用来停止下载

    this.loading = false; // 是否在下载中

    this.filePath = '';
  }

  async componentWillMount() {
    // if (this.props.onBeforeStart) {
    //     let res = await this.props.onBeforeStart()
    //     console.log('res',res)
    //     this.checkUpdate(res)
    // }
    this.updateApp(this.props.fetchRes);
  }

  reset() {
    this.setState({
      progress: 0,
      modalVisible: false,
      desc: [], // 更新说明
      fileSize: -1,
    });

    this.jobId = 0; // 下载任务的id，用来停止下载

    this.loading = false; // 是否在下载中
  }

  async checkUpdate(
    fetchRes: NonNullable<PostCallAppUpdateInfoResponse['result']>,
    isManual: boolean = false,
  ) {
    try {
      let { version, desc } = fetchRes;

      // 安装包下载目录

      if (!Array.isArray(desc)) {
        desc = [desc];
      }

      if (version > RNUpdateApp.appVersion) {
        try {
          // RNUpdateApp.getFileSize(fetchRes.url).then(async fileSize => {
          //     fileSize = Number(fileSize / 1024 / 1024).toFixed(2, 10)
          //
          //     this.setState({
          //         desc,
          //         fileSize
          //     })
          // })
          let fileSize = await RNUpdateApp.getFileSize(fetchRes.url);
          fileSize = Number(fileSize / 1024 / 1024).toFixed(2);
          this.setState({
            desc,
            fileSize,
          });
        } catch (e) {
          this.setState({
            desc,
          });
        }
      } else if (isManual) {
        ToastAndroid.showWithGravity(
          '已经是最新版本',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (e) {
      console.warn('react-native-update-app check update error', e);
    }
  }

  errorTips = () => {
    ToastAndroid.show('安装失败', ToastAndroid.SHORT);
  };

  androidUpdate = async (
    fetchRes: NonNullable<PostCallAppUpdateInfoResponse['result']>,
  ) => {
    // const _this = this;
    const { url, filename, version } = fetchRes;
    // 按照目录/包名/文件名 存放，生成md5文件标识

    this.filePath = `${RNFS.ExternalDirectoryPath}/${filename}${version}.apk`;
    console.log('this.filePath', this.filePath);

    // 检查包是否已经下载过，如果有，则直接安装
    const exist = await RNFS.exists(this.filePath);
    if (exist) {
      this.hideModal();
      RNUpdateApp.install(this.filePath);
    }
    // 下载apk并安装
    RNFS.downloadFile({
      fromUrl: url,
      toFile: this.filePath,
      progressDivider: 2, // 节流
      begin: (res) => {
        this.jobId = res.jobId; // 设置jobId，用于暂停和恢复下载任务
        this.loading = true;
      },
      progress: (res) => {
        const progress = (res.bytesWritten / res.contentLength).toFixed(2);
        // 此处 this 指向有问题，需要使用 _this
        this.setState({
          progress: parseInt(progress, 2),
        });
      },
    })
      .promise.then((response) => {
        // 下载完成后
        console.log('response:', response);
        this.hideModal();
        if (response.statusCode === 200) {
          // console.log("FILES UPLOADED!") // response.statusCode, response.headers, response.body
          RNUpdateApp.install(this.filePath);
        } else {
          // 提示安装失败，关闭升级窗口
          this.errorTips();
        }

        this.loading = false;
      })
      .catch((err) => {
        console.log('test:', err, err.message);
        if (err.description === 'cancegetFileSizelled') {
          this.errorTips();
        }
        this.hideModal();
      });
  };

  updateApp = async (fetchRes: PostCallAppUpdateInfoResponse['result']) => {
    // 如果已经开始下载
    if (this.loading) {
      return;
    }
    // 如果是android
    if (!isIOS && fetchRes) {
      await this.checkUpdate(fetchRes);
      this.androidUpdate(fetchRes);
      return;
    }

    const { url } = fetchRes || {};
    // 如果是ios，打开appstore连接
    url &&
      Linking.openURL(url).catch((err) =>
        console.warn('An error occurred', err),
      );
  };

  // stopUpdateApp = () => {
  //     this.jobId && RNFS.stopDownload(this.jobId)
  // }
  hideModal = () => {
    Pop.hide();
    this.jobId && RNFS.stopDownload(this.jobId);
  };

  componentWillUnmount() {
    this.hideModal();
  }

  renderBottom = () => {
    const { progress } = this.state;
    const { progressBarColor, updateBoxWidth = 0 } = this.props;
    return (
      <View style={styles.progressBar}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: progressBarColor,
            height: 24,
            borderRadius: 5,
            padding: 5,
            width: progress * updateBoxWidth,
          }}
        />
        <Text style={styles.updateBtnText}>下载中 {progress * 100}%</Text>
      </View>
    );
  };

  renderBanner = () => {
    const { bannerImage, bannerWidth, bannerHeight } = this.props;
    return (
      <View style={{ height: bannerHeight }}>
        <Image
          style={{
            width: bannerWidth,
            height: bannerHeight,
            // resizeMode: bannerResizeMode
          }}
          source={bannerImage}
        />
      </View>
    );
  };

  renderFileSize = () => {
    const { fileSize } = this.state;
    if (!isIOS) {
      return (
        <Text style={{ marginTop: 5, fontSize: 12 }}>
          文件大小：
          {fileSize}M
        </Text>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={styles.wrap}>
        {this.renderBanner()}
        {this.renderBottom()}
        {this.renderFileSize()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },

  updateBtnText: {
    fontSize: 13,
  },
  progressBar: {
    borderWidth: 1,
    borderColor: '#eee',
    width: 252,
    height: 26,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
