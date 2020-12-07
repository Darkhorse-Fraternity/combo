/**
 * Created by lintong on 2018/4/3.
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { strings } from '../../../locales/i18n';
import { saveToCameraRoll } from '../../../helps/saveToCameraRoll';
// import Modal from 'react-native-modal';
import Button from '../Button';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';

interface ImagesViewModalsPorps {
  imageUrls?: IImageInfo[];
  visible: boolean;
  closeCallBack: () => void;
  index: number;
  height: number;
}

export default class ImagesViewModals extends Component<
  ImagesViewModalsPorps,
  { visible: boolean }
> {
  static defaultProps = {
    height: 250,
    visible: false,
    index: 0,
  };

  constructor(props: ImagesViewModalsPorps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: ImagesViewModalsPorps) {
    return (
      nextProps.visible !== this.props.visible ||
      nextProps.imageUrls !== this.props.imageUrls ||
      nextProps.index !== this.props.index
    );
  }
  // componentWillUnmount() {
  //   this.jobId && RNFS.stopDownload(this.jobId)
  // }

  __renderHeader = () => (
    <Button
      hitSlop={{
        top: 15,
        left: 15,
        bottom: 25,
        right: 40,
      }}
      style={styles.header}
      onPress={() => {
        // this.setState({ visible: false })

        const { closeCallBack } = this.props;
        closeCallBack && closeCallBack();
      }}>
      <Image
        source={require('../../../source/img/visitor/visitor_delete.png')}
        style={styles.close}
      />
    </Button>
  );

  render() {
    const { imageUrls, visible, closeCallBack, index } = this.props;
    return (
      <Modal
        animated
        animationType={'fade'}
        // useNativeDriver
        style={styles.modal}
        // animationIn={'fadeIn'}
        // animationOut={'fadeOut'}
        // backdropColor={'black'}
        // backdropOpacity={1}
        onRequestClose={() => {
          closeCallBack && closeCallBack();
        }}
        // useNativeDriver
        visible={visible}>
        {Platform.OS !== 'ios' && (
          <StatusBar
            backgroundColor="black"
            barStyle={'light-content'}
            translucent
          />
        )}
        <ImageViewer
          loadingRender={() => <ActivityIndicator />}
          imageUrls={imageUrls}
          onClick={() => {
            closeCallBack && closeCallBack();
          }}
          enableSwipeDown
          onCancel={() => {
            // this.setState({ visible: false })

            closeCallBack && closeCallBack();
          }}
          enablePreload
          doubleClickInterval={200}
          menuContext={{
            saveToLocal: strings('save.save_to_local'),
            cancel: strings('save.cance'),
          }}
          {...this.props}
          index={index}
          onSave={async (url) => {
            saveToCameraRoll(url);
          }}
          // saveToLocalByLongPress={()=>{}}
          renderHeader={this.__renderHeader}
          failImageSource={{
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width,
          }}
        />
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
  },
  close: {
    marginTop: 25,
    marginLeft: 25,
    width: 15,
    height: 15,
    tintColor: 'white',
  },
  header: {
    position: 'absolute',
    left: 0,
    top: getStatusBarHeight() - 10,
    zIndex: 10000,
    paddingTop: 10,
    maxWidth: 50,
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
});
