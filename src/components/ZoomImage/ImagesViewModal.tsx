/**
 * Created by lintong on 2018/4/3.
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { strings } from '../../../locales/i18n';
import { saveToCameraRoll } from '../../../helps/saveToCameraRoll';
// import Modal from 'react-native-modal';
import { Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { LoadAnimation } from '@components/Load';

interface ImagesViewModalsPorps {
  imageUrls?: IImageInfo[];
  visible: boolean;
  closeCallBack: () => void;
  index: number;
  height: number;
}

const renderIndicator = (currentIndex?: number, allSize?: number) => {
  if (allSize === 1) {
    return <Text />;
  }
  return <Text style={styles.indicator}>{`${currentIndex} / ${allSize}`}</Text>;
};

const loadingRender = () => {
  return <LoadAnimation delay={0} modeDark />;
};

const failImageSource = {
  url: 'http://file.icourage.cn/a246745cdeec889e50c6.png/error.png',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width,
};

// const renderHeader = (props: { closeCallBack: () => void }) => (
//   <Button
//     hitSlop={{
//       top: 15,
//       left: 15,
//       bottom: 25,
//       right: 40,
//     }}
//     style={styles.header}
//     onPress={() => {
//       // this.setState({ visible: false })

//       const { closeCallBack } = props;
//       closeCallBack && closeCallBack();
//     }}>
//     <Image
//       source={require('../../../source/img/visitor/visitor_delete.png')}
//       style={styles.close}
//     />
//   </Button>
// );

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

  render() {
    const { imageUrls, visible, closeCallBack, index } = this.props;
    return (
      <Modal
        animated
        animationType={'fade'}
        style={styles.modal}
        // animationIn={'fadeIn'}
        // animationOut={'fadeOut'}
        // backdropColor={'black'}
        // backdropOpacity={1}
        onRequestClose={closeCallBack}
        visible={visible}>
        {Platform.OS !== 'ios' && (
          <StatusBar
            backgroundColor="black"
            barStyle={'light-content'}
            translucent
          />
        )}
        <ImageViewer
          style={{ backgroundColor: 'black' }}
          useNativeDriver
          renderIndicator={renderIndicator}
          backgroundColor={'black'}
          loadingRender={loadingRender}
          imageUrls={imageUrls}
          onClick={closeCallBack}
          enableSwipeDown
          onCancel={closeCallBack}
          enablePreload
          doubleClickInterval={200}
          menuContext={{
            saveToLocal: strings('save.save_to_local'),
            cancel: strings('save.cance'),
          }}
          {...this.props}
          index={index}
          onSave={saveToCameraRoll}
          // saveToLocalByLongPress={()=>{}}
          // renderHeader={this.__renderHeader}
          failImageSource={failImageSource}
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
  indicator: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    top: 30,
    zIndex: 100,
    position: 'absolute',
  },
});
