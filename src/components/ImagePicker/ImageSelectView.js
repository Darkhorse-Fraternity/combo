/* @flow */

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  // LayoutAnimation,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import * as immutable from 'immutable';
import imagePicker from './imagePicker';
import Button from '../Button';
// const source = require('../../source/img/pic_upload/pic_upload.png');
import ImagesViewModal from '../ZoomImage/ImagesViewModal';


export default class ImageSelectView extends PureComponent {
  static propTypes = {
    maxImage: PropTypes.number,
    files: PropTypes.any,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    maxImage: 8,
    files: [],
    index: 0
  };


  constructor(props: Object) {
    super(props);

    let value = props.files;
    // console.log('value:', typeof value, value);
    if (typeof value === 'object' && value.toJS) {
      value = value.toJS();
    }

    this.state = {
      files: value || [],
      visible: false
    };
  }

  state: {
    files:[],
  }

  componentWillReceiveProps(nextProps) {
    // console.log('test:', nextProps.files);
    if (nextProps.files && nextProps.files !== this.props.files) {
      let value = nextProps.files;
      // console.log('value:', typeof value, value);
      if (typeof value === 'object' && value.toJS) {
        value = value.toJS();
      }
      // console.log('value:', value);
      this.setState({ files: value });
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //     if(nextProps.files && nextProps.files !== prevState.files) {
  //         return {
  //             files: nextProps.files
  //         };
  //     }
  // }


    _selectImage = () => {
      const opt = {
        title: '添加图片',
        maxWidth: 2500, // photos only
        maxHeight: 2500, // photos only
      };
      imagePicker(opt, (response) => {
        // console.log('response:', response);
        if (response.uri) {
          // LayoutAnimation.spring();
          delete response.data;
          const files = [response].concat(this.state.files);
          this.props.onChange && this.props.onChange(immutable.fromJS(files));
        }
      });
    };


    _renderLastButton() {
      if (this.state.files.length < this.props.maxImage) {
        return (
          <Button style={styles.addBtn} onPress={this._selectImage}>
            {/* <Image style={styles.image} source={source}/> */}
            <Text style={styles.add}>+</Text>
          </Button>
        );
      }
    }

    render() {
      const { files = [], index, visible } = this.state;
      const { style } = this.props;
      const uris = files.map(file => ({ url: file.uri }));
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={[styles.imageBackView, style]}
        >
          {this._renderLastButton()}
          { uris && uris.length > 0 && (
          <ImagesViewModal
            visible={visible}
            closeCallBack={() => {
              this.setState({ visible: false });
            }}
            index={index}
            imageUrls={uris}
          />
          )}
          {
                    files && files.map((file, i) => {
                      if (i < this.props.maxImage) {
                        return (
                          <Button
                            onPress={() => {
                              this.setState({ visible: true, index: i });
                            }}
                            key={i}
                          >
                            <Image
                              style={[styles.image]}
                              source={{ uri: file.uri }}
                            />
                            <TouchableOpacity
                              hitSlop={{
                                top: 10, left: 10, bottom: 10, right: 10
                              }}
                              onPress={() => {
                                const n = files.filter(f => f !== file);
                                this.props.onChange && this.props.onChange(immutable.fromJS(n));
                              }}
                              style={styles.delete}
                            >
                              <Text style={styles.deleteText}>x</Text>
                            </TouchableOpacity>
                          </Button>
                        );
                      }
                      return null;
                    })
                }

        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({

  imageBackView: {
    // backgroundColor:'red',

  },
  image: {
    height: 80,
    width: 80,
    marginLeft: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(200,200,200)',
    borderRadius: 10,
  },
  add: {
    fontSize: 60,

    color: 'rgb(200,200,200)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: -10
  },
  addBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(200,200,200)',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 15,
    borderRadius: 10,
  },
  delete: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 5,
    position: 'absolute',
    right: 5,
    top: 5,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7.5,
  },
  deleteText: {
    color: 'white',
    marginTop: -2,
  }
});
