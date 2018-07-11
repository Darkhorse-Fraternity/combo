/**
 * Created by lintong on 2018/7/9.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,

} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons'
import { showImagePicker } from '../../../components/ImagePicker/imagePicker'
import {
    StyledContent,
    StyledHeaderImage,
    StyledHeaderItem
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Button from '../../../components/Button'
import CourseForm from '../../../components/Form/Course'



@connect(
    state => ({}),
    dispatch => ({

    })
)


export default class CourseCreat extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '',
        }
    };


    // __renderRow = () => {
    //     const load = this.props.imageLoad
    //     let url;
    //     return (
    //         <StyledHeaderItem>
    //             {
    //                 load ?
    //                         <ActivityIndicator/>
    //                     :
    //                     <Button
    //                         style={[ {flex:1,justifyContent:'center', alignItems: url ? null : 'center' }]}
    //                         onPress={this.props.picker}>
    //                         {!url ? (<Icon name="md-add" size={50}/>) :
    //                             (<StyledHeaderImage source={{ uri: url }}/>)}
    //                     </Button>
    //             }
    //         </StyledHeaderItem>
    //     )
    // }

    render(): ReactElement<any> {

        const data = [{ id: 0, img: null, audio: null }, { id: 1, img: null, audio: null }]

        return (
            <StyledContent>
                <CourseForm onSubmit={()=>{}}/>
                {/*{this.__renderRow()}*/}


            </StyledContent>
        );
    }
}


