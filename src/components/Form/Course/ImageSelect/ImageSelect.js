/**
 * Created by lintong on 2018/7/10.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons'

import {
    StyledHeaderImage,
    StyledHeaderItem,
    StyledButton,
    StyledButtonText,
    StyledTipView,
    StyledTipViewText
} from './style'

import { showImagePicker } from '../../../ImagePicker/imagePicker'

@connect(
    state => ({}),
    (dispatch, props) => ({
        picker: async () => {
            // dispatch(pickerImage())
            // const res = await  showImagePicker({
            //     title: '添加图片',
            //     maxWidth: 2000, // photos only
            //     maxHeight: 2000, // photos only
            // })


             props.handleImage(props.onChange)

        }
    })
)


export default class ImageSelect extends PureComponent {
    constructor(props: Object) {
        super(props);

    }

    static propTypes = {
        value: PropTypes.object,
        imageLoad:PropTypes.bool,
        handleImage:PropTypes.func

    };
    static defaultProps = {
        imageLoad:false
    };


    render() {
        const imageLoad = this.props.imageLoad
        let uri =this.props.value && this.props.value.get&&  this.props.value.get('url');

        // console.log('this.props.value:', this.props.value);

        return (
            <StyledHeaderItem>
                {
                    imageLoad ?
                        <ActivityIndicator/>
                        :
                        <StyledButton
                            style={[{
                                flex: 1, justifyContent: 'center',
                                alignItems: uri ? null : 'center'
                            }]}
                            onPress={this.props.picker}>
                            {!uri ? (
                                    <View style={{ alignItems: 'center' }}>
                                        <Icon name="md-add" color={'rgb(220,220,220)'} size={60}/>
                                        <StyledButtonText>
                                            添加封面
                                        </StyledButtonText>
                                    </View>)
                                :

                                (   <View style={{ flex: 1 }}>
                                        <StyledTipView>
                                            <StyledTipViewText>
                                                更换封面
                                            </StyledTipViewText>
                                        </StyledTipView>
                                        <StyledHeaderImage width={250} source={{ uri }}/>
                                    </View>
                                )}
                        </StyledButton>
                }
            </StyledHeaderItem>
        );
    }
}



