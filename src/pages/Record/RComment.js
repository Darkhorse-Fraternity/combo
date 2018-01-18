/**
 * Created by lintong on 2018/1/16.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import RecordRow from './RecordRow'
import Comments from 'react-native-comments';
//static displayName = RComment
@connect(
    state => ({
        //data:state.req.get()
    }),
    dispatch => ({
        //...bindActionCreators({},dispatch),
    })
)
export default class RComment extends Component {
    constructor(props: Object) {
        super(props);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            // title: '主页',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    _renderHeader = () => {
        const data = this.props.navigation.state.params.data
        return (
            <View>
                <RecordRow item={data} showChat={false}/>
                <View style={styles.line}/>
            </View>
        )
    }

    render(): ReactElement<any> {

        return (
            <View style={[this.props.style, styles.wrap]}>
                {this._renderHeader()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    line: {
        height: StyleSheet.hairlineWidth * 2,
        backgroundColor: '#ebebeb',
        marginTop: 10,
    }
})
