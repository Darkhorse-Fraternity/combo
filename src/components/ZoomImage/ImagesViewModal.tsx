/**
 * Created by lintong on 2018/4/3.
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  CameraRoll,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Toast from 'react-native-simple-toast';
import {SafeAreaView} from 'react-navigation';
import {strings} from '../../../locales/i18n';
import {requestExternalStoragePermission} from '../../../helps/permission';
import {saveToCameraRoll} from '../../../helps/saveToCameraRoll';
import Modal from 'react-native-modal';
import Button from '../Button';

export default class ImagesViewModals extends Component {
  static propTypes = {
    imageUrls: PropTypes.array.isRequired,
    visible: PropTypes.bool,
    closeCallBack: PropTypes.func.isRequired,
    index: PropTypes.number,
  };

  static defaultProps = {
    height: 250,
    visible: false,
    index: 0,
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  state: {};

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
        console.log('1111');

        const {closeCallBack} = this.props;
        closeCallBack && closeCallBack();
      }}>
      <Image
        source={require('../../../source/img/visitor/visitor_delete.png')}
        style={styles.close}
      />
    </Button>
  );

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('111');
    });
  }

  render() {
    const {imageUrls, visible, closeCallBack, index} = this.props;

    // console.log('test:', imageUrls);
    return (
      <Modal
        // useNativeDriver
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          marginTop: 0,
        }}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropColor={'black'}
        backdropOpacity={1}
        onBackButtonPress={() => {
          closeCallBack && closeCallBack();
        }}
        isVisible={visible}>
        {Platform.OS !== 'ios' && (
          <StatusBar
            backgroundColor="black"
            barStyle={'light-content'}
            translucent
          />
        )}
        <ImageViewer
          loadingRender={() => <ActivityIndicator />}
          imageUrls={imageUrls || []}
          index={index}
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
          onSave={async url => {
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
    top: 0,
    zIndex: 10000,
    paddingTop: 10,
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
});
